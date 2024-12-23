import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  AppBar,
  Toolbar,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Box,
} from '@mui/material';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CATEGORIES = [
  { id: 'family', label: 'Family' },
  { id: 'friend', label: 'Friend' },
  { id: 'work', label: 'Work' },
  { id: 'other', label: 'Other' }
];

function AddressBook() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    categories: [],
    photoURL: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchContacts();
    }
  }, [currentUser]);

  const fetchContacts = async () => {
    try {
      const contactsRef = collection(db, 'users', currentUser.uid, 'contacts');
      const querySnapshot = await getDocs(contactsRef);
      const contactsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsList);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', categories: [], photoURL: '' });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const contactData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        photoURL: imageUrl,
      };

      const contactsRef = collection(db, 'users', currentUser.uid, 'contacts');
      await addDoc(contactsRef, contactData);
      handleCloseDialog();
      await fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'contacts', contactId));
      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <IconButton edge="start" color="inherit" onClick={() => navigate('/main')}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" sx={{ my: 2 }}>
        Address Book
      </Typography>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#ffffff'}}>
        <Button variant="contained" onClick={handleOpenDialog}>
          Add Contact
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={imagePreview} alt="Preview" sx={{ width: 56, height: 56, mr: 2 }} />
              <Button
                variant="contained"
                component="label"
                sx={{ height: '36px', fontSize: '0.875rem' }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
            </Box>
            <TextField
              label="First Name"
              fullWidth
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              fullWidth
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <PhoneInput
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                multiple
                value={formData.categories}
                onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                label="Category"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={CATEGORIES.find(category => category.id === value).label} />
                    ))}
                  </Box>
                )}
              >
                {CATEGORIES.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
        <List>
          {contacts.map(contact => (
            <ListItem key={contact.id} divider>
              <Avatar src={contact.photoURL} alt={`${contact.firstName} ${contact.lastName}`} sx={{ mr: 2 }} />
              <ListItemText primary={`${contact.firstName} ${contact.lastName}`} secondary={contact.email} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(contact.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default AddressBook; 