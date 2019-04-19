var fs = require('fs');
const UNDataCountryModel = require('../dbs/model/UNDataCountryModel');

module.exports.getCountryPopulationDetails = async (req, res, next) => {

    const countryName = req.params.country.toLowerCase();
    console.log('countryName : ', countryName) ;

    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});

    // console.log(countryDetails);
    let countryPopulationDeatils = countryDetails.population_prospect ;
    console.log(countryPopulationDeatils) ;

    if(countryPopulationDeatils.length !== 0)
        res.json({message: "success", data: countryPopulationDeatils});
    else
        res.json({message: "error", data: "Could not find the country in the database"});

};
