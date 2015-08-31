var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	event_title: String,
	event_time: String,
	created_by: { type: String, ref: 'User' },		//should be changed to ObjectId, ref "User"
	created_time: {type: Date, default: Date.now},
	created_location: String,
	text: String
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);