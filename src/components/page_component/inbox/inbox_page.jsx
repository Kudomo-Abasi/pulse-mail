import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import { Link, useNavigate } from "react-router-dom";
import MessageListHeader from "./components/pagination_row";
import DateAndTimeComp from "../../sub_components/date_and_time";
import { MAILBOX_ENDPOINTS } from "../../../api";
import axios from "axios";

const InboxMailsListComponent = () => {
  const [messages, setMessages] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [totalEmails, setTotalEmails] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  const navigate = useNavigate();

  const PAGE_SIZE = 10;

  const handleFetchEmails = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(MAILBOX_ENDPOINTS.GET_MY_INBOX, {
        params: {
          page,
          limit: PAGE_SIZE,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data.messages);
      setStart(response.data.startIndex);
      setEnd(response.data.endIndex);
      setTotalEmails(response.data.totalEmails);
      setHasMorePages(response.data.hasMorePages);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchEmails(currentPage);
  }, [currentPage]);

  const handleReload = async () => {
    setError(null);
    await handleFetchEmails(currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalEmails / PAGE_SIZE)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      {/* floating header */}
      <div className="sticky top-0 z-50 bg-primary px-4 flex justify-between items-center bg-brandwhite">
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
        </div>
        <div className="flex items-center space-x-2">
          <MessageListHeader
            onReload={handleReload}
            start={start}
            end={end}
            totalEmails={totalEmails}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>
      </div>
      <div className="m-auto">
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <div>
            <Typography variant="h6" color="error">
              Error fetching messages.
            </Typography>
            <IconButton color="error" onClick={handleReload}>
              <ReplayIcon />
            </IconButton>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default InboxMailsListComponent;
