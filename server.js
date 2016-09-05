// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/
var mongoose = require('mongoose');
var db = require('./models');
var Profile = require('./models/profile.js');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var new_profile = new Profile({
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

var places = [
  {
    city: "Rome",
  country: "Italy",
  image: "String",
  favoriteSite: "Pantheon",
  // haveVisited: true,
  // futureDestination: false,
  },
  {
    city: "Dublin",
  country: "Ireland",
  image: "String",
  favoriteSite: "Guinness Factory",
  // haveVisited: true,
  // futureDestination: true,
  }
 ];

 // new_profile.save(function(err, newProfile){
 //    if(err) {return console.log(err);}
 //    console.log("saved new profile: ", new_profile);
 //  });

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    documented_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! I'll go ahead and tell you a little bit about myself!",
    documentationUrl: "https://github.com/laurakathleen/express-personal-api", // CHANGE ME
    baseUrl: "https://safe-plains-86136.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "More about me"}, // CHANGE ME
      {method: "POST", path: "/api/places", description: "Check out the places I've visited"} // CHANGE ME
    ]
  })
}); 


/**********
 * SERVER *
 **********/

// app.get('/api/profile', function api_index(req, res) {
//   res.json({

//   })

//get profile (WORKING):
app.get('/api/profile', function(req, res){
  db.Profile.find({}, function(err, profile){
    if(err) { return console.log("index error: " + err);}
    // console.log(new_profile);
    res.json(new_profile);
  });
});


//get all places (WORKING):
app.get('/api/places', function(req, res){
  db.Place.find({}, function(err, place){
    if (err) { return console.log("index error: " + err);}
    // console.log(place);
    res.json(place);
  });
});

//get one place by id (WORKING):
app.get('/api/places/:id', function(req, res){
  var placeId = req.params.id;
  db.Place.findOne({_id: placeId }, function(err, data){
    res.json(data);
  });
});

//create new place using form and post it to /api/places (WORKING):
app.post('/api/places', function(req, res){
  var newPlace = new db.Place({
    city: req.body.city,
    country: req.body.country,
    image: req.body.image,
    favoriteSite: req.body.favoriteSite/*,*/
    // futureDestination: req.body.futureDestination
  });
  newPlace.save(function(err, place){
      if (err) {
        return console.log("save error: " + err);
      }
      // console.log("saved ", place.city);
      // send back the book!
      // place.push(newPlace);
      res.json(place);
    });
});

//upon clicking 'edit', update that place:
app.put('/api/places/:id', function (req, res){
  var id = parseInt(req.params.id);
  var city = req.body.city;
  var country = req.body.country;
  var updatePlace = {_id: id, city: city, country: country};
  for (var i=0; i<places.length; i++){
    if (places[i]._id == req.params.id){
      places.splice(i, 1, i, 1);
    }
  }
    //res.json(updatePlace);
    updatePlace.save(function(err, updatePlace){
      res.json(updatePlace);
   }); 
  });

//delete one place (WORKING):
app.delete('/api/places/:id', function(req, res){
  // console.log('place deleted');
  var placeId = req.params.id;
  db.Place.findOneAndRemove({ _id: placeId}, function(err, deletedPlace){
    res.json(deletedPlace);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
