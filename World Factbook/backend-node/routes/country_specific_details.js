var fs =require('fs');
const CountryModel = require('../dbs/model/country_model.js');

module.exports.getCountrySpecificDetails = async (req, res, next) => {
    const countryName = req.params.country.toLowerCase();
        
    const countryDetails = await CountryModel.findOne({countryName: countryName});

    console.log(countryDetails);
    if(countryDetails.length != 0)
        res.json({message: "success", data: countryDetails});
    else
        res.json({message: "error", data: "Could not find the country in the database"});
}
