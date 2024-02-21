import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { MAILBOX_ENDPOINTS } from "../../../api";

const HomePage = ({ userName, onViewMessagesClick }) => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setFirstName(userData.firstName);
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const unreadResponse = await axios.get(
          MAILBOX_ENDPOINTS.GET_MY_INBOX_UNREAD_COUNT,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUnreadMessages(unreadResponse.data);

        const totalResponse = await axios.get(
          MAILBOX_ENDPOINTS.GET_MY_INBOX_COUNT,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTotalMessages(totalResponse.data.length);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReload = async () => {
    try {
      setLoading(true);
      setError(null);
      await fetchData();
    } catch (error) {
      console.error("Error reloading data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const unreadResponse = await axios.get(
        MAILBOX_ENDPOINTS.GET_MY_INBOX_UNREAD_COUNT,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUnreadMessages(unreadResponse.data);

      const totalResponse = await axios.get(
        MAILBOX_ENDPOINTS.GET_MY_INBOX_COUNT,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTotalMessages(totalResponse.data.length);
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <Typography className="mb-4" variant="h4">
        Hello {firstName}
      </Typography>

      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : error ? (
        <div>
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
          <Button variant="contained" onClick={handleReload}>
            Reload
          </Button>
        </div>
      ) : unreadMessages && unreadMessages.length === 0 ? (
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          You have no unread messages out of {totalMessages} total.
        </Typography>
      ) : (
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          You have {unreadMessages.length} unread messages out of{" "}
          {totalMessages} total.
        </Typography>
      )}

      <Link to="/messages">
        <Button
          variant="contained"
          color="primary"
          onClick={onViewMessagesClick}
          style={{ marginTop: "16px" }}
        >
          View Messages
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
