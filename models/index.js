var mongoose = require("mongoose");
mongoose.createConnection( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Profiile = require("./profile.js");
