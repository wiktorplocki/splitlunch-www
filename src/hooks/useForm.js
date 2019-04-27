import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      setIsSubmitting(true);
      setErrors(validate(values));
    }
  };

  const handleChange = event => {
    event.persist();
    setValue(values => ({
      ...values,
      [`${event.target.name}Touched`]: true,
      [event.target.name]: event.target.value
    }));
    if (event.target.value === '') {
      setValue(values => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    }
    setErrors(validate(values));
  };

  const handleFocus = event => {
    event.persist();
    setValue(values => ({
      [event.target.name]: event.target.value,
      ...values
    }));
    setErrors(validate(values));
  };

  const handleBlur = event => {
    event.persist();
    setValue(values => ({
      ...values,
      [`${event.target.name}Touched`]: true
    }));
    setErrors(validate(values));
  };

  return {
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
