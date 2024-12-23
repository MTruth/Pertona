import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication

function TopBar() {
  const { currentUser, signOut } = useAuth(); // Get the current user and signOut function from context
  const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleSignOut = async () => {
    await signOut(); // Call the signOut function
    handleMenuClose(); // Close the menu after signing out
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {/* You can add a title or logo here if needed */}
        </Typography>
        <Button 
          color="inherit" 
          onClick={handleMenuClick}
          sx={{ 
            fontSize: '0.875rem', // Smaller font size
            padding: '4px 8px', // Smaller padding
            minWidth: 'auto', // Remove minimum width
          }}
        >
          {currentUser ? currentUser.displayName : 'User'}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar; 