import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";


export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

// copied from Moments with minor changes
  useEffect(() => {
    // making a network request on mount to check if user is logged in.
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, redirect to main page
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if user is not logged in, reroute to login
        if (userAuthStatus === "loggedOut") {
          history.push("/login/");
        }
      }
    };


    handleMount();
  }, [history, userAuthStatus]);
};
