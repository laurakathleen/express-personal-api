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
mongoose.connect('mongodb://localhost/express-personal-api');
var db = require('./models');
//var Profile = require('./models/profile.js');

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
      {method: "POST", path: "/api/past-places", description: "Check out the places I've visited"} // CHANGE ME
    ]
  })
}); 


/**********
 * SERVER *
 **********/

// app.get('/api/profile', function api_index(req, res) {
//   res.json({

//   })
//define a root route: localhost:3000/
app.get('/', function(req, res){
  res.sendFile('views/index.html', { root: __dirname});
});


app.get('/api/pets', function(req, res){
  db.Profile.find().populate('pets')
  .exec(function(err, pets){
    if(err) { return console.log("index error: " + err); }
    res.json(pets);
  });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
