var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quizController.js');

router.get('/start', quizController.startQuiz);
router.post('/score', quizController.saveTotalScore);
router.post('/submit', quizController.submitAnswer);
router.get('/scores', quizController.getScoreTable);

module.exports = router;
