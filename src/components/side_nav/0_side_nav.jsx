import React, { useRef, useEffect, useState } from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export const SideNavContent = ({ closeSideNav, openComposeModal }) => {
  const sideNavRef = useRef(null);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setShowCloseButton(width <= 600); // Adjust the threshold for small devices
    };

    updateDimensions(); // Call initially to set the initial state

    // Add event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="p-4" ref={sideNavRef}>
      {showCloseButton && (
        <IconButton
          onClick={closeSideNav}
          className="flex flex-row items-end lg:hidden"
          style={{ top: 0, right: 0, float: "right" }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <Link to="/" onClick={closeSideNav} className="mb-5">
        <img
          src={require("../../logo/pulsemail.png")}
          alt="Pulsemail Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </Link>
      <br></br>
      {/* List Items */}
      <List>
        <Link to="/" onClick={closeSideNav}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>

        <Link to="/messages" onClick={closeSideNav}>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </Link>
      </List>
      <br></br>
      {/* Compose Button */}
      <Button
        variant="contained"
        onClick={() => {
          closeSideNav();
          openComposeModal();
        }}
      >
        <AddIcon className="mr-4" />
        Compose
      </Button>
    </div>
  );
};
