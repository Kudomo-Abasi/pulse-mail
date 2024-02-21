import React, { useMemo } from 'react';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MessageListHeader = ({ onReload, start, end, totalEmails, onPrevPage, onNextPage }) => {
  const displayRange = useMemo(() => {
    if (start !== null && end !== null && totalEmails !== null) {
      return `${start} - ${end - 1} of ${totalEmails - 1}`;
    } else {
      return '';
    }
  }, [start, end, totalEmails]);
  
  return (
    <div className="flex justify-between items-center p-1 bg-primary">
      <p>{displayRange}</p>

    {/* Backward Button */}
    <IconButton
      color="inherit"
      onClick={onPrevPage}
      disabled={start === 1}
    >
      <ChevronLeftIcon />
    </IconButton>

    {/* Reload Button */}
    <IconButton color="inherit" onClick={onReload}>
      <ReplayIcon />
    </IconButton>

    {/* Forward Button */}
    <IconButton
      color="inherit"
      onClick={onNextPage}
      disabled={end >= totalEmails}
    >
      <ChevronRightIcon />
    </IconButton>
  </div>
  );
};

export default MessageListHeader;
