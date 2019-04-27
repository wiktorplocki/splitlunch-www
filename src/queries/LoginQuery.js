const LoginQuery = `query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userId
    token
    tokenExpiry
  }
}`;

export default LoginQuery;
