import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({handleOnClick}) => {
  return (
    <IconButton onClick={()=> handleOnClick} edge="start" color="inherit" aria-label="back">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
