let accessToken = '';

export const setAccessToken = setToken => {
  accessToken = setToken;
};

export const getAccessToken = () => accessToken;
