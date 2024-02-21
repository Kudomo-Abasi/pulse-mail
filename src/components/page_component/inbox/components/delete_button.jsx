import React, { useState } from "react";
import axios from "axios";
import { Button, MenuItem, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { EMAIL_ENDPOINTS } from "../../../../api";

const DeleteButton = ({ emailId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Make a DELETE request to delete the email by its ID
      await axios.delete(EMAIL_ENDPOINTS.DELETE, {
        params: { emailId: emailId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // If the request is successful, update the UI to reflect the deletion
      setSuccess(true);
      console.log("Email deleted successfully");
    } catch (err) {
      // If there's an error, set the error state to display an error message
      setError("Error deleting email. Please try again later.");
      console.error("Error deleting email:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <MenuItem onClick={handleDelete} disabled={loading}>
      <DeleteIcon sx={{ mr: 1 }} />
        {loading ? "Deleting..." : "Delete"}
      </MenuItem>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Email deleted successfully"
      />
    </div>
  );
};

export default DeleteButton;
