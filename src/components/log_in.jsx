import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "../api";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { WindowSharp } from "@mui/icons-material";

export default function SignIn() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      // Fetch user information using the token
      axios
        .get(USER_ENDPOINTS.GET_MY_USERINFO_BY_TOKEN, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setError("An error occurred while fetching user information");
          console.error("Error fetching user information:", error);
        });
    } else {
      // Handle case when token is not available
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = AUTH_ENDPOINTS.LOGIN;
      const response = await axios.post(url, data);
      const token = response.data.data.token; // Extract token from response

      // Store token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userData", response.data.data.userData);

      // Fetch user information using the token
      const userInfoResponse = await axios.get(
        USER_ENDPOINTS.GET_MY_USERINFO_BY_TOKEN,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(userInfoResponse.data); // Set user state
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8} style={{ textAlign: "center" }}>
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
        <br></br>
        {/* <Typography variant="h4" gutterBottom>
          Welcome Back!
        </Typography> */}
        {user ? (
          <>
            <Typography variant="h5">Continue as {user.email}</Typography>
            <Button
              onClick={handleSignOut}
              variant="contained"
              color="primary"
              mt={2}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h4">
              Sign in to your Account
            </Typography>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
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
                Login
              </Button>
            </form>
          </>
        )}
        <br />

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">
              New Here?{" "}
              <Button
                component={Link}
                to="/signup"
                sx={{
                  color: "inherit",
                  textDecoration: "underline",
                  "&:hover": {
                    textDecoration: "underline", // Maintain underline on hover
                  },
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Button component={Link} to="/" variant="outlined" color="primary">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
