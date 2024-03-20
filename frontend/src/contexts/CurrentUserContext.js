import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const handleMount = async () => {
      try {
        const { data } = await axios.get("dj-rest-auth/user/");
      } catch (err) {
        console.log(err);
      }
    };
 
    useEffect(() => {
      handleMount();
    }, []);


    return (
        // Providers allow current user value and
        // function that is updating it to be available to all children
        <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
            {children}
        </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
};
