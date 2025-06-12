import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaMusic, FaRedo } from 'react-icons/fa';
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
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  captcha: yup.string().required('Please enter the captcha text')
});

const Login = () => {
  const { login, error, clearError, getCaptcha, isAuthenticated } = useContext(AuthContext);
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
    
    // Add captchaId to form data
    const formData = {
      ...data,
      captchaId: captchaData.captchaId
    };
    
    const success = await login(formData);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      // Refresh captcha on failed login
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
      <MusicNote size="2rem" top="10%" left="10%" duration="7s" delay="0.5s">♪</MusicNote>
      <MusicNote size="3rem" top="20%" left="80%" duration="8s" delay="1s">♫</MusicNote>
      <MusicNote size="2.5rem" top="70%" left="15%" duration="6s" delay="1.5s">♩</MusicNote>
      <MusicNote size="4rem" top="60%" left="75%" duration="9s" delay="0.2s">♬</MusicNote>
      
      <VinylRecord size="180px" top="10%" right="10%" duration="25s" />
      <PulsingCircle size="300px" top="-150px" left="-150px" duration="5s" />
      <PulsingCircle size="250px" top="60%" left="80%" duration="7s" />
      
      <WaveAnimation />
      
      <AuthFormContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <FormTitle variants={itemVariants}>
          <FaMusic style={{ marginRight: '10px' }} />
          Beat Blend Login
        </FormTitle>
        
        <FormSubtitle variants={itemVariants}>
          Sign in to access your music collection
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
            <FormLabel>Password</FormLabel>
            <FormInput 
              type="password" 
              placeholder="Your password" 
              {...register('password')} 
              whileFocus={{ scale: 1.02 }}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
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
            {isLoading ? 'Logging in...' : 'Login'}
          </FormButton>
        </form>
        
        <FormLink variants={itemVariants}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </FormLink>
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default Login;