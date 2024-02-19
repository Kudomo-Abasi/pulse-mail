import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { MAILBOX_ENDPOINTS } from "../../../api";
import axios from "axios";
import DateAndTimeComp from "../../sub_components/date_and_time";

const UnreadMessageBadge = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const handlePopoverOpen = async (event) => {
    setAnchorEl(event.currentTarget);
    setLoading(true); // Start loading indicator
    await fetchEmails(); // Fetch emails when popover opens
    setLoading(false); // Stop loading indicator
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const fetchEmails = async () => {
    try {
      const token = localStorage.getItem("token");
      const length = 4; // Default length to 4
      const response = await axios.get(MAILBOX_ENDPOINTS.GET_MY_UNREAD_INBOX, {
        params: {
          length, // Add length parameter
          // startAfter, // Add startAfter parameter
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data); // Assuming data is an array of emails
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const fetchUnreadMessagesCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        MAILBOX_ENDPOINTS.GET_MY_INBOX_UNREAD_COUNT,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnreadMessagesCount(response.data.length);
    } catch (error) {
      console.error("Error fetching unread messages count:", error);
    }
  };

  useEffect(() => {
    // fetchEmails();
    fetchUnreadMessagesCount();
  }, []); // Fetch emails and unread message count once when component mounts

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="unread messages"
        onClick={handlePopoverOpen}
      >
        <Badge badgeContent={unreadMessagesCount} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Popover
        elevation={0}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {loading ? (
          <CircularProgress className="m-3" />
        ) : messages.length > 0 ? (
          <List className="max-w-96">
            {messages.map((message) => (
              <Link to={`/messages/${message._id}`} key={message._id}>
                <ListItem onClick={handlePopoverClose} className="flex">
                  <ListItemAvatar>
                    <Avatar alt="User Avatar" src={message.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    className="flex-grow"
                    primary={message.subject}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {message.from}
                        </Typography>
                        <br />
                        {message.content.length > 50
                          ? `${message.content.substring(0, 50)}...`
                          : message.content}
                      </>
                    }
                  />
                  <div className="flex flex-col items-end">
                    <DateAndTimeComp timestamp={message.timestamp} />
                  </div>
                </ListItem>
              </Link>
            ))}
            <Button
              className="m-auto w-full"
              variant="text"
              color="primary"
              component={Link}
              to="/messages" // Navigate to "/messages" route
              onClick={handlePopoverClose} // Close the popover
            >
              Show All Messages
            </Button>
          </List>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={require("../../../assets/images/no_messages.png")}
              alt="No messages"
              style={{ display: "block", margin: "auto" }}
            />
            <Typography variant="body2" color="textSecondary">
              No unread messages
            </Typography>
            <br />
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/messages"
            >
              Go to Messages
            </Button>
          </div>
        )}
      </Popover>
    </div>
  );
};

export default UnreadMessageBadge;
