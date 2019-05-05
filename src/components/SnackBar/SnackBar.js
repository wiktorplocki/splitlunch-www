/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SnackBar = ({ duration, toggle, children }) => {
  const snackBarRef = useRef(null);
  useEffect(() => {
    snackBarRef.current.classList.add('active');
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
  }, []);

  return (
    <div className="SnackBar" ref={snackBarRef} onClick={toggle}>
      {children}
    </div>
  );
};

SnackBar.propTypes = {
  duration: PropTypes.number,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
SnackBar.defaultProps = {
  duration: 3000,
  children: null
};
export default SnackBar;
