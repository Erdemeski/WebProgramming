import React from "react";
import { Card, CardContent, Typography, Avatar } from '@mui/material';

export default function User({ user }) {
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar src={`${process.env.PUBLIC_URL}/images/avatar.png`} alt={user.username} sx={{ width: 60, height: 60, mr: 2 }} />
            <CardContent>
                <Typography variant="h6">{user.username}</Typography>
                <Typography variant="body2">Email: {user.email}</Typography>
            </CardContent>
        </Card>
    );
}
