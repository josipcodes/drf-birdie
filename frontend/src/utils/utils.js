import jwtDecode from "jwt-decode";

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
  