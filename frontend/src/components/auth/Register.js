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
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

const Register = () => {
  const { register: registerUser, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential })
      });
      const data = await result.json();
      if (data.token) {
        registerUser({ token: data.token });
        toast.success('Google registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Google registration failed');
    }
  };

  const handleAppleSuccess = async (response) => {
    try {
      const result = await fetch('/api/auth/apple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response)
      });
      const data = await result.json();
      if (data.token) {
        registerUser({ token: data.token });
        toast.success('Apple registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Apple registration failed');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
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
            Join BeatBlend
          </FormTitle>
          <FormSubtitle>Create your account and start making music</FormSubtitle>

          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <SocialButton provider="google" onClick={() => {}}>
              <FaGoogle /> Sign up with Google
            </SocialButton>
          </GoogleOAuthProvider>

          <AppleLogin
            clientId={process.env.REACT_APP_APPLE_CLIENT_ID}
            redirectURI="https://your-app-url/auth/apple/callback"
            render={renderProps => (
              <SocialButton provider="apple" onClick={renderProps.onClick}>
                <FaApple /> Sign up with Apple
              </SocialButton>
            )}
          />

          <OrDivider>
            <span>or sign up with email</span>
          </OrDivider>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <FormInput
                type="text"
                placeholder="Enter your full name"
                {...register('name')}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Create a password"
                {...register('password')}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Confirm Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </FormGroup>

            {authError && <ErrorMessage>{authError}</ErrorMessage>}

            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </FormButton>
          </form>

          <FormLink>
            Already have an account?
            <Link to="/login">Log in</Link>
          </FormLink>
        </AuthFormContainer>
      </motion.div>
    </AuthContainer>
  );
};

export default Register;