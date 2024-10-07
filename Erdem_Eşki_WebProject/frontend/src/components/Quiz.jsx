import React, { useState, useEffect, useContext } from "react";
import Question from "./Question";
import { UserContext } from "../UserContext";
import { Button, Container, Typography } from '@mui/material';

export default function Trivia() {
    const { user } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const startQuiz = async () => {
            const res = await fetch('http://localhost:3001/quiz/start');
            const data = await res.json();
            setQuestions(data.questions);
        };
        startQuiz();
    }, []);

    const answer = (isCorrect, score) => {
        setIsVisible(true);
        if (isCorrect) {
            setTotalScore(prevScore => prevScore + score);
        }
    }

    const sendPoint = async () => {
        const response = await fetch("http://localhost:3001/quiz/score", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user._id,
                userScore: totalScore
            })
        });
        console.log(response);
    };


    const nextQuestion = () => {
        if (currentIndex + 1 === questions.length) {
            setShowResult(true);
        } else {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setIsVisible(false);
        }
    }

    useEffect(() => {
        if (showResult) {
            sendPoint();
        }
    }, [showResult]);

    if (showResult) {
        return (
            <Container className="trivia">
                <div className="hero">
                    <h1>Finished</h1>
                </div>
                <Typography variant="h4" gutterBottom>
                    Points You Reached: {parseFloat(totalScore.toFixed(5))}
                </Typography>
            </Container>
        );
    }
    return (
        <Container className="trivia">
            <div className="hero">
                <h1>Questions</h1>
            </div>
            <ul>
                {questions.slice(currentIndex, currentIndex + 1).map((question, index) => (
                    <li key={index}>
                        <Question questionNumber={currentIndex + 1} question={question} onAnswerClick={answer} selectedAnswer={selectedAnswer} />
                    </li>
                ))}
                {isVisible &&
                    <Button fullWidth variant="contained" color="success" onClick={nextQuestion}>Next Question</Button>}
            </ul>
        </Container>
    );
}
