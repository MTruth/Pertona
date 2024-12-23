import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Box, Tabs, Tab } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import Firebase Auth
import GoogleIcon from '@mui/icons-material/Google'; // Import Google icon

function Onboarding() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); // 0 for login, 1 for signup

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSignIn = () => {
    // Perform sign-in logic here
    // On successful sign-in:
    navigate('/main'); // Redirect to the main screen
  };

  const handleSignUp = () => {
    // Perform signup logic here
    // On successful signup:
    navigate('/main'); // Redirect to the main screen
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log('User signed in with Google:', user);
      navigate('/main'); // Redirect to the main screen
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Our App
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSignIn} fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleGoogleSignIn} 
            fullWidth 
            sx={{ mt: 2, borderColor: '#34A853', color: '#34A853' }} // Google green color
          >
            <GoogleIcon sx={{ mr: 1 }} /> {/* Google icon */}
            Sign in with Google
          </Button>
        </Box>
      )}
      {activeTab === 1 && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSignUp} fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleGoogleSignIn} 
            fullWidth 
            sx={{ mt: 2, borderColor: '#34A853', color: '#34A853' }} // Google green color
          >
            <GoogleIcon sx={{ mr: 1 }} /> {/* Google icon */}
            Sign up with Google
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default Onboarding; 