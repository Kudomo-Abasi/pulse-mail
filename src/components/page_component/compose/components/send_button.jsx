import React from "react";
import { Button, CircularProgress, Snackbar } from "@mui/material";

const SendButton = ({ onClick, sending }) => {

  return (
    <>
      <Button onClick={() => {
        onClick();
      }} color="primary" disabled={sending}>
        {sending ? <CircularProgress size={24} /> : "Send"}
      </Button>
    </>
  );
};

export default SendButton;
