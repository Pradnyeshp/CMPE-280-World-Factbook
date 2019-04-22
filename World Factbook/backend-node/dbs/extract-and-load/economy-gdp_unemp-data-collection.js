const csv = require('csv-parser'); 
const fs = require('fs');
const UNDataCountryModel1 = require('../model/UNDataCountryModel1.js');

getUnemploymentRateWorld = async () => {
    await processEconomyAndSaveToMongoDB('unemployment-rate-world', 'unemployment_rate_world');
}

getGrowthRateWorld = async () => {
    await processEconomyAndSaveToMongoDB('growth-rate-world', 'growth_rate_world');
}

processEconomyAndSaveToMongoDB = async (filename, objectType) => {
    console.log("Processing filename: ", filename);
    console.log("Processing objectType: ", objectType);
    let map = new Map();
//     csv
//    .fromStream(stream, {headers : true})
//    .on("record", function(err, data){
//         if(map.has(data.countryName))
//    })
//    .on('error', function(error) {
//       console.log("Catch an invalid csv file!!!");
//       return res.fail('The csv file is invalid!');
//    });
    fs.createReadStream(`./dataset/${filename}.csv`)
    .pipe(csv())
    .on('data', async (row) => {
        //console.log("row countryname--*****---: ", row);
        if(map.has(row.countryName)) {
            //console.log("row countryname--*****---: ", row.countryName);
            let array = map.get(row.countryName);   
            //console.log("Array*****: ", array);
            array.push({'year': row.year, 'value': Number(row.value)});
            //console.log("Array-----: ", array);
            map.set(row.countryName, array);
            //console.log("Map--*****---: ", map);
            
        } else {
            //console.log("Here***: ");
            let array = [];
            array.push({'year': row.year, 'value': Number(row.value)});
            //console.log("Array1***: ", array);
            map.set(row.countryName, array);
            //console.log("Map1--*****---: ", map);
        }
    })
    .on('end', ()=>{
        //console.log("Printing the map", map);

        map.forEach( async (value, key) => {
            try {
                let foundCountry = await UNDataCountryModel1.findOne({
                    countryName: key.toLowerCase()
                });
                //console.log("foundcountrykey------ ", key);
                //console.log("foundcountry------ ", foundCountry);
                if(foundCountry != null || foundCountry != undefined) {
                    console.log('Country found', foundCountry);
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
};

module.exports = {
    getUnemploymentRateWorld: getUnemploymentRateWorld,
    getGrowthRateWorld: getGrowthRateWorld
};