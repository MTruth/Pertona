import React from 'react';
import { TextField } from '@mui/material';

function PhoneInput({ value, onChange, ...props }) {
  const formatPhoneNumber = (input) => {
    if (!input) return '';
    
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, '');
    
    // Format the number as user types
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return input;

    const parts = [];
    if (match[1]) {
      parts.push(`(${match[1]}`);
      if (match[1].length === 3) {
        parts.push(') ');
      }
    }
    if (match[2]) {
      parts.push(match[2]);
      if (match[2].length === 3) {
        parts.push('-');
      }
    }
    if (match[3]) {
      parts.push(match[3]);
    }

    return parts.join('');
  };

  const handleChange = (event) => {
    const formatted = formatPhoneNumber(event.target.value);
    onChange({
      ...event,
      target: {
        ...event.target,
        value: formatted
      }
    });
  };

  return (
    <TextField
      {...props}
      value={formatPhoneNumber(value)}
      onChange={handleChange}
      type="tel"
      placeholder="(555) 555-5555"
      inputProps={{
        maxLength: 14,
      }}
      variant="outlined" // Use outlined variant for consistency
    />
  );
}

export default PhoneInput; 