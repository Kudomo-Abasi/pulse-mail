import React, { useState, useEffect } from 'react';
import { Avatar, ButtonBase, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { USER_ENDPOINTS } from '../../../../api';
import axios from 'axios';

const SmallUserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

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
      const response = await axios.get(USER_ENDPOINTS.GET_MY_USERINFO_BY_TOKEN, {
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
    setUserInfo(null);
  };

  return (
    <div className="flex items-center pl-2">
      <ButtonBase>
        {userInfo?.avatar ? (
          <Avatar src={userInfo.avatar} alt={`${userInfo.firstName} ${userInfo.lastName}`} />
        ) : (
          <Avatar alt={userInfo?.firstName ? userInfo.firstName[0] : 'U'}>
            <AccountCircleIcon />
          </Avatar>
        )}
      </ButtonBase>
      <div className="ml-2">
        {userInfo?.email && <Typography variant="body2">{userInfo.email}</Typography>}
      </div>
    </div>
  );
};

export default SmallUserProfile;
