import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { db } from '../firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { useAuth } from '../context/AuthContext'; // Import Auth context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function CreateMessage() {
  const navigate = useNavigate(); // Initialize the navigate function
  const { currentUser } = useAuth(); // Get the current user
  const [contacts, setContacts] = useState([]); // State for contacts
  const [selectedContact, setSelectedContact] = useState('');
  const [context, setContext] = useState(''); // State for context
  const [input, setInput] = useState(''); // State for input
  const [output, setOutput] = useState(''); // State for output

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        const contactsRef = collection(db, 'users', currentUser.uid, 'contacts'); // Change to 'contacts'
        const querySnapshot = await getDocs(contactsRef);
        const contactList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched contacts:', contactList); // Log fetched contacts
        setContacts(contactList);
      } else {
        console.log('No current user found.');
      }
    };

    fetchContacts();
  }, [currentUser]);

  const handleContactChange = (event) => {
    const selected = event.target.value;
    setSelectedContact(selected);
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate(-1)} // Back button functionality
        sx={{ mb: 2 }} // Margin bottom for spacing
      >
        Back
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Create Message
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>To</InputLabel>
        <Select
          value={selectedContact}
          onChange={handleContactChange}
          label="To"
        >
          {contacts.length > 0 ? (
            contacts.map(contact => (
              <MenuItem key={contact.id} value={contact.id}>
                {`${contact.firstName} ${contact.lastName}`} {/* Display full name */}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No contacts available</MenuItem>
          )}
        </Select>
      </FormControl>
      <TextField
        label="Context"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={context}
        onChange={(e) => setContext(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Input"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Output"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        disabled={false}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={() => {/* Handle message creation logic */}}>
          Generate Message
        </Button>
      </Box>
    </Container>
  );
}

export default CreateMessage; 