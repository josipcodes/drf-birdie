import { createContext, useContext, useEffect, useState } from "react";
import { axiosRequest } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

// creating context objects
export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

// We we create custom hooks we can call in other components
// to actually access the context objects we've created, via the useContext hook.
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// built following Moments, some changes made
// exporting and defining a function component with children props
export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    // // passing popularProfiles empty results array
    profiles: { results: [] },
  });

  // we’ll pass the entire profileData object as the value prop in the ProfileDataContext.Provider.
  // But we’ll need the useState and useEffect hooks here, so that the data is fetched on mount.
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRequest.get(
          // most followed profile will be at the top, but realistically, tbd if we want to change it
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          profiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
