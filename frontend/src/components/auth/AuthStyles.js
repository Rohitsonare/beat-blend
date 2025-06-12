import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled components
export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #121212 0%, #2d3436 100%);
  overflow: hidden;
  position: relative;
`;

export const AuthFormContainer = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 2.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
  position: relative;
  z-index: 10;
`;

export const FormTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const FormSubtitle = styled(motion.p)`
  text-align: center;
  margin-bottom: 2rem;
  color: #b3b3b3;
  font-size: 1rem;
`;

export const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #e0e0e0;
  font-weight: 500;
`;

export const FormInput = styled(motion.input)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: #f953c6;
    box-shadow: 0 0 0 2px rgba(249, 83, 198, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const FormButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #f953c6 0%, #b91d73 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(249, 83, 198, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export const FormLink = styled(motion.p)`
  text-align: center;
  margin-top: 1.5rem;
  color: #b3b3b3;
  
  a {
    color: #f953c6;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled(motion.div)`
  background-color: rgba(255, 87, 87, 0.1);
  border-left: 4px solid #ff5757;
  color: #ff5757;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const SuccessMessage = styled(motion.div)`
  background-color: rgba(75, 181, 67, 0.1);
  border-left: 4px solid #4bb543;
  color: #4bb543;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const CaptchaContainer = styled(motion.div)`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CaptchaImage = styled.div`
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  
  svg {
    max-width: 100%;
    height: auto;
  }
`;

export const RefreshButton = styled(motion.button)`
  background: none;
  border: none;
  color: #f953c6;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

// Music-themed decorative elements
export const MusicNote = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: ${props => props.size || '3rem'};
  top: ${props => props.top};
  left: ${props => props.left};
  animation: ${float} ${props => props.duration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  z-index: 1;
`;

export const VinylRecord = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '150px'};
  height: ${props => props.size || '150px'};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #000000 0%,
    #333333 30%,
    #000000 31%,
    #333333 60%,
    #000000 61%,
    #333333 90%,
    #000000 91%
  );
  top: ${props => props.top};
  right: ${props => props.right};
  animation: ${rotate} ${props => props.duration || '20s'} linear infinite;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    width: 20%;
    height: 20%;
    background: #f953c6;
    border-radius: 50%;
    top: 40%;
    left: 40%;
  }
`;

export const WaveAnimation = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%23f953c6" fill-opacity="0.1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
`;

export const PulsingCircle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '200px'};
  height: ${props => props.size || '200px'};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249, 83, 198, 0.2) 0%, rgba(185, 29, 115, 0.1) 70%, transparent 100%);
  top: ${props => props.top};
  left: ${props => props.left};
  animation: ${pulse} ${props => props.duration || '4s'} ease-in-out infinite;
  z-index: 1;
`;