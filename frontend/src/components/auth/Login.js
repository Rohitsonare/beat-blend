import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import AppleLogin from 'react-apple-login';
import { FaGoogle, FaApple, FaMusic } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import {
  AuthContainer,
  AuthFormContainer,
  FormTitle,
  FormSubtitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  FormLink,
  ErrorMessage,
  SocialButton,
  OrDivider
} from './AuthStyles';

// Form validation schema
const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const Login = () => {
  const { login, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      await login(data);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AuthFormContainer>
          <FormTitle>
            <FaMusic style={{ marginRight: '10px' }} />
            Welcome Back
          </FormTitle>
          <FormSubtitle>Sign in to continue to BeatBlend</FormSubtitle>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                autoComplete="email"
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                autoComplete="current-password"
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </FormGroup>

            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </FormButton>
          </form>

          <OrDivider>
            <span>or continue with</span>
          </OrDivider>

          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <SocialButton provider="google" onClick={() => {}}>
              <FaGoogle /> Continue with Google
            </SocialButton>
          </GoogleOAuthProvider>

          <AppleLogin
            clientId={process.env.REACT_APP_APPLE_CLIENT_ID}
            redirectURI="https://your-app-url/auth/apple/callback"
            render={renderProps => (
              <SocialButton provider="apple" onClick={renderProps.onClick}>
                <FaApple /> Continue with Apple
              </SocialButton>
            )}
          />

          <FormLink>
            Don't have an account?
            <Link to="/register"> Sign up</Link>
          </FormLink>
        </AuthFormContainer>
      </motion.div>
    </AuthContainer>
  );
};

export default Login;