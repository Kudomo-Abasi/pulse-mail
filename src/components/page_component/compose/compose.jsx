import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import RecipientField from "./components/recipient_textfield";
import { EMAIL_ENDPOINTS, MAILBOX_ENDPOINTS, USER_ENDPOINTS } from "../../../api";
import SmallUserProfile from "./components/small_user_component";

const PersistentPopup = ({ isOpen, handleOpenOrClose }) => {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState(
    localStorage.getItem("emailSubject") || ""
  );
  const [content, setContent] = useState(
    localStorage.getItem("emailContent") || ""
  );
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false); // State to track if email is being sent
  const token = localStorage.getItem("token");
  const [selectedUsers, setSelectedUsers] = useState(
    JSON.parse(localStorage.getItem("selectedUsers")) || []
  );

  useEffect(() => {
    // Fetch current user's email using token
    const fetchCurrentUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          USER_ENDPOINTS.GET_MY_USERINFO_BY_TOKEN,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        const currentUserEmail = response.data.email;
        setSender(currentUserEmail);
      } catch (error) {
        console.error("Error fetching current user email:", error);
      }
    };

    fetchCurrentUserEmail();
  }, [token]);

  useEffect(() => {
    // Save the subject to localStorage when it changes
    localStorage.setItem("emailSubject", subject);
  }, [subject]);

  useEffect(() => {
    // Save the content to localStorage when it changes
    localStorage.setItem("emailContent", content);
  }, [content]);

  useEffect(() => {
    // Save the selectedUsers to localStorage when it changes
    localStorage.setItem("selectedUsers", JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  const handleSend = async () => {
    if (selectedUsers.length === 0) {
      setError("Recipient cannot be empty.");
      return;
    }

    if (!subject || !content) {
      setError("Subject and content cannot be empty.");
      return;
    }

    setSending(true); // Start sending state
    console.log("we got heree")
    console.log(selectedUsers.map((user) => user.email));
    try {
      // Add logic to send the email
      await axios.post(MAILBOX_ENDPOINTS.SEND, {
        from: sender,
        to: selectedUsers.map((user) => user.email), // Use selectedUsers as recipients
        subject: subject,
        content: content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      // Clear localStorage values after sending
      localStorage.removeItem("emailSubject");
      localStorage.removeItem("emailContent");
      localStorage.removeItem("selectedUsers");

      // Close the popup after sending
      handleOpenOrClose();
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Failed to send email. Please try again.");
    } finally {
      setSending(false); // Reset sending state
    }
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={isOpen}
      onClose={handleOpenOrClose}
      fullWidth
      maxWidth="sm"
      PaperProps={
        {
          // sx: {
          //   padding: "20px",
          // },
        }
      }
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">New Message</Typography>
          <IconButton onClick={handleOpenOrClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: "20px" }}>
          <Typography variant="body1">From: </Typography>
          <SmallUserProfile />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Typography variant="body1">To:</Typography>
          <RecipientField
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
        {searchResult.length > 0 && (
          <ul>
            {searchResult.map((user) => (
              <li key={user._id}>{user.email}</li>
            ))}
          </ul>
        )}{" "}
        <hr/>
        <br />
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <br />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={10}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
      </DialogContent>
      <DialogActions>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
        <Button onClick={handleOpenOrClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary" disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersistentPopup;
