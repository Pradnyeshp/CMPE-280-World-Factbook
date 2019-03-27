const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    countryName: String,
    introduction: String,
    area: [{ areaType: String, area: Number}],
    climate: String,
    population: String,
    age_structure: [{range: String, percentage: Number}]
});

module.exports = mongoose.model('Country', CountrySchema);
