import { useState } from "react";
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const br = {
    marginTop: "15rem"
};

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        if (res.ok) {
            navigate("/login");
        } else {
            setError("You could not register");
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }} >
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={br}>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField fullWidth label="Email" margin="normal" type="text" variant="standard" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <TextField fullWidth label="Username" margin="normal" type="text" variant="standard" name="username" value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <TextField fullWidth label="Password" variant="standard" margin="normal" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Register
                </Button>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
            </form>
        </Container>
    );
}
