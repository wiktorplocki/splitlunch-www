export default function validate(values) {
  // eslint-disable-next-line prefer-const
  let errors = {};
  if (
    (!values.email && values.emailTouched) ||
    (values.email === '' && values.emailTouched)
  ) {
    errors.email = 'Required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email';
  }
  if (
    (!values.password && values.passwordTouched) ||
    (values.password === '' && values.passwordTouched)
  ) {
    errors.password = 'Required';
  }
  return errors;
}
