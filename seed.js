// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_profile = ({
	name: "Laura Russell",
	githubLink: "https://github.com/laurakathleen",
	githubProfileImage: String,
	personalSiteLink: "https://laurakathleen.github.io/#home-tab",
	currentCity: "Burlingame",
	pets: [{
		type: "dog",
		name: "Meechum",
		breed: "Australian Shepherd",
		age: 1.5,
		image: "public/images/Meechum.JPG"
	}]
});

db.Profile.remove({}, function (err, profiles) {
  console.log('removed all profiles');
  db.Profile.create(new_profile, function (err, profile){
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Created new profile", profile._id);
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
