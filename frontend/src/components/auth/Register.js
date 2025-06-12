import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaMusic, FaRedo, FaHeadphones } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
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
  CaptchaContainer,
  CaptchaImage,
  RefreshButton,
  MusicNote,
  VinylRecord,
  WaveAnimation,
  PulsingCircle
} from './AuthStyles';

// Form validation schema
const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  city: yup.string().required('City is required for location-based features'),
  captcha: yup.string().required('Please enter the captcha text')
});

const Register = () => {
  const { register: registerUser, error, clearError, getCaptcha, isAuthenticated } = useContext(AuthContext);
  const [captchaData, setCaptchaData] = useState({ captchaSvg: '', captchaId: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Load captcha on component mount
  useEffect(() => {
    loadCaptcha();
    // Clear any previous errors
    clearError();
  }, []);

  const loadCaptcha = async () => {
    const data = await getCaptcha();
    if (data) {
      setCaptchaData(data);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Remove confirmPassword from data before sending to API
    const { confirmPassword, ...formData } = data;
    
    // Add captchaId to form data
    const registerData = {
      ...formData,
      captchaId: captchaData.captchaId
    };
    
    const success = await registerUser(registerData);
    
    if (success) {
      toast.success('Registration successful! Welcome to Beat Blend!');
      navigate('/');
    } else {
      // Refresh captcha on failed registration
      loadCaptcha();
      reset({ ...data, captcha: '' });
    }
    
    setIsLoading(false);
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
      {/* Decorative elements */}
      <MusicNote size="2rem" top="5%" left="15%" duration="7s" delay="0.5s">♪</MusicNote>
      <MusicNote size="3rem" top="25%" left="85%" duration="8s" delay="1s">♫</MusicNote>
      <MusicNote size="2.5rem" top="75%" left="10%" duration="6s" delay="1.5s">♩</MusicNote>
      <MusicNote size="4rem" top="65%" left="80%" duration="9s" delay="0.2s">♬</MusicNote>
      
      <VinylRecord size="200px" top="5%" right="5%" duration="30s" />
      <PulsingCircle size="350px" top="-150px" left="-150px" duration="6s" />
      <PulsingCircle size="300px" top="60%" left="80%" duration="8s" />
      
      <WaveAnimation />
      
      <AuthFormContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <FormTitle variants={itemVariants}>
          <FaHeadphones style={{ marginRight: '10px' }} />
          Join Beat Blend
        </FormTitle>
        
        <FormSubtitle variants={itemVariants}>
          Create your account to start your musical journey
        </FormSubtitle>
        
        {error && (
          <ErrorMessage 
            variants={itemVariants}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </ErrorMessage>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup variants={itemVariants}>
            <FormLabel>Username</FormLabel>
            <FormInput 
              type="text" 
              placeholder="Choose a username" 
              {...register('username')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.username && <p className="error-text">{errors.username.message}</p>}
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormLabel>Email</FormLabel>
            <FormInput 
              type="email" 
              placeholder="your@email.com" 
              {...register('email')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormLabel>City</FormLabel>
            <FormInput 
              type="text" 
              placeholder="Your city" 
              {...register('city')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.city && <p className="error-text">{errors.city.message}</p>}
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormLabel>Password</FormLabel>
            <FormInput 
              type="password" 
              placeholder="Create a password" 
              {...register('password')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormLabel>Confirm Password</FormLabel>
            <FormInput 
              type="password" 
              placeholder="Confirm your password" 
              {...register('confirmPassword')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
          </FormGroup>
          
          <CaptchaContainer variants={itemVariants}>
            <FormLabel>Captcha</FormLabel>
            <CaptchaImage 
              dangerouslySetInnerHTML={{ __html: captchaData.captchaSvg }}
            />
            <FormInput 
              type="text" 
              placeholder="Enter captcha text" 
              {...register('captcha')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.captcha && <p className="error-text">{errors.captcha.message}</p>}
            <RefreshButton 
              type="button" 
              onClick={loadCaptcha}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo /> Refresh Captcha
            </RefreshButton>
          </CaptchaContainer>
          
          <FormButton 
            type="submit" 
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </FormButton>
        </form>
        
        <FormLink variants={itemVariants}>
          Already have an account? <Link to="/login">Login</Link>
        </FormLink>
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default Register;