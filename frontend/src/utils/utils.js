import jwtDecode from "jwt-decode";
import axios from "axios";

// copied from Moments

export const setTokenTimestamp = (data) => {
  /* Function accepts data object returned by API on login.
  Exp is expiry date. */
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  /* Returns refreshToken timestamp converted by double not operator.
  Token will only be refreshed for a logged in user. */
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  // remove time stamp from the localStorage
  localStorage.removeItem("refreshTokenTimestamp");
};

export const fetchMoreData = async (resource, setResource) => {
  // used for InfiniteScroll
  try {
    // code provided by Sean and Roman from Tutor support
    let url = new URL(resource.next);
    url = (url.pathname + url.search).replace("/api", "");
    console.log({ requestUrl: url });
    // fetching data
    const { data } = await axios.get(url);

    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    // console.log(err);
  }
};
