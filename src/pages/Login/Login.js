import React, { useContext } from 'react';
import { navigate, useTitle } from 'hookrouter';

import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import validate from './Validator';

import LoginQuery from '../../queries/LoginQuery';

const Login = () => {
  useTitle('SplitLunch - Login');
  const { login } = useContext(AuthContext);
  const {
    values,
    handleChange,
    handleSubmit,
    handleFocus,
    handleBlur,
    errors
  } = useForm(loginHandler, validate);
  let graphqlErrors = {};
  function loginHandler() {
    const { email, password } = values;
    const query = {
      query: LoginQuery,
      variables: { email, password }
    };
    fetch(`https://splitlunch-api.now.sh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    })
      .then(res => res.json())
      .catch(err => (errors.password = err[0].message))
      .then(result => {
        const { data } = result;
        if (result.errors) {
          graphqlErrors = {
            ...graphqlErrors,
            graphql: result.errors[0].message
          };
          console.log(graphqlErrors);
        } else {
          const { userId, token, tokenExpiry } = data.login;
          login(userId, token, tokenExpiry);
          return navigate('/', true);
        }
      })
      .catch(err => (errors.password = err));
  }

  return (
    <div className="flex justify-center items-center login-view">
      <form
        className="w-full max-w-xs flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={handleSubmit}
        onBlur={validate}
      >
        <div className="form-control w-full mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
            <input
              className={`shadow appearance-none border ${
                errors.email ? `border-red` : null
              } rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline`}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={values.email || ''}
              required
            />
          </label>
          <p
            className={
              errors.email ? `block text-red text-xs italic` : `hidden`
            }
          >
            {errors.email}
          </p>
        </div>
        <div className="form-control w-full mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={values.password || ''}
              required
            />
          </label>
          <p
            className={
              errors.password || graphqlErrors
                ? `block text-red text-xs italic`
                : `hidden`
            }
          >
            {errors.password || graphqlErrors.graphql}
          </p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
