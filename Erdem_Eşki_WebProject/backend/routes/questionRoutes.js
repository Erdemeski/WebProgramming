var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController.js');


router.get('/', questionController.list);
router.post('/api', questionController.api);
module.exports = router;
