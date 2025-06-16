import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaHeadphones, FaUser, FaSignOutAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #2d3436 100%);
  color: white;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 2px solid #f953c6;
  color: #f953c6;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f953c6;
    color: white;
  }
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f953c6;
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeMessage>Welcome, {user?.name || 'User'}!</WelcomeMessage>
        <UserInfo>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </LogoutButton>
        </UserInfo>
      </Header>

      <DashboardContent>
        <Card>
          <CardTitle>
            <FaMusic /> My Playlists
          </CardTitle>
          <p>Create and manage your playlists</p>
        </Card>

        <Card>
          <CardTitle>
            <FaHeadphones /> Recently Played
          </CardTitle>
          <p>Your recently played tracks</p>
        </Card>

        <Card>
          <CardTitle>
            <FaUser /> Profile
          </CardTitle>
          <p>Manage your account settings</p>
        </Card>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 