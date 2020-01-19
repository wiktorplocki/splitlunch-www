import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const InputLabel = styled.label`
  color: #576574;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.125rem;
  align-self: center;
`;

const InputRequired = styled.abbr`
  border: 0;
  color: #fe4849;
  cursor: help;
  margin: 0 0.125rem;
  text-decoration: none;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputComponent = styled.input`
  background-color: #fff;
  border: ${props => (props.error ? "2px solid #fe4849" : "1px solid #a4a7b5")};
  border-radius: 12rem;
  width: 100%;
  transition: all 0.1s linear;
  display: inline-block;
  text-align: center;
  line-height: 2.5rem;
  height: 2.5rem;
  color: #061c3f;
  font-size: 1rem;
  &:active,
  :focus {
    outline: 0;
    border: 2px #01b6f5 solid;
    background-color: #fff;
    box-shadow: 0 0 2px #01b6f5;
  }
`;

const InputError = styled.div`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  align-self: center;
  color: #fe4849;
`;

const Input = forwardRef(
  (
    { error, icon, label, onClick, readOnly, required, name, type, className },
    ref
  ) => (
    <InputComponentWrapper className={className}>
      <InputLabel>
        {required && <InputRequired />}
        {label}
      </InputLabel>
      <InputWrapper>
        {icon && <FontAwesomeIcon icon={icon} />}
        <InputComponent
          name={name}
          onClick={onClick}
          readOnly={readOnly}
          type={type}
          ref={ref}
        />
      </InputWrapper>
      {error && <InputError>{error}</InputError>}
    </InputComponentWrapper>
  )
);

Input.defaultProps = {
  error: undefined,
  icon: undefined,
  label: "",
  onClick: undefined,
  readOnly: false,
  required: false,
  type: "text",
  className: undefined
};

Input.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      message: PropTypes.string
    }),
    PropTypes.string
  ]),
  icon: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["text", "email", "password"]),
  className: PropTypes.string
};

export default Input;
