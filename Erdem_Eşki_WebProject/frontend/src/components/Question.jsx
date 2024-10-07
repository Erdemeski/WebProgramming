import React, { useState, useEffect } from "react";
import { Button, Typography, useTheme, Container } from "@mui/material";



export default function Question(props) {
  const theme = useTheme();
  const [startTime, setStartTime] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [backgroundColors, setBackgrounds] = useState(
    Array(props.question.all_answers.length).fill(null)
  );

  function convertHtmlEntities(jsonString) {
    return jsonString
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&rdquo;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  useEffect(() => {
    setSelectedAnswer(null);
    setStartTime(new Date());
    setBackgrounds(Array(props.question.all_answers.length).fill(null));
  }, [props.question]);

  const handleClick = async (selectedAnswer, question, index) => {
    const endTime = new Date();
    const timeElapsed = (endTime - startTime) / 1000;
    const newBackgroundColors = [...backgroundColors];
    setSelectedAnswer(question.all_answers[index]);

    try {
      const response = await fetch('http://localhost:3001/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question,
          userAnswer: selectedAnswer,
          timeElapsed: timeElapsed
        })
      });
      const data = await response.json();
      const isCorrect = data.grade;
      if (isCorrect) {
        newBackgroundColors[index] = "green";
      } else {
        newBackgroundColors[index] = "red";
      }
      setBackgrounds(newBackgroundColors);
      props.onAnswerClick(isCorrect, data["score"]);

    } catch (err) {
      console.log(err);
    }
  };

  const isDisabled = (answer) =>
    selectedAnswer !== null && answer !== selectedAnswer;

  return (

    <Container>
      <Typography variant="h6" gutterBottom>
        {props.questionNumber}. {convertHtmlEntities(props.question.question)}
      </Typography>
      <ul>
        {props.question.all_answers.map((answer, i) => (
          <div key={answer}>
            <Button fullWidth variant="contained" style={{
              backgroundColor:
                backgroundColors[i] !== null ? backgroundColors[i] : theme.palette.background.paper,
              paddingRight: "200px",
              marginBottom: "30px",
              color: "black",
            }}
              onClick={() => { handleClick(answer, props.question, i); }}
              disabled={isDisabled(answer)}>
              {convertHtmlEntities(answer)}
            </Button>
          </div>
        ))}
      </ul>
    </Container>
  );
}
























/* import React, { useState, useEffect } from "react";
import { Button, Typography, useTheme, Container } from "@mui/material";

function convertHtmlEntities(json) {
    return JSON.parse(
        `{"text":"${json.replace(/&/g, "\\u0026").replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/"/g, "\\u0022")}"}`.replace(/\\u/g, '%u')
    ).text;
}

function Question({ question, onNext }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [showCorrect, setShowCorrect] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    useEffect(() => {
        if (question) {
            const shuffledAnswers = [
                ...question.incorrect_answers,
                question.correct_answer
            ].sort(() => Math.random() - 0.5);
            setAnswers(shuffledAnswers);
            setCorrectAnswer(question.correct_answer);
            setSelectedAnswer(null);
            setShowCorrect(false);
        }
    }, [question]);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        setShowCorrect(true);
    };

    const handleNextClick = () => {
        onNext(selectedAnswer === correctAnswer);
        setShowCorrect(false);
    };

    const theme = useTheme();

    return (
        <Container sx={{ mt: 5, textAlign: 'center' }}>
            {question && (
                <>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        {convertHtmlEntities(question.question)}
                    </Typography>
                    <div>
                        {answers.map((answer, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color={showCorrect ? (answer === correctAnswer ? "success" : "error") : "primary"}
                                onClick={() => handleAnswerClick(answer)}
                                sx={{ 
                                    mb: 1, 
                                    mr: 1, 
                                    width: '100%',
                                    backgroundColor: selectedAnswer === answer ? theme.palette.grey[500] : undefined
                                }}
                            >
                                {convertHtmlEntities(answer)}
                            </Button>
                        ))}
                    </div>
                    {showCorrect && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleNextClick}
                            sx={{ mt: 3 }}
                        >
                            Next
                        </Button>
                    )}
                </>
            )}
        </Container>
    );
}

export default Question;
 */