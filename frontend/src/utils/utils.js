import jwtDecode from "jwt-decode";
import { axiosRequest } from "../api/axiosDefaults";

// copied from Moments
// function accepts data object returned by API on login.
// exp is expiry date.
export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  };
  
  
  export const shouldRefreshToken = () => {
    // returns refreshToken timestamp converted by double not operator.
    // token will only be refreshed for a logged in user.
    return !!localStorage.getItem("refreshTokenTimestamp");
  };
  
  
  export const removeTokenTimestamp = () => {
    // removed time stamp from the localStorage
    localStorage.removeItem("refreshTokenTimestamp");
  };


  // todo check if this works when deployed, users report infinite scroll is causing problems on Gitpod
  // when replacing localhost address from dev tools with an actual page address, I can see next data
  // used for InfiniteScroll
export const fetchMoreData = async (resource, setResource) => {
  try {
    // next means next page of results
    const { data } = await axiosRequest.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,

      /* Using reduce to loop through  next page of data we received.
      We append new results to the existing ones.
      Esentially, we compare each acc id to the cur id.
      If they match, we return acc, else we return acc with cur */
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};
