import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ContactsIcon from '@mui/icons-material/Contacts'; // Import a suitable icon
import CreateIcon from '@mui/icons-material/Create'; // Icon for Create Message
import ListAltIcon from '@mui/icons-material/ListAlt'; // New icon for Tones representing choices

function MainScreen() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAddressBookClick = () => {
    navigate('/address-book'); // Navigate to the Address Book component
  };

  const handleTonesClick = () => {
    navigate('/tones'); // Navigate to the Tones component
  };

  const handleCreateMessageClick = () => {
    navigate('/create-message'); // Navigate to the Create Message component
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4, backgroundColor: '#f5f5f5', padding: 2 }}>
      <Button 
        onClick={handleAddressBookClick} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: '#ffffff', // White background for the Address Book section
          width: '100%', // Set width to 100% for consistency
          textTransform: 'none' // Prevent text transformation
        }}
      >
        <ContactsIcon sx={{ fontSize: 64, color: '#1976d2' }} /> {/* Colored icon */}
        <Typography variant="h5" align="center" gutterBottom>
          Address Book
        </Typography>
      </Button>
      <Button 
        onClick={handleTonesClick} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: '#ffffff', // White background for the Tones section
          width: '100%', // Set width to 100% for consistency
          textTransform: 'none', // Prevent text transformation
          mt: 2 // Margin top for spacing
        }}
      >
        <ListAltIcon sx={{ fontSize: 64, color: '#1976d2' }} /> {/* New icon for Tones */}
        <Typography variant="h5" align="center" gutterBottom>
          Tones
        </Typography>
      </Button>
      <Button 
        onClick={handleCreateMessageClick} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: '#ffffff', // White background for the Create Message section
          width: '100%', // Set width to 100% for consistency
          textTransform: 'none', // Prevent text transformation
          mt: 2 // Margin top for spacing
        }}
      >
        <CreateIcon sx={{ fontSize: 64, color: '#1976d2' }} /> {/* Icon for Create Message */}
        <Typography variant="h5" align="center" gutterBottom>
          Create Message
        </Typography>
      </Button>
    </Container>
  );
}

export default MainScreen; 