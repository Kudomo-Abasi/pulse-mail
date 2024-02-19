import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DateAndTimeComp from "../../sub_components/date_and_time";
import { Avatar } from "@mui/material";
import { EMAIL_ENDPOINTS } from "../../../api";

const EachMessagePage = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { messageId } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          EMAIL_ENDPOINTS.GET_EMAIL_BY_ID(messageId),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data) {
          setEmail(response.data[0]);
          // Mark email as read when page is opened
          await handleMarkAsRead();
        } else {
          setEmail(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching email:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmail();
  }, [messageId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async () => {
    try {
      await axios.put(EMAIL_ENDPOINTS.MARK_AS_READ(messageId),{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmail((prevState) => ({ ...prevState, isRead: false }));
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  const handleMarkAsUnread = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(EMAIL_ENDPOINTS.MARK_AS_UNREAD(messageId), {},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setEmail((prevState) => ({ ...prevState, isRead: true }));
    } catch (error) {
      console.error("Error marking email as unread:", error);
    }
    handleClose();
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Error fetching email: {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </Button>
      </div>
    );
  }

  if (!email) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Email not found. Please go to the home page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </Button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <IconButton color="inherit" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <div className="flex items-center">
          <IconButton color="inherit">
            <ArrowLeftIcon />
          </IconButton>
          <IconButton color="inherit">
            <ArrowRightIcon />
          </IconButton>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex items-start">
          <Avatar sx={{ lineHeight: 0 }}>S</Avatar>
          <div className="ml-3 leading-none items-start text-left">
            <Typography variant="body1">From: {email.from}</Typography>
            <Typography variant="body1">
              To:{" "}
              {email.to && email.to.length
                ? email.to.join(", ")
                : "No recipient"}
            </Typography>
          </div>
        </div>
        <div className="ml-auto text-right">
          <DateAndTimeComp timestamp={email.timestamp}></DateAndTimeComp>
          <IconButton color="inherit" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            elevation={0}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMarkAsUnread}>
              <MarkunreadIcon sx={{ mr: 1 }} /> Mark as Unread
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ReplyIcon sx={{ mr: 1 }} /> Reply
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <DeleteIcon sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="mb-4 text-left">
        <Typography variant="h4">{email.subject}</Typography>
      </div>

      <div className="mb-4 text-left">
        <Typography variant="body1">{email.content}</Typography>
      </div>
      <br />
      <hr />
      <br />
      <div className="float-start">
        <Button
          variant="contained"
          startIcon={<ReplyIcon />}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reply
        </Button>
      </div>
    </div>
  );
};

export default EachMessagePage;
