import Cookie from 'js-cookie';

const useCookie = (cookieName, cookieValue, cookieOpts = {}) => {
  if (cookieName) {
    return Cookie.get(cookieName);
  }
  if (cookieName && cookieValue) {
    return Cookie.set(cookieName, cookieValue);
  }
  if (cookieName && cookieValue && cookieOpts) {
    return Cookie.set(cookieName, cookieValue, cookieOpts);
  }
  if (cookieOpts === 'delete') {
    return Cookie.remove(cookieName);
  }
};

export default useCookie;
