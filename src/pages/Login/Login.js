import React, { useContext } from 'react';

import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/AuthContext';
import validate from './Validator';

const Login = () => {
  const loginHandler = () => console.log(values);
  const { login } = useContext(AuthContext);
  const { values, handleChange, handleSubmit, errors } = useForm(
    loginHandler,
    validate
  );

  return (
    <div className="flex justify-center items-center login-view">
      <form
        className="w-full max-w-xs flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={handleSubmit}
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password || ''}
              required
            />
          </label>
          <p
            className={
              errors.password ? `block text-red text-xs italic` : `hidden`
            }
          >
            {errors.password}
          </p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
