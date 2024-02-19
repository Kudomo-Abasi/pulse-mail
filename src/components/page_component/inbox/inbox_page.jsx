import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
import MessageListHeader from "./components/pagination_row";
import DateAndTimeComp from "../../sub_components/date_and_time";
import { MAILBOX_ENDPOINTS } from "../../../api";
import ReloadButtonComponent from "./components/reload_button";
import axios from "axios";

const MessageListComponent = ({ onPrevPage, onNextPage, onRefresh, FFF }) => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleFetchEmails = async () => {
    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(MAILBOX_ENDPOINTS.GET_MY_INBOX, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data); // Assuming data is an array of emails
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    handleFetchEmails();
  }, []);

  const handleReload = async () => {
    await handleFetchEmails();
    console.log("reloaded");
  };
  return (
    <div>
      <div className="px-4 bg-primary flex justify-between items-center">
        {/* row 1 */}
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => navigate(-1)}
            edge="start"
            color="inherit"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Inbox
          </Typography>

          {onPrevPage && (
            <IconButton
              color="inherit"
              onClick={onPrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          {onNextPage && (
            <IconButton
              color="inherit"
              onClick={onNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon />
            </IconButton>
          )}

          {onRefresh && <ReloadButtonComponent />}
        </div>
        <div className="flex items-center space-x-2">
          {/* Sample call to MessageListHeader */}
          <MessageListHeader
            onReload={handleReload}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      <div className="m-auto">
        {messages && messages.length > 0 ? (
          <List className="mt-8 w-full">
            {messages.map((message) => (
              <Link to={"/messages/" + message._id} key={message._id}>
                <ListItemButton
                  key={message.id}
                  className={`px-4 flex items-center ${
                    message.isRead ? "bg-brandgrey" : "bg-white"
                  }`}
                  style={{ background: message.isRead ? "#faf3f8" : "white" }}
                >
                  {message.from && (
                    <ListItemAvatar>
                      <Avatar alt="User Avatar" src={message.avatar} />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={message.subject || ""}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {message.from} {/* Display "from" field */}
                        </Typography>
                        <br />
                        {message.content.length > 50
                          ? `${message.content.substring(0, 50)}...`
                          : message.content}
                      </>
                    }
                    primaryTypographyProps={{
                      style: {
                        fontWeight: message.isRead ? "normal" : "bold",
                      },
                    }}
                    secondaryTypographyProps={{
                      style: {
                        color: message.isRead ? "grey" : "black",
                      },
                    }}
                  />
                  <ListItemText
                    className="items-end text-right"
                    primary={
                      (
                        <DateAndTimeComp
                          timestamp={message.timestamp}
                        ></DateAndTimeComp>
                      ) || ""
                    }
                    
                  />
                </ListItemButton>
              </Link>
            ))}
          </List>
        ) : (
          <div className="h-full items-center align-middle flex flex-col">
            <img
              src={require("../../../assets/images/no_messages.png")}
              // src= {"../../src/logo/pulse.png"}
              alt="no messages"
              style={{
                // width: "100%",
                maxWidth: "150px",
                margin: "auto",
                marginBottom: "24px",
              }}
            />
            <Typography variant="h6" className="text-center mt-16">
              No messages
            </Typography>
          </div>
        )}
      </div>

      {/* Pagination Row */}
      <div className="flex justify-center mt-4">
        <IconButton
          color="inherit"
          onClick={onPrevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="body1">{currentPage}</Typography>
        <IconButton
          color="inherit"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageListComponent;
