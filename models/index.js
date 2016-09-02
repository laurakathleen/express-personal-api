var mongoose = require("mongoose");
mongoose.createConnection( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Profile = require("./profile.js");
module.exports.Place = require("./places.js");
