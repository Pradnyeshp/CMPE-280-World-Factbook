const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    countryName: String,
    area: Number
});

module.exports = mongoose.model('Area', AreaSchema);