import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaSignOutAlt, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #f953c6;
  }
`;

const UserLocation = styled.span`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  color: #b3b3b3;
  
  svg {
    margin-right: 0.5rem;
    color: #f953c6;
  }
`;

const LogoutButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled(motion.section)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #b3b3b3;
  margin-bottom: 2rem;
`;

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <HomeContainer>
      <Header>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Beat Blend
        </Logo>
        <UserInfo>
          {user && (
            <>
              <UserName>
                <FaUser /> {user.username}
              </UserName>
              <UserLocation>
                <FaMapMarkerAlt /> {user.city}
              </UserLocation>
            </>
          )}
          <LogoutButton 
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt /> Logout
          </LogoutButton>
        </UserInfo>
      </Header>
      
      <MainContent>
        <WelcomeSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Title
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome to Beat Blend!
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Your personalized music experience starts here. Explore tracks, create playlists, and discover new artists.
          </Subtitle>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p>You've successfully logged in to your Beat Blend account.</p>
            <p>This is a placeholder home page. The actual music application features would be implemented here.</p>
          </motion.div>
        </WelcomeSection>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;