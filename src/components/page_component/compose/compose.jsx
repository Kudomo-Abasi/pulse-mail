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
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import RecipientField from "./components/recipient_textfield";
import { MAILBOX_ENDPOINTS, USER_ENDPOINTS } from "../../../api";
import SmallUserProfile from "./components/small_user_component";
import SendButton from "./components/send_button";
import UserProfile from "../../app_bar/actions/user_widget";

const PersistentPopup = ({ isOpen, handleOpenOrClose }) => {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState(localStorage.getItem("emailSubject") || "");
  const [content, setContent] = useState(localStorage.getItem("emailContent") || "");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedUsers, setSelectedUsers] = useState(JSON.parse(localStorage.getItem("selectedUsers")) || []);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchCurrentUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(USER_ENDPOINTS.GET_MY_USERINFO_BY_TOKEN, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const currentUserEmail = response.data._id;
        setSender(currentUserEmail);
      } catch (error) {
        console.error("Error fetching current user email:", error);
      }
    };

    fetchCurrentUserEmail();
  }, [token]);

  useEffect(() => {
    localStorage.setItem("emailSubject", subject);
  }, [subject]);

  useEffect(() => {
    localStorage.setItem("emailContent", content);
  }, [content]);

  useEffect(() => {
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

    setSending(true);

    try {
      await axios.post(MAILBOX_ENDPOINTS.SEND, {
        from: sender,
        to: selectedUsers.map((user) => user.email),
        subject: subject,
        content: content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("emailSubject");
      localStorage.removeItem("emailContent");
      localStorage.removeItem("selectedUsers");

      handleOpenOrClose();
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isSmallScreen ? (
        <Dialog open={isOpen} onClose={handleOpenOrClose} fullScreen>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">New Message</Typography>
              <IconButton onClick={handleOpenOrClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-row align-middle items-center" style={{ marginBottom: "20px" }}>
              <Typography variant="body1">From: </Typography>
              <SmallUserProfile />
            </div>
            <div className="flex flex-row" style={{ marginBottom: "20px" }}>
              <Typography variant="body1">To:</Typography>
              <RecipientField
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            </div>
            <hr />
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
            <SendButton onClick={handleSend} sending={sending} />
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={isOpen} onClose={handleOpenOrClose} fullWidth maxWidth="sm">
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">New Message</Typography>
              <IconButton onClick={handleOpenOrClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-row align-middle items-center" style={{ marginBottom: "20px" }}>
              <Typography variant="body1">From: </Typography>
              <SmallUserProfile />
            </div>
            <div className="flex flex-row" style={{ marginBottom: "20px" }}>
              <Typography variant="body1">To:</Typography>
              <RecipientField
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            </div>
            <hr />
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
            <SendButton onClick={handleSend} sending={sending} />
          </DialogActions>
        </Dialog>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        message="Email sent successfully"
      />
    </>
  );
};

export default PersistentPopup;
