const Question = require('../models/questionModel');
const Score = require('../models/scoreModel');

module.exports = {
    startQuiz: async (req, res) => {
        try {
            const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
            res.status(200).json({ questions });
        } catch (error) {
            console.error("Error starting quiz:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    saveTotalScore: function (req, res) {
        try {
            const { userId, userScore } = req.body;
            const newTotalScore = new Score({ userId: userId, value: userScore });
            newTotalScore.save();
            res.status(200).json({ userScore });
        } catch (error) {
            console.error("Error saving total score:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    submitAnswer: async (req, res) => {
        try {
            const { question, userAnswer, timeElapsed } = req.body;
            const grade = (userAnswer === question.correct_answer) ? 1 : 0;
            const n = 100 * grade;
            const k = 0.2;
            let score = n * Math.exp(-k * timeElapsed);
            score = parseFloat(score.toFixed(5));

            res.status(200).json({
                message: "Answer submitted successfully", score: score, grade: grade
            });
        } catch (error) {
            console.error("Error submitting answer:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getScoreTable: function (req, res) {
        Score.find({})
            .populate('userId', 'username')
            .sort({ value: -1 })
            .exec(function (err, scores) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                return res.json(scores);
            });
    }


};



