import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaHeadphones, FaUser, FaSignOutAlt, FaPlay, FaPause, FaUpload, FaHeart } from 'react-icons/fa';

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
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TrackInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const TrackTitle = styled.h4`
  margin: 0;
  color: white;
`;

const TrackArtist = styled.p`
  margin: 0;
  color: #f953c6;
  font-size: 0.9rem;
`;

const PlayButton = styled.button`
  background: transparent;
  border: none;
  color: #f953c6;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(249, 83, 198, 0.1);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #f953c6;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const UploadButton = styled(LogoutButton)`
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [stats, setStats] = useState({
    totalTracks: 0,
    totalPlaylists: 0,
    totalListens: 0,
    favoriteTracks: 0,
  });

  useEffect(() => {
    // Fetch user's tracks
    fetchTracks();
    // Fetch user's stats
    fetchStats();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/tracks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/users/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePlay = (trackId) => {
    setPlaying(playing === trackId ? null : trackId);
  };

  const handleUpload = () => {
    // Implement upload functionality
    console.log('Upload clicked');
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
        <MainContent>
          <Card>
            <CardTitle>
              <FaHeadphones /> Recent Tracks
            </CardTitle>
            <TrackList>
              {tracks.map((track) => (
                <Track key={track._id}>
                  <PlayButton onClick={() => handlePlay(track._id)}>
                    {playing === track._id ? <FaPause /> : <FaPlay />}
                  </PlayButton>
                  <TrackInfo>
                    <TrackTitle>{track.title}</TrackTitle>
                    <TrackArtist>{track.artist}</TrackArtist>
                  </TrackInfo>
                </Track>
              ))}
            </TrackList>
            <UploadButton onClick={handleUpload}>
              <FaUpload /> Upload New Track
            </UploadButton>
          </Card>
        </MainContent>

        <div>
          <StatsContainer>
            <StatCard>
              <StatValue>{stats.totalTracks}</StatValue>
              <StatLabel>Total Tracks</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalPlaylists}</StatValue>
              <StatLabel>Playlists</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalListens}</StatValue>
              <StatLabel>Total Listens</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.favoriteTracks}</StatValue>
              <StatLabel>Favorites</StatLabel>
            </StatCard>
          </StatsContainer>

          <Card style={{ marginTop: '2rem' }}>
            <CardTitle>
              <FaUser /> Profile Overview
            </CardTitle>
            <p>Email: {user?.email}</p>
            <p>Member since: {new Date(user?.createdAt).toLocaleDateString()}</p>
          </Card>
        </div>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;