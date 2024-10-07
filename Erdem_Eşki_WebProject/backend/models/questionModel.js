var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const questionSchema = new Schema({
	'question': String,
	'correct_answer': String,
	'all_answers': [String]
});


module.exports = mongoose.model('question', questionSchema);

