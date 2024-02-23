import React, { useState, useEffect } from 'react';
import { Avatar, ButtonBase, Typography, Popover, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { USER_ENDPOINTS } from '../../../api';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    // Load user data from localStorage when component mounts
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserInfo(userData);

    // Listen for changes in localStorage.token
    window.addEventListener('storage', handleTokenChange);
    fetchUserData(localStorage.getItem('token')); 

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  const updateUserData = (newUserData) => {
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setUserInfo(newUserData);
  };

  const handleTokenChange = (event) => {
    // Check if the changed key is localStorage.token
    if (event.key === 'token') {
      // Get the new token value
      const newToken = event.newValue;
      if (newToken) {
        // Fetch updated user data using the new token
        fetchUserData(newToken);
      } else {
        // If token is removed (e.g., user logged out), clear user data
        clearUserData();
      }
    }
  };

  const fetchUserData = async (token) => {
    try {
      // Fetch user data using the new token
      const response = await axios.get(USER_ENDPOINTS.GET_MY_ORDINARY_INFO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
  
      // Check if the response status indicates success (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        const userData = response.data;
        updateUserData(userData);
      } else {
        // Handle error response
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const clearUserData = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setUserInfo(null);
    history.push('/'); // Navigate to the home page

  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="flex items-start ml-4">
      <ButtonBase onClick={handlePopoverOpen}>
        {userInfo?.avatar ? (
          <Avatar src={userInfo.avatar} alt={`${userInfo.firstName} ${userInfo.lastName}`} />
        ) : (
          <Avatar alt={userInfo?.firstName ? userInfo.firstName[0] : 'U'}>
            <AccountCircleIcon />
          </Avatar>
        )}
        <div className="max-md:hidden flex flex-col items-start ml-2 align-middle">
          {userInfo?.firstName && userInfo?.lastName && (
            <Typography className="leading-tight" style={{ lineHeight: 'normal' }} variant="subtitle1">
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </Typography>
          )}
          {userInfo?.email && <Typography variant="body2">{userInfo.email}</Typography>}
        </div>
      </ButtonBase>
      <Popover
      elevation={0}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className='p-4 m-4 align-middle items-center'>
          <Typography variant="body1" gutterBottom>
            Hi {userInfo?.firstName && userInfo?.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ''}
          </Typography>
          <br></br>
          <Button className='w-full m-auto' variant="outlined"  onClick={clearUserData}>
            Logout
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default UserProfile;
