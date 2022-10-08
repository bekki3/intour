var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	title: String,
	location: String,
    days: Number,
    numOfPeople: Number,
    price: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Tour', imageSchema);