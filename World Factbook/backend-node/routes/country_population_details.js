const csv = require('csv-parser');
const fs = require('fs');
const UNDataCountryModel = require('../dbs/model/UNDataCountryModel');
const areaModel = require('../dbs/model/areaModel') ;


module.exports.getCountryPopulationDetails = async (req, res, next) => {

    const countryName = req.params.country.toLowerCase();
    console.log('countryName : ', countryName) ;

    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});
    if(countryDetails != null) {
        let countryPopulationDeatils = countryDetails.population_prospect ;
        // console.log(countryPopulationDeatils) ;

        if(countryPopulationDeatils.length !== 0)
            res.json({message: "success", data: countryPopulationDeatils});
    }
    else
        res.json({message: "error", data: "Could not find the country in the database"});

};

module.exports.getAllCountryPopulationDetails = async (req, res, next) => {

    // const countryName = req.params.country.toLowerCase();
    // console.log('countryName : ', countryName) ;

    try {
        const countryDetails = await UNDataCountryModel.find() ;
        const countryAreas = await areaModel.find() ;
        // console.log(countryAreas);

        let map = new Map() ;

        countryAreas.forEach(function (row) {
           map.set(row.countryName.toLowerCase(), row.area)
        });

        console.log(map);

        let response = [] ;

        let allCountriesMap = new Map();

        fs.createReadStream(`./dataset/countries.csv`)
            .pipe(csv())
            .on('data', async (row) => {
                let country = row.country.split(",")[0].toString().toUpperCase();
                allCountriesMap.set(country, country) ;
                // console.log(country);
                // if(allCountriesMap.has(row.country.toString().toLowerCase())) {
                //     let array = map.get(row.countryName.toString().toLowerCase());
                //     array.push({'year': row.year, 'value': Number(row.value)});
                //     map.set(row.countryName.toString().toLowerCase(), array);
                // } else {
                //     let array = [];
                //     array.push({'year': row.year, 'value': Number(row.value)});
                //     map.set(row.countryName.toString().toLowerCase(), array);
                // }
            })
            .on('end', ()=>{
                // console.log(allCountriesMap);
                console.log("end of file") ;

                countryDetails.forEach(function (row) {
                    let countryName = row.countryName.toUpperCase() ;
                    console.log("Inside countryDetails : ", countryName);
                    // console.log();

                    if(countryName.toLowerCase() !== 'world'){
                        if(row.population_count !== null){
                            let populationArray = row.population_count ;
                            populationArray.sort((a,b) => (a.year - b.year)) ;

                            populationArray.forEach(function (row) {
                                let temp2 = [] ;

                                if(parseInt(row.year) === 2018 && allCountriesMap.has(countryName)){
                                    temp2.push(countryName) ;
                                    temp2.push(row.value) ;
                                    // if(map.has(countryName.toLowerCase()))
                                    //     temp2.push(map.get(countryName.toLowerCase())) ;
                                    response.push(temp2) ;
                                }
                            })
                        }
                    }
                }) ;

                console.log("Response in all countries population : ",response) ;

                res.json({message : "success", data : response}) ;

                }
            );

        console.log("all Countries map : ", allCountriesMap);

        //
        // let allcountryPopulationDeatils = countryDetails.population_count ;
        // // console.log(countryPopulationDeatils) ;
        //
        // if(allcountryPopulationDeatils.length !== 0)
        //     res.json({message: "success", data: allcountryPopulationDeatils});

    }
    catch (e) {
        res.json({message: "error", data: "Could not find the country in the database"});
    }

};

module.exports.getCountryPopulationCount = async (req, res, next) => {

    const countryName = req.params.country.toLowerCase();
    console.log('countryName : ', countryName) ;

    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});

    let countryPopulationCount = countryDetails.population_count ;
    console.log(countryPopulationCount) ;

    if(countryPopulationCount !== null)
        res.json({message : "success", data : countryPopulationCount}) ;
    else
        res.json({message: "error", data: "Could not find the country population count"});

};

module.exports.getCountryBirthCount = async (req,res,next) => {

    const countryName = req.params.country.toLowerCase();
    console.log('countryName : ', countryName) ;

    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});

    let countryBirthCount = countryDetails.population_birth_count ;
    // console.log(countryBirthCount) ;

    if(countryBirthCount !== null)
        res.json({message : "success", data : countryBirthCount}) ;
    else
        res.json({message: "error", data: "Could not find the country population count"});

};

module.exports.getCountryDeathCount = async (req,res,next) => {

    const countryName = req.params.country.toLowerCase();
    console.log('countryName : ', countryName) ;

    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});

    let countryDeathCount = countryDetails.population_death_count ;
    // console.log(countryDeathCount) ;

    if(countryDeathCount !== null)
        res.json({message : "success", data : countryDeathCount}) ;
    else
        res.json({message: "error", data: "Could not find the country population count"});

};

module.exports.getCountryMigrantCount = async (req,res,next) => {

    const countryName = req.params.country.toLowerCase();
    console.log('countryName : ', countryName) ;

    const countryDetails = await UNDataCountryModel.findOne({countryName: countryName});

    let countryMigrantCount = countryDetails.population_migrant_count ;
    // console.log(countryMigrantCount) ;

    if(countryMigrantCount !== null)
        res.json({message : "success", data : countryMigrantCount}) ;
    else
        res.json({message: "error", data: "Could not find the country population count"});

};
