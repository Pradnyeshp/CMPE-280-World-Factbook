const csv = require('csv-parser');
const fs = require('fs');
const UNDataCountryModel = require('../model/UNDataCountryModel.js');

getPopulationData = async () => {
    await processPopulationAndSaveToMongoDB('population-prospect', 'population_prospect');
};

getPopulationCount = async () => {
    await processPopulationCountAndSaveToMongoDB('population-count', 'population_count');
};

getBirthCount = async () => {
    await processPopulationAndSaveToMongoDB('number-of-births','population_birth_count');
};

getDeathCount = async () => {
    await processPopulationAndSaveToMongoDB('number-of-deaths','population_death_count');
};

getMigrantsCount = async () => {
    await processPopulationAndSaveToMongoDB('number-of-migrants','population_migrant_count');
};

processPopulationAndSaveToMongoDB = async (filename, objectType) => {
    console.log("Processing filename: ", filename);
    console.log("Processing objectType: ", objectType);
    let map = new Map();

    fs.createReadStream(`./dataset/${filename}.csv`)
        .pipe(csv())
        .on('data', async (row) => {
            if(map.has(row.countryName.toString().toLowerCase())) {
                let array = map.get(row.countryName.toString().toLowerCase());
                array.push({'yearRange': row.year, 'value': Number(row.value)});
                map.set(row.countryName.toString().toLowerCase(), array);
            } else {
                let array = [];
                array.push({'yearRange': row.year, 'value': Number(row.value)});
                map.set(row.countryName.toString().toLowerCase(), array);
            }
        })
        .on('end', ()=>{
            //console.log("Printing the map", map);

            //store to mongodb
            map.forEach( async (value, key) => {
                try {
                    let foundCountry = await UNDataCountryModel.findOne({
                        countryName: key
                    });

                    /*  if we do not find a country already in db in uncountries collection
                        then add it to countries collection as new country
                    */
                    if(foundCountry == null || foundCountry == undefined) {
                        try {
                            let newCountry = new UNDataCountryModel({
                                'countryName': key,
                                objectType: value
                            });
                            let savedCountry = await newCountry.save();
                        } catch(err) {
                            console.log("Error in saving new country from map", err);
                        }
                    } else {
                        try {
                            foundCountry[objectType] = value;
                            let savedCountry = await foundCountry.save();
                        } catch(err) {
                            console.log("Error in updating new country from map", err);
                        }
                    }
                } catch (err) {
                    console.log("Error in processing map", err);
                }
            });
        }
    );
};

processPopulationCountAndSaveToMongoDB = async (filename, objectType) => {
    console.log("Processing filename: ", filename);
    console.log("Processing objectType: ", objectType);
    let map = new Map();

    fs.createReadStream(`./dataset/${filename}.csv`)
        .pipe(csv())
        .on('data', async (row) => {
            if(map.has(row.countryName.toString().toLowerCase())) {
                let array = map.get(row.countryName.toString().toLowerCase());
                array.push({'year': row.year, 'value': Number(row.value)});
                map.set(row.countryName.toString().toLowerCase(), array);
            } else {
                let array = [];
                array.push({'year': row.year, 'value': Number(row.value)});
                map.set(row.countryName.toString().toLowerCase(), array);
            }
        })
        .on('end', ()=>{
                //console.log("Printing the map", map);

                //store to mongodb
                map.forEach( async (value, key) => {
                    try {
                        let foundCountry = await UNDataCountryModel.findOne({
                            countryName: key
                        });

                        /*  if we do not find a country already in db in uncountries collection
                            then add it to countries collection as new country
                        */
                        if(foundCountry == null || foundCountry == undefined) {
                            try {
                                let newCountry = new UNDataCountryModel({
                                    'countryName': key,
                                    objectType: value
                                });
                                let savedCountry = await newCountry.save();
                            } catch(err) {
                                console.log("Error in saving new country from map", err);
                            }
                        } else {
                            try {
                                foundCountry[objectType] = value;
                                let savedCountry = await foundCountry.save();
                            } catch(err) {
                                console.log("Error in updating new country from map", err);
                            }
                        }
                    } catch (err) {
                        console.log("Error in processing map", err);
                    }
                });
            }
        );
};


module.exports = {
    getPopulationData : getPopulationData,
    getPopulationCount : getPopulationCount,
    getBirthCount : getBirthCount,
    getDeathCount : getDeathCount,
    getMigrantsCount : getMigrantsCount
};