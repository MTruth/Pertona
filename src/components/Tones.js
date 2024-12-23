import React from 'react';
import { Container, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import back arrow icon
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Icon for Slang
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'; // Icon for Casual
import FavoriteIcon from '@mui/icons-material/Favorite'; // Icon for Loving
import SecurityIcon from '@mui/icons-material/Security'; // Icon for Authoritative
import WorkIcon from '@mui/icons-material/Work'; // Icon for Professional

function Tones() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleButtonClick = (tone) => {
    if (tone === "Slang") {
      navigate('/slang-settings'); // Navigate to SlangSettings component
    } else {
      console.log(`Selected tone: ${tone}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <IconButton edge="start" color="inherit" onClick={() => navigate('/main')}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" align="center" gutterBottom>
        Edit a Tone
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {[
          { label: "Slang", icon: <EmojiEmotionsIcon />, color: '#FF5722' }, // Deep Orange
          { label: "Casual", icon: <SentimentSatisfiedIcon />, color: '#FFC107' }, // Amber
          { label: "Loving", icon: <FavoriteIcon />, color: '#E91E63' }, // Pink
          { label: "Authoritative", icon: <SecurityIcon />, color: '#3F51B5' }, // Indigo
          { label: "Professional", icon: <WorkIcon />, color: '#4CAF50' } // Green
        ].map(({ label, icon, color }) => (
          <Button
            key={label}
            variant="contained"
            onClick={() => handleButtonClick(label)}
            sx={{
              width: '100%', // Make the button full width
              padding: 3, // Increase padding for larger buttons
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: color, // Use the distinct color for each button
              color: '#ffffff', // Text color
              mb: 2, // Margin bottom for spacing
              textTransform: 'none', // Prevent text transformation
              display: 'flex', // Flex display for icon and text
              alignItems: 'center', // Center items vertically
            }}
          >
            {icon} {/* Render the icon */}
            <Typography variant="h6" sx={{ ml: 2 }}> {/* Add margin to the left of the text */}
              {label}
            </Typography>
          </Button>
        ))}
      </Box>
    </Container>
  );
}

export default Tones; 