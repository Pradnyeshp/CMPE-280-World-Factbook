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

// getUnemploymentRateWorld = async () => {
//     await processEconomyAndSaveToMongoDB('unemployment-rate-world', 'unemployment_rate_world');
// }

// getGrowthRateWorld = async () => {
//     await processEconomyAndSaveToMongoDB('growth-rate-world', 'growth_rate_world');
// }

processEconomyAndSaveToMongoDB = async (filename, objectType) => {
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
//     csv
//    .fromStream(stream, {headers : true})
//    .on("record", function(err, data){
//         ....
//    })
//    .on('error', function(error) {
//       console.log("Catch an invalid csv file!!!");
//       return res.fail('The csv file is invalid!');
//    });
};

module.exports = {
    getGDP: getGDP,
    getPovertyHeadcountRatio: getPovertyHeadcountRatio,
    getMilitaryExpenditure: getMilitaryExpenditure
    // getUnemploymentRateWorld: getUnemploymentRateWorld,
    // getGrowthRateWorld: getGrowthRateWorld
};