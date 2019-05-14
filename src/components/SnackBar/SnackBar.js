/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const SnackBar = ({ type, duration, toggle, children }) => {
  const snackBarRef = useRef(null);
  useEffect(() => {
    snackBarRef.current.classList.add('active');
    if (duration > 0) {
      setTimeout(() => {
        snackBarRef.current.classList.add('hiding');
        snackBarRef.current.classList.remove('active');
        clearTimeout();
        setTimeout(() => {
          snackBarRef.current.classList.add('hidden');
          snackBarRef.current.classList.remove('hiding');
          toggle();
          clearTimeout();
        }, 300);
      }, duration);
    }
  }, []);

  const enhancedToggle = () => {
    switch (type) {
      case 'cookies':
        console.log(type);
        Cookies.set('SPLITLUNCH_PROMPT', true);
        toggle();
        break;
      case 'danger':
        console.log(type);
        break;
      default:
        console.log(type);
        break;
    }
  };

  return (
    <div className="SnackBar" ref={snackBarRef} onClick={enhancedToggle}>
      <div className="mx-4 my-2">{children}</div>
    </div>
  );
};

SnackBar.propTypes = {
  type: PropTypes.string,
  duration: PropTypes.number,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
SnackBar.defaultProps = {
  type: 'normal',
  duration: 3000,
  children: null
};
export default SnackBar;
