var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PlaceSchema = new Schema({
	city: String,
	country: String,
	image: String,
	favoriteSite: String,
	planningToReturn: Boolean,
	favoriteFood: String,
	flag: String,
	cityPopulation: Number,
 });

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;