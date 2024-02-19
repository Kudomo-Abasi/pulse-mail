// search text bar for emails
import React from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <IconButton color="inherit" aria-label="search">
      <SearchIcon />
    </IconButton>
  );
};

export default SearchBar;
