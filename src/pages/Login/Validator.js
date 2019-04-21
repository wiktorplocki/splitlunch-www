export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email';
  }
  return errors;
}
