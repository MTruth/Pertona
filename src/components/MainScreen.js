import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ContactsIcon from '@mui/icons-material/Contacts'; // Import a suitable icon
import CreateIcon from '@mui/icons-material/Create'; // Icon for Create Message
import PeopleIcon from '@mui/icons-material/People'; // Icon for Personas

function MainScreen() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAddressBookClick = () => {
    navigate('/address-book'); // Navigate to the Address Book component
  };

  const handlePersonasClick = () => {
    navigate('/tones'); // Navigate to the Tones component instead of Personas
  };

  const handleCreateMessageClick = () => {
    navigate('/create-message'); // Navigate to the Create Message component
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4, backgroundColor: '#ffffff', padding: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button 
          onClick={handleAddressBookClick} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 2, // Smaller padding for smaller buttons
            borderRadius: 2, 
            boxShadow: 2, 
            backgroundColor: '#FF5722', // Set background color to match icon color
            width: '100%', // Set width to 100% for full width
            textTransform: 'none', // Prevent text transformation
            color: 'white', // Set text color to white
            mb: 2 // Add margin bottom for spacing
          }}
        >
          <ContactsIcon sx={{ fontSize: 40 }} /> {/* Colored icon for Address Book */}
          <Typography variant="h6" align="center" gutterBottom>
            Address Book
          </Typography>
        </Button>
        <Button 
          onClick={handlePersonasClick} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 2, // Smaller padding for smaller buttons
            borderRadius: 2, 
            boxShadow: 2, 
            backgroundColor: '#2196F3', // Set background color to match icon color
            width: '100%', // Set width to 100% for full width
            textTransform: 'none', // Prevent text transformation
            color: 'white', // Set text color to white
            mb: 2 // Add margin bottom for spacing
          }}
        >
          <PeopleIcon sx={{ fontSize: 40 }} /> {/* New icon for Personas */}
          <Typography variant="h6" align="center" gutterBottom>
            Personas
          </Typography>
        </Button>
        <Button 
          onClick={handleCreateMessageClick} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 2, // Smaller padding for smaller buttons
            borderRadius: 2, 
            boxShadow: 2, 
            backgroundColor: '#FF9800', // Set background color to match icon color
            width: '100%', // Set width to 100% for full width
            textTransform: 'none', // Prevent text transformation
            color: 'white' // Set text color to white
          }}
        >
          <CreateIcon sx={{ fontSize: 40 }} /> {/* Colored icon for Create Message */}
          <Typography variant="h6" align="center" gutterBottom>
            Create Message
          </Typography>
        </Button>
      </Box>
    </Container>
  );
}

export default MainScreen; 