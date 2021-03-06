const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UNDataCountrySchema = new Schema({
    countryName: String,
    population_prospect : [{yearRange: String, value: Number}],
    population_birth_count : [{yearRange: String, value: Number}],
    population_death_count : [{yearRange: String, value: Number}],
    population_migrant_count : [{yearRange: String, value: Number}],
    population_count : [{year : String , value : Number}],
    energy_gross_demand: [{year: String, value: Number}],
    energy_consumption_agriculture: [{year: String, value: Number}],
    energy_consumption_transport: [{year: String, value: Number}],
    energy_consumption_manufacturing: [{year: String, value: Number}],
    energy_production: [{year: String, value: Number}],
    energy_total_consumption: [{year: String, value: Number}],
    education_expenditure: [{year: String, value: Number}],
    military_expenditure: [{year: String, value: Number}],
    poverty_headcount_ratio: [{year: String, value: Number}],
    //unemployment_rate_world: [{year: String, value: Number}],
    //growth_rate_world: [{year: String, value: Number}],
    youth_literacy_rate: [{year: String, sex: String, value: Number}],
    gdp: [{year: String, value: Number}],
    energy_consumption_chemical_petrochemical: [{year: String, value: Number}],
    energy_consumption_commercial_and_public_services: [{year: String, value: Number}],
    energy_consumption_construction: [{year: String, value: Number}],
    energy_consumption_household: [{year: String, value: Number}]
});

module.exports = mongoose.model('UNDataCountry', UNDataCountrySchema);