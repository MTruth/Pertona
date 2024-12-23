import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ContactsIcon from '@mui/icons-material/Contacts'; // Import a suitable icon

function MainScreen() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAddressBookClick = () => {
    navigate('/address-book'); // Navigate to the Address Book component
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4, backgroundColor: '#ffffff', padding: 2 }}>
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
          width: 'fit-content', // Width equal to the label
          textTransform: 'none' // Prevent text transformation
        }}
      >
        <ContactsIcon sx={{ fontSize: 64, color: '#1976d2' }} /> {/* Colored icon */}
        <Typography variant="h5" align="center" gutterBottom>
          Address Book
        </Typography>
      </Button>
    </Container>
  );
}

export default MainScreen; 