import React from "react";
import { Typography } from "@mui/material";

const convertToCustomFormat = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  
  if (date.toDateString() === today.toDateString()) {
    // Display time only if it's today
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  } else if (date.getFullYear() === today.getFullYear()) {
    // Display month and day if it's in the current year
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  } else {
    // Display full date if it's from a different year
    return date.toLocaleDateString([], { year: "2-digit", month: "2-digit", day: "2-digit" });
  }
};

const DateAndTimeComp = ({ timestamp }) => {
  const formattedDate = convertToCustomFormat(timestamp);

  return (
    <Typography variant="body1">
      {formattedDate}
    </Typography>
  );
};

export default DateAndTimeComp;
