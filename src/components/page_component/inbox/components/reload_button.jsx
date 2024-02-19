import React from 'react';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ReloadButtonComponent = ({ onRefresh }) => {
  return (
    <IconButton
      color="inherit"
      onClick={onRefresh}
      className="transition-transform duration-300 ease-in-out hover:scale-125"
    >
      <RefreshIcon />
    </IconButton>
  );
};

export default ReloadButtonComponent;
