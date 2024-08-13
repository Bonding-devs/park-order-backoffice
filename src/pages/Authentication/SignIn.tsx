import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';

const SignIn: React.FC = () => {
  const {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    isLoading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="m-8 w-full max-w-4xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">
                Welcome back, you've been missed!
              </span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Let’s Sign You In
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        !isEmailValid && email ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        !isPasswordValid && password ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value={isLoading ? 'Signing In...' : 'Sign In'}
                    className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition ${
                      !(isEmailValid && isPasswordValid) || isLoading
                        ? 'cursor-not-allowed bg-opacity-50'
                        : 'hover:bg-opacity-90'
                    }`}
                    disabled={!(isEmailValid && isPasswordValid) || isLoading}
                  />
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mt-6 text-center">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
