export const cleanUserTokensFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const setUserTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const getIsAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("accessToken");
  }
};
export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
};
export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
};

export const parseJwt = (token: string) => {
  try {
    if (!token?.length) return null;
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};