import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextAreaComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const TextAreaLabel = styled.label`
  color: #576574;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.125rem;
  align-self: center;
`;

const TextAreaRequired = styled.abbr`
  border: 0;
  color: #fe4849;
  cursor: help;
  margin: 0 0 0.125rem;
  text-decoration: none;
`;

const TextAreaWrapper = styled.div`
  position: relative;
`;

const TextAreaComponent = styled.textarea`
  background-color: #fff;
  border: ${props => (props.error ? "2px solid #fe4849" : "1px solid #a4a7b5")};
  border-radius: 12rem;
  width: fill-available;
  resize: none;
  transition: all 0.1s linear;
  font-size: 1rem;
  line-height: 1.57;
  color: #061c3f;
  padding: 0.625rem 1rem;
  overflow: auto;
  &:active,
  :focus {
    outline: 0;
    border: 2px solid #01b6f5;
    background-color: #fff;
    box-shadow: 0 0 2px #01b6f5;
    padding: 0.5625rem 0.9375rem;
  }
`;

const TextAreaError = styled.div`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  align-self: center;
  color: #fe4849;
`;

const TextArea = forwardRef(
  ({ error, label, required, name, className }, ref) => (
    <TextAreaComponentWrapper className={className}>
      <TextAreaLabel>
        {required && <TextAreaRequired />}
        {label}
      </TextAreaLabel>
      <TextAreaWrapper>
        <TextAreaComponent name={name} ref={ref} />
      </TextAreaWrapper>
      {error && <TextAreaError>{error}</TextAreaError>}
    </TextAreaComponentWrapper>
  )
);

TextArea.defaultProps = {
  error: undefined,
  label: "",
  required: false,
  className: undefined
};

TextArea.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      message: PropTypes.string
    }),
    PropTypes.string
  ]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default TextArea;
