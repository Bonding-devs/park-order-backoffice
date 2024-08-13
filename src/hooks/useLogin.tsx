import { useState } from 'react';
import { login as loginApi } from '../api/userApi';
import { validateEmail, validatePassword } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    setIsPasswordValid(validatePassword(password));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { token } = await loginApi(email, password);
      await login(token);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      handleLogin();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    isPasswordValid,
    isLoading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  };
};
