import { Avatar, IconButton } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CurrentUserAvatar() {
  return (
    <IconButton color="inherit" aria-label="user profile">
    <AccountCircleIcon />
  </IconButton>  )
}
