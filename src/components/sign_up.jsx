import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../api";
import {
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUp() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUpUrl = AUTH_ENDPOINTS.REGISTER;
      // const signUpUrl = "http://localhost:5000/api/users";
      // Sign up the user
      await axios.post(signUpUrl, data);

      // Sign in the user after successful sign up
      const signInUrl = AUTH_ENDPOINTS.LOGIN; // "http://localhost:5000/api/auth";
      const signInData = { email: data.email, password: data.password };
      const signInResponse = await axios.post(signInUrl, signInData);
      const token = signInResponse.data.data.token;
      // Store the authentication token in local storage
      localStorage.setItem("token", signInResponse.data.data.token);
      
      localStorage.setItem("userData", signInResponse.data.data.userData);

      console.log(localStorage.getItem(token));
      // Redirect the user to the desired page
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8}>
        <img
          src={require("../../src/logo/pulse.png")}
          // src= {"../../src/logo/pulse.png"}
          alt="pulse mail logo"
          style={{
            width: "100%",
            maxWidth: "300px",
            margin: "auto",
            marginBottom: "24px",
          }}
        />
        {/* <Typography variant="h1">Welcome</Typography> */}
        <Typography variant="h4">Create Account</Typography>
        <br></br>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={data.password}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            mt={2}
          >
            Sign Up
          </Button>
        </form>
        <br />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">
              New Here? <Link to="/signin">Sign In</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
