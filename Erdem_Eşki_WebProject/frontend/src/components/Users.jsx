import React, { useEffect, useState } from "react";
import User from "./User";
import { Container, Typography, Grid } from '@mui/material';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3001/users");
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Users
            </Typography>
            <Grid container spacing={2}>
                {users.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <User user={user} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
