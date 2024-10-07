var QuestionModel = require('../models/questionModel.js');
var axios = require("axios");
const _ = require("lodash");
const apiUrl = "https://opentdb.com/api.php?amount=10";
module.exports = {

    api: async function (req, res) {
        try {
            const response = await axios.get("https://opentdb.com/api.php?amount=50");
            const questions = response.data.results;

            const questionDocuments = questions.map(que => {
                const question = que.question;
                const correct_answer = que.correct_answer;
                const all_answers = _.shuffle([...que.incorrect_answers, que.correct_answer]);
                return {
                    question: question,
                    correct_answer: correct_answer,
                    all_answers: all_answers
                };
            });

            const result = await QuestionModel.insertMany(questionDocuments);
            res.send("The data has been saved to MongoDB.");
        } catch (err) {
            res.status(500).send("There is a problem for saving the data.");
        }
    },

    list: function (req, res) {
        QuestionModel.find(function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error for getting question.',
                    error: err
                });
            }
            console.log(questions);
            res.json(questions);
        });
    }
};
