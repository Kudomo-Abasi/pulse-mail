import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/page_component/home/home_page";
import MessageListComponent from "./components/page_component/inbox/inbox_page";
import Layout from "./components/layout";
import { SideNavContent } from "./components/side_nav/0_side_nav";
import EachMessagePage from "./components/page_component/each_message/each_message_page";
import SignUp from "./components/sign_up";
import SignIn from "./components/sign_in";
import Main from "./components/main";
import SentMailsListComponent from "./components/page_component/sent/sent_page";

const RoutesLayout = () => {
  const user = localStorage.getItem('token');
  const isAuthenticated = !!user;

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Layout sideNav={<SideNavContent />} pageBody={<HomePage />} />} />
          <Route path="/messages" element={<Layout sideNav={<SideNavContent />} pageBody={<MessageListComponent />} />} />
          <Route path="/messages/:messageId" element={<Layout sideNav={<SideNavContent />} pageBody={<EachMessagePage />} />} />
          <Route path="/sent-messages" element={<Layout sideNav={<SideNavContent />} pageBody={<SentMailsListComponent />} />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate replace to="/signin" />} />
      )}
    </Routes>
  );
};

export default RoutesLayout;
