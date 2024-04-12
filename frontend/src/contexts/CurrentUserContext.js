import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosRequest, axiosResponse } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// based off of Moments lessons
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosResponse.get("dj-rest-auth/user/");
      // Set the current user with the data we get back.
      // Without this, we'd have to log in after each refresh
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  // refreshing tokens
  useMemo(() => {
    // request interceptor
    axiosRequest.interceptors.request.use(
      async (config) => {
        // if runs only when token needs refreshing
        if (shouldRefreshToken()) {
          try {
            // attempting to refresh the token
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // if token refresh failed and user was previously logged in
            // if refresh token expired
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
          return config;
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // response interceptor
    axiosResponse.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        // Promise rejected if error wasn't 401
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    // Providers allow current user value and
    // function that is updating it to be available to all children
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
