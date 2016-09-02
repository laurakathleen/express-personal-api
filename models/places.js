var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PlaceSchema = new Schema({
	city: String,
	country: String,
	image: String,
	favoriteSite: String,
	haveVisited: Boolean,
	futureDestination: Boolean,
	bestFood: String
 });

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;