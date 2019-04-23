var fs =require('fs');
const CountryModel = require('../dbs/model/country_model.js');
const UNDataCountryModel = require('../dbs/model/UNDataCountryModel.js');

module.exports.getCountrySpecificDetails = async (req, res, next) => {
    const countryName = req.params.country.toLowerCase();
        
    const countryDetails = await CountryModel.findOne({countryName: countryName});

    console.log(countryDetails);
    if(countryDetails !== null)
        res.json({message: "success", data: countryDetails});
    else
        res.json({message: "error", data: "Could not find the country in the database"});
}

module.exports.getCountrySpecificDetailsForDashboard = async (req, res, next) => {
    const countryName = req.params.country.toLowerCase();
        
    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});

    console.log(countryDetails);
    if(countryDetails !== null)
        res.json({message: "success", data: countryDetails});
    else
        res.json({message: "error", data: "Could not find the country in the database"});
}