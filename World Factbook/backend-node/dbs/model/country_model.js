const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    countryName: String,
    fips_country_code: String,
    introduction: String,
    area: [{ areaType: String, area: Number}],
    climate: String,
    population: String,
    age_structure: [{range: String, percentage: Number}],
    employment_details: [{sector: String, percentage: Number}],
    land_boundary_in_km: String,
    border_countries: String,
    natural_resources: String,
    nationality: String,
    language_spoken: String,
    religions: String,
    population_growth_rate: String,
    birth_rate: String,
    death_rate: String,
    net_migration_rate: String,
    infant_mortality_rate: [{sex: String, 'per_1000_birth_lives': Number}],
    literacy_rate: [{sex: String, percentage: Number}],
    unemployment_rate: [{sex: String, percentage: Number}],
    gdp_composition_by_sector: [{sector: String, percentage: Number}],
    population_below_poverty_line: String,
    exports: String,
    imports: String,
    energy_production_latest_not_trend: String,
    energy_consumption_latest_not_trend: String,
    energy_imports_latest_not_trend: String,
    energy_exports_latest_not_trend: String,
    expenditures_data: [{sector: String, percentage: Number}]
});

module.exports = mongoose.model('Country', CountrySchema);
