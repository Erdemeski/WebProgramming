var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
	'userId': { type: Schema.Types.ObjectId, ref: 'user' },
	'value': { type: Number, required: true },
	'date': { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);


