import { useState } from 'react';
import Cookie from 'js-cookie';

const useCookie = (cookieName, cookieValue, cookieOpts = {}) => {
  const [getCookieName, setCookieName] = useState(null);
  const [getCookieValue, setCookieValue] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [getCookieOpts, setCookieOpts] = useState(null);

  if (cookieName) {
    console.log('ding');
    console.log(cookieName);
    console.log(Cookie.get());
    return Cookie.get(cookieName);
  }
  if (cookieName && cookieValue) {
    setCookieName(cookieName);
    setCookieValue(cookieValue);
    return Cookie.set(getCookieName, getCookieValue);
  }
  if (cookieName && cookieValue && cookieOpts) {
    setCookieName(cookieName);
    setCookieValue(cookieValue);
    setCookieOpts(cookieOpts);
    return Cookie.set(cookieName, cookieValue, cookieOpts);
  }
  if (cookieOpts === 'delete') {
    return Cookie.remove(getCookieName);
  }
  if (!cookieName) {
    return false;
  }
};

export default useCookie;
