var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PlaceSchema = new Schema({
	city: String,
	country: String,
	favoriteSite: String,
	haveVisited: Boolean,
	futureDestination: Boolean
 });

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;