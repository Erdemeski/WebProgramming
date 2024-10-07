import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Box, Typography, Container, Paper } from '@mui/material';

import '../index.css';

export default function UserProfile() {
    const { user } = useContext(UserContext);
    const [scores, setScores] = useState([]);
    const [highestScore, setHighestScore] = useState(0);
    const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/userScores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user._id
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch scores');
                }

                const data = await response.json();
                setScores(data);
                calculateStats(data);
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, [user._id]);

    const calculateStats = (scores) => {
        let highest = 0;
        let totalPlayed = scores.length;

        scores.forEach(score => {
            if (score.value > highest) {
                highest = score.value;
            }
        });

        setHighestScore(highest);
        setTotalGamesPlayed(totalPlayed);
    };

    return (
        <Container className="profile-container" sx={{ mt: 8 }}>
            <Typography variant="h2" align="center" gutterBottom>
                Your Profile
            </Typography>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Username: {user.username}</Typography>
                    <Typography variant="body1" fontWeight="bold">Highest Point: {parseFloat(highestScore.toFixed(5))}</Typography>
                    <Typography variant="body1" fontWeight="bold">Total Games: {totalGamesPlayed}</Typography>
                    <Typography variant="body1" fontWeight="bold">Points Achieved:</Typography>
                    <ul>
                        {scores.map((score, index) => (
                            <li key={index}>{parseFloat(score.value.toFixed(5))}</li>
                        ))}
                    </ul>
                </Box>
            </Paper>
        </Container>
    );
}


