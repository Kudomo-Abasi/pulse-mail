// Layout.js
import React, { useState } from "react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import MyAppBar from "./app_bar/app_bar";
import { SideNavContent } from "./side_nav/0_side_nav";
import PersistentPopup from "./page_component/compose/compose";

const Layout = ({ pageBody }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(true); // Track side nav visibility
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showPopup, setShowPopup] = useState(false);

  const handleToggleSideNav = () => {
    if (!isMobile) {
      setIsSideNavVisible(!isSideNavVisible);
    } else {
      setIsSideNavOpen(!isSideNavOpen);
    }
  };
  const handleOpenComposeModal = () => {
    // Set the state to true to show the persistent pop-up
    setShowPopup(!showPopup);
  };
  const handleCloseSideNav = () => {
    setIsSideNavOpen(false);
  };

  return (
    <div
      className="bg-brandgrey h-full"
      style={{ display: "flex", height: "100vh" }}
    >
      {/* Side Nav - Desktop Only */}
      {!isMobile && isSideNavVisible && (
        <div
          className="bg-brandgrey"
          style={{ width: "270px", maxWidth: "80vw" }}
        >
          <SideNavContent closeSideNav={handleCloseSideNav} openComposeModal={handleOpenComposeModal} />
        </div>
      )}
      {/* Nav menu and Body */}
      <div className="max-md:p-0 px-4 pb-4 flex-1 overflow-hidden ">
        <div className="h-full bg-brandgrey flex flex-col">
          <MyAppBar onOpenSideNav={handleToggleSideNav} openComposeModal={handleOpenComposeModal} />
          {/* Page Body */}
          <div className="bg-white rounded-[15px] flex-1 overflow-auto">
            {pageBody}
          </div>
        </div>
      </div>
      {showPopup && <PersistentPopup isOpen={showPopup} handleOpenOrClose={handleOpenComposeModal} />}
      {/* Side Nav - Mobile Only */}
      {isMobile && (
        <Drawer
          elevation={0}
          anchor="left"
          open={isSideNavOpen}
          onClose={handleCloseSideNav}
        >
          <div style={{ width: "350px", maxWidth: "100vw" }}>
            <SideNavContent closeSideNav={handleCloseSideNav} openComposeModal={handleOpenComposeModal} />
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Layout;
