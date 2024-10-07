import React, { useContext } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';

const boxStyle = {
  backgroundColor: "rgba(250, 250, 250, 0.8)",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
  padding: "200px 100px",
  borderRadius: "1px",
  textAlign: "center"
};
const br = {
  marginBottom: "2rem",
};
const containerStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  padding: "20px"
};
export default function MainPage() {
  const userContext = useContext(UserContext);
  const { user } = useContext(UserContext);

  return (
    <Container style={containerStyle}>
      {userContext.user ? (

        <Box sx={boxStyle}>
          <Typography variant="h3" fontWeight="bold" sx={br}>{user.username}!</Typography>
          <Typography variant="h4" fontWeight="bold" sx={br}>
            Welcome to Quiz Show
          </Typography>
          <Link to="/trivia" style={{ width: "100%", textDecoration: "none" }}>
            <Button variant="contained" color="primary" fullWidth>
              Start the Quiz
            </Button>
          </Link>
        </Box>
      ) : (
        <Box sx={boxStyle}>
          <Typography variant="h4" fontWeight="bold" sx={br}>
            Welcome to Quiz Show
          </Typography>
          <Link to="/login" style={{ width: "100%", textDecoration: "none" }}>
            <Box mx={10} pb={3}>
              <Button variant="outlined" color="primary" fullWidth>
                Please Login
              </Button>
            </Box>
          </Link>
          <Typography variant="body1" fontWeight="bold">
            or
          </Typography>
          <Link to="/register" style={{ width: "100%", textDecoration: "none" }}>
            <Box mx={10} pb={3}>
              <Button variant="text" color="primary" fullWidth>
                Register
              </Button>
            </Box>
          </Link>
        </Box>
      )}
    </Container>
  );
}