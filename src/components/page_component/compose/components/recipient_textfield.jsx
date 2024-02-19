import React, { useState, useEffect } from "react";
import {
  Chip,
  TextField,
  Popover,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Avatar,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { USER_ENDPOINTS } from "../../../../api";

const RecipientField = ({
  selectedUsers,
  setSelectedUsers,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cachedUsers, setCachedUsers] = useState([]);
  const [token, setToken] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    const fetchCurrentUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUser = await axios.get(
          USER_ENDPOINTS.GET_MY_USERINFO_BY_TOKEN,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentUserEmail(currentUser.data.email);
      } catch (error) {
        console.error("Error fetching current user email:", error);
        setCurrentUserEmail(null);
      }
    };

    fetchCurrentUserEmail(); // Call the function to fetch current user email

    const fetchUsers = async () => {
      try {
        if (!currentUserEmail) return;
        const response = await axios.post(
          USER_ENDPOINTS.SEARCH,
          {
            query: inputValue,
            excludeEmail: currentUserEmail,
            limit: 10,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSearchResults(response.data);
        setCachedUsers(response.data); // Update cached users after search
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Filter users from the cached list
    const filteredUsers = cachedUsers.filter((user) =>
      `${user.firstName} ${user.lastName} (${user.email})`
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );

    setSearchResults(filteredUsers);

    // Perform a new search only if the cached list is empty or the query is not fully matched in the cached list
    if (
      filteredUsers.length === 0 ||
      filteredUsers.length < cachedUsers.length
    ) {
      fetchUsers();
    }
  }, [inputValue, token]); // Remove currentUserEmail from dependencies since it's already handled inside the fetchUsers function

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setAnchorEl(e.currentTarget);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setInputValue("");
  };

  const handleCheckboxChange = (user) => {
    const isSelected = selectedUsers.some(
      (selectedUser) => selectedUser._id === user._id
    );
    if (isSelected) {
      const updatedUsers = selectedUsers.filter(
        (selectedUser) => selectedUser._id !== user._id
      );
      setSelectedUsers(updatedUsers);
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const open = Boolean(anchorEl) && inputValue.trim() !== "";

  return (
    <>
      <div className="flex"
        style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap" }}
      >
        {selectedUsers.map((user) => (
          <Chip
            key={user._id}
            label={`${user.firstName} < ${user.email} >`}
            onDelete={() => {
              const updatedUsers = selectedUsers.filter(
                (u) => u._id !== user._id
              );
              setSelectedUsers(updatedUsers);
            }}
            avatar={
              <Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
            }
            style={{ margin: "5px" }}
          />
        ))}
        <TextField
          placeholder="Type email to add recipients"
          value={inputValue}
          onChange={handleInputChange}
          variant="standard"
          style={{
            borderBottom: "1px solid black",
            // minWidth: "300px",
            marginRight: "5px",
            marginLeft: "5px",
            outline: "none",
          }}
          onFocus={(e) => setAnchorEl(e.currentTarget)}
        />
      </div>

      <Popover
        elevation={0}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocus
      >
        <List>
          {searchResults.map((user) => (
            <ListItem key={user._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedUsers.some(
                      (selectedUser) => selectedUser._id === user._id
                    )}
                    onChange={() => handleCheckboxChange(user)}
                    disabled={selectedUsers.some(
                      (selectedUser) => selectedUser._id === user._id
                    )}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
                    <Box>
                      <Typography variant="body2">{`${user.firstName} ${user.lastName}`}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
          {searchResults.length === 0 && (
            <ListItem>
              <ListItemText primary="No matching users" />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};

export default RecipientField;
