import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Container, TextField, Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

const br = {
    marginTop: "15rem"
};

export default function Login() {
    const userContext = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (res.ok) {
            const userData = await res.json();
            userContext.setUserContext(userData);
        } else {
            setError("You could not login. Username or password is wrong!");
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={br}>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="standard"
                    margin="normal"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="standard"
                    margin="normal"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Log In
                </Button>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                {userContext.user && <Navigate replace to="/" />}
            </form>
        </Container>
    );
}
