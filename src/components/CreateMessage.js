import React from 'react';
import { Container, Typography } from '@mui/material';

function CreateMessage() {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        Create Message
      </Typography>
      <Typography variant="body1">
        This is the Create Message component. You can add your content here.
      </Typography>
    </Container>
  );
}

export default CreateMessage; 