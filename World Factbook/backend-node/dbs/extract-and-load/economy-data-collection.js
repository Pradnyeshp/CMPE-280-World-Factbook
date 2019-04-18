const csv = require('csv-parser'); 
const fs = require('fs');
const UNDataCountryModel = require('../model/UNDataCountryModel.js');

//3.Economy
getGDP = async () => {
    await processEconomyAndSaveToMongoDB('GDP', 'gdp');
}

getPovertyHeadcountRatio = async () => {
    await processEconomyAndSaveToMongoDB('poverty-headcount-ratio', 'poverty_headcount_ratio');
}

getMilitaryExpenditure = async () => {
    await processEconomyAndSaveToMongoDB('military-expenditure', 'military_expenditure');
}

processEconomyAndSaveToMongoDB = async (filename, objectType) => {
    console.log("Processing filename: ", filename);
    console.log("Processing objectType: ", objectType);
    let map = new Map();

    fs.createReadStream(`./dataset/${filename}.csv`)
    .pipe(csv())
    .on('data', async (row) => {
        if(map.has(row.countryName)) {
            let array = map.get(row.countryName);
            array.push({'year': row.year, 'value': Number(row.value)});
            map.set(row.countryName, array);
        } else {
            let array = [];
            array.push({'year': row.year, 'value': Number(row.value)});
            map.set(row.countryName, array);
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
                    then add it to uncountries collection as new country
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
    });
}

module.exports = {
    getGDP: getGDP,
    getPovertyHeadcountRatio: getPovertyHeadcountRatio,
    getMilitaryExpenditure: getMilitaryExpenditure
}