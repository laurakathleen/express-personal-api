// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_place = [
	{
    city: "Rome",
	country: "Italy",
	image: "String",
	favoriteSite: "Pantheon",
	haveVisited: true,
	futureDestination: false,
	},
	{
    city: "Dublin",
	country: "Ireland",
	image: "String",
	favoriteSite: "Guinness Factory",
	haveVisited: true,
	futureDestination: true,
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
  });


// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
// 	if (err){
// 		return console.log("Error:", err);
// 	}

// 	console.log("Created new campsite", campsite._id)
// 	process.exit(); // we're all done! Exit the program.
// 	})
