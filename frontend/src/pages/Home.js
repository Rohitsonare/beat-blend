import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMusic, FaHeadphones } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #2d3436 100%);
  color: white;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  gap: 0.5rem;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const AuthButton = styled(motion(Link))`
  padding: 0.8rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &.login {
    background: transparent;
    border: 2px solid #f953c6;
    color: #f953c6;
  }
  
  &.signup {
    background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
    color: white;
    border: none;
  }
`;

const HeroSection = styled(motion.section)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  margin: 4rem 0;
  padding: 2rem;
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #b3b3b3;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const MusicVisual = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisualCircle = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f953c6 0%, #b91d73 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 2px solid rgba(249, 83, 198, 0.3);
    animation: pulse 2s infinite;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Header>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaMusic /> Beat Blend
        </Logo>
        <AuthButtons>
          <AuthButton
            to="/login"
            className="login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </AuthButton>
          <AuthButton
            to="/register"
            className="signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </AuthButton>
        </AuthButtons>
      </Header>

      <HeroSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover Your Perfect Beat
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience music like never before with Beat Blend. Create personalized playlists,
            discover new artists, and share your favorite tracks with friends.
          </HeroSubtitle>
        </HeroContent>
        <MusicVisual>
          <VisualCircle
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaHeadphones size={100} color="white" />
          </VisualCircle>
        </MusicVisual>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;