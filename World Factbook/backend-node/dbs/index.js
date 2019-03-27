const mongoose = require('mongoose');
const connectionURL = "mongodb+srv://cmpe280:worldfactbook@cluster-world-fact-book-cftry.mongodb.net/world-factbook?retryWrites=true"
mongoose.connect(connectionURL, { poolSize: 5, useNewUrlParser: true});
const db = mongoose.connection;

exports.connection = db;