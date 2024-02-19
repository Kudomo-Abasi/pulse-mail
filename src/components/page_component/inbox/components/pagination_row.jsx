import React from 'react';
import { IconButton, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const MessageListHeader = ({ onReload, currentPage, totalPages }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-primary">
      {/* Reload Button */}
      <IconButton color="inherit" onClick={onReload}>
        <ReplayIcon />
      </IconButton>

      {/* Message Count Text */}
      <Typography variant="body2">
        {`${currentPage}-${currentPage + 1} of ${totalPages} messages`}
      </Typography>
    </div>
  );
};

export default MessageListHeader;
