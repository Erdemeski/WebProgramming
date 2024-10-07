import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { AppBar, Toolbar, Typography, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

function LogoutButton() {
    const userContext = useContext(UserContext);
    const handleLogout = () => {
        if (userContext.user) {
            userContext.setUserContext(null);
            alert("Successfully logged out");
        } else {
            alert("There is no user logged in yet.");
        }
    };

    return (
        <Chip label="Logout" onClick={handleLogout} />
    );
}

export default function Header() {
    const userContext = useContext(UserContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Quiz Show
                </Typography>
                {userContext.user ? (
                    <>
                        <LogoutButton />
                        <Button color="inherit" component={Link} to="/profile">Profile</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/users">All Players</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
