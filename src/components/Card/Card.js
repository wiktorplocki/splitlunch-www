import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = ({ children, className }) => {
  const StyledCard = styled.article`
    position: relative;
    background-color: #fff;
    border: 0.0625rem solid #e3e5ed;
    border-radius: 0.875rem;
    background-clip: padding-box;
    box-shadow: 0 1px 2px 0 #e3e5ed;
    overflow: hidden;
    &:hover {
      box-shadow: 0 2px 12px 0 #e3e5ed;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  `;
  return <StyledCard className={className}>{children}</StyledCard>;
};

Card.defaultProps = {
  className: undefined
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default Card;
