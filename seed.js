// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_place = [
	{
    city: "Rome",
	country: "Italy",
	favoriteSite: "Pantheon",
	},
	{
    city: "Dublin",
	country: "Ireland",
	favoriteSite: "Guinness Factory",
	}
 ];

    db.Place.remove({}, function (err, profiles) {
  	console.log('removed all places');
  	db.Place.create(new_place, function (err, place){
    if (err) {
    	console.log("Error", err);
    } else {
    	console.log("Created new place", place);
    }
	});
	place.save(function(err, savedPlace){
		if(err){
			return console.log('error with saving places');
		}
	});
  });


// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
// 	if (err){
// 		return console.log("Error:", err);
// 	}

// 	console.log("Created new campsite", campsite._id)
// 	process.exit(); // we're all done! Exit the program.
// 	})
