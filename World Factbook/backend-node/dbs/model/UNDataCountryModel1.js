const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UNDataCountrySchema1 = new Schema({
    unemployment_rate_world: [{year: String, value: Number}],
    growth_rate_world: [{year: String, value: Number}],
    countryName: String
});

module.exports = mongoose.model('UNData1Country', UNDataCountrySchema1);