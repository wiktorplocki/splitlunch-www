/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const Modal = ({ isShowing, modalContent }) =>
  isShowing
    ? createPortal(modalContent, document.getElementById('portal'))
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  modalContent: PropTypes.node.isRequired
};
Modal.defaultProps = {
  isShowing: false
};
export default Modal;
