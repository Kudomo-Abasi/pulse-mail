import React from "react";
import MenuButton from "./leading_button/menu_button";
import SearchBar from "./search_bar/search_bar";
import UnreadMessageBadge from "./actions/unread_messages";
import UserProfile from "./actions/user_widget";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

const MyAppBar = ({ onOpenSideNav, openComposeModal }) => {
  return (
    <div
      className="w-full py-2 px-4"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <MenuButton onClick={onOpenSideNav} />
        {/* <SearchBar /> */}
      </div>
      <div className="flex align-middle">
        <IconButton
          onClick={openComposeModal}
          className="mr-12"
          color="inherit"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <UnreadMessageBadge className="mr-4" />
        <UserProfile
        />
      </div>
    </div>
  );
};

export default MyAppBar;
