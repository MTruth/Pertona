import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Slider, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { useAuth } from '../context/AuthContext'; // Import Auth context

const REGIONAL_SLANG_OPTIONS = [
  { id: 'american', label: 'American Slang' },
  { id: 'british', label: 'British Slang' },
  { id: 'australian', label: 'Australian Slang' },
  { id: 'canadian', label: 'Canadian Slang' },
  { id: 'urban', label: 'Urban Slang' },
  { id: 'caribbean', label: 'Caribbean Slang' },
  { id: 'south_african', label: 'South African Slang' },
];

const SUBCATEGORY_OPTIONS = {
  american: [
    { id: 'east_coast', label: 'East Coast (New York, Boston, etc.)' },
    { id: 'west_coast', label: 'West Coast (California, LA, etc.)' },
    { id: 'southern', label: 'Southern U.S. (Texas, Georgia, etc.)' },
    { id: 'midwest', label: 'Midwest (Chicago, Michigan, etc.)' },
  ],
  british: [
    { id: 'general', label: 'General British' },
    { id: 'cockney', label: 'Cockney (East London)' },
    { id: 'scouse', label: 'Scouse (Liverpool)' },
    { id: 'geordie', label: 'Geordie (Newcastle)' },
  ],
  australian: [
    { id: 'general', label: 'General Aussie' },
    { id: 'outback', label: 'Outback / Rural' },
    { id: 'sydney', label: 'Sydney or Coastal' },
  ],
  canadian: [
    { id: 'general', label: 'General Canadian' },
    { id: 'quebec', label: 'Quebec French (Franco-Canadian)' },
  ],
  // Add other regional slang subcategories as needed
};

function SlangSettings() {
  const navigate = useNavigate(); // Initialize the navigate function
  const { currentUser } = useAuth(); // Get the current user
  const [informality, setInformality] = useState(2); // Default value for the slider
  const [slangAmount, setSlangAmount] = useState(2); // Default value for slang amount
  const [regionalSlang, setRegionalSlang] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [personality, setPersonality] = useState('');
  const [sensitiveTopics, setSensitiveTopics] = useState(2); // Default value for sensitive topics
  const [abbreviationsFrequency, setAbbreviationsFrequency] = useState(2); // Default value for how often to include abbreviations
  const [humorLevel, setHumorLevel] = useState(2); // Default value for humor level
  const [trendyOrTimeless, setTrendyOrTimeless] = useState(2); // Default value for trendy or timeless
  const [emojis, setEmojis] = useState(2); // Default value for emojis
  const [recipientFeelings, setRecipientFeelings] = useState('');
  const [includeProfanity, setIncludeProfanity] = useState(false); // Default value for profanity inclusion

  useEffect(() => {
    const fetchSlangSettings = async () => {
      if (currentUser) {
        const slangSettingsRef = collection(db, 'users', currentUser.uid, 'slangSettings');
        const querySnapshot = await getDocs(slangSettingsRef);
        if (!querySnapshot.empty) {
          const settings = querySnapshot.docs[0].data(); // Assuming only one document for settings
          setInformality(settings.informality || 2);
          setSlangAmount(settings.slangAmount || 2);
          setRegionalSlang(settings.regionalSlang || '');
          setSubCategory(settings.subCategory || '');
          setPersonality(settings.personality || '');
          setSensitiveTopics(settings.sensitiveTopics || 2);
          setAbbreviationsFrequency(settings.abbreviationsFrequency || 2); // Fetch frequency setting
          setHumorLevel(settings.humorLevel || 2);
          setTrendyOrTimeless(settings.trendyOrTimeless || 2);
          setEmojis(settings.emojis || 2);
          setRecipientFeelings(settings.recipientFeelings || '');
          setIncludeProfanity(settings.includeProfanity || false); // Fetch profanity setting
        }
      }
    };

    fetchSlangSettings();
  }, [currentUser]);

  const handleSubmit = async () => {
    // Handle the submission of the settings
    const slangSettings = {
      informality,
      slangAmount,
      regionalSlang,
      subCategory,
      personality,
      sensitiveTopics,
      abbreviationsFrequency, // Include frequency setting
      humorLevel,
      trendyOrTimeless,
      emojis,
      recipientFeelings,
      includeProfanity, // Include profanity setting
    };

    console.log('Submitting settings:', slangSettings); // Log the settings being submitted

    try {
      // Add the slang settings to Firestore
      const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'slangSettings'), slangSettings);
      console.log('Document written with ID: ', docRef.id);
      // Navigate back to the Tones screen or another appropriate screen
      navigate('/tones');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
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
        Slang Settings
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">1. What level of informality do you want in the message?</Typography>
        <Slider
          value={informality}
          onChange={(e, newValue) => setInformality(newValue)}
          aria-labelledby="informality-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 0, label: 'Very Formal' },
            { value: 1, label: 'Slightly Formal' },
            { value: 2, label: 'Friendly' },
            { value: 3, label: 'Casual' },
            { value: 4, label: 'Very Casual' },
          ]}
          min={0}
          max={4}
          sx={{ width: '80%' }} // Make the slider smaller
        />
        <FormHelperText>0: Very Formal, 4: Very Casual</FormHelperText>
      </Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <Typography variant="h6">2. Select a Regional Slang:</Typography>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Regional Slang</InputLabel>
            <Select
              value={regionalSlang}
              onChange={(e) => {
                setRegionalSlang(e.target.value);
                setSubCategory(''); // Reset subcategory when regional slang changes
              }}
              label="Regional Slang"
            >
              {REGIONAL_SLANG_OPTIONS.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1, ml: 1 }}>
          <Typography variant="h6">Select Subcategories:</Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              label="Subcategory"
            >
              {SUBCATEGORY_OPTIONS[regionalSlang]?.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">3. How much slang do you want to include?</Typography>
        <Slider
          value={slangAmount}
          onChange={(e, newValue) => setSlangAmount(newValue)}
          aria-labelledby="slang-amount-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 0, label: 'None' },
            { value: 1, label: 'Just a hint' },
            { value: 2, label: 'Some' },
            { value: 3, label: 'A lot' },
          ]}
          min={0}
          max={3}
          sx={{ width: '80%' }} // Make the slider smaller
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">4. Do you want to include profanity?</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={includeProfanity}
              onChange={(e) => setIncludeProfanity(e.target.checked)}
              color="primary"
            />
          }
          label={includeProfanity ? "Yes" : "No"}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">5. How often do you want to include abbreviations?</Typography>
        <Slider
          value={abbreviationsFrequency}
          onChange={(e, newValue) => setAbbreviationsFrequency(newValue)}
          aria-labelledby="abbreviations-frequency-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 0, label: 'Never' },
            { value: 1, label: 'Rarely' },
            { value: 2, label: 'Sometimes' },
            { value: 3, label: 'Often' },
            { value: 4, label: 'Always' },
          ]}
          min={0}
          max={4}
          sx={{ width: '80%' }} // Make the slider smaller
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">6. How casual should the tone be about sensitive topics?</Typography>
        <Slider
          value={sensitiveTopics}
          onChange={(e, newValue) => setSensitiveTopics(newValue)}
          aria-labelledby="sensitive-topics-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 0, label: 'No slang' },
            { value: 1, label: 'Balanced' },
            { value: 2, label: 'Casual but respectful' },
            { value: 3, label: 'Very casual' },
          ]}
          min={0}
          max={3}
          sx={{ width: '80%' }} // Make the slider smaller
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Container>
  );
}

export default SlangSettings; 