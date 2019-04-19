const csv = require('csv-parser'); 
const fs = require('fs');
const UNDataCountryModel = require('../model/UNDataCountryModel.js');

async function getEnergyGrossDemandData() {
    console.log("Hello in getEnergyData");
    let map = new Map();
    //read gross demand CSV File
    fs.createReadStream('./dataset/gross-demand.csv')
    .pipe(csv())
    .on('data', async (row)=>{
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
    .on('end', () => {
        //console.log('CSV file successfully processed');
        //console.log("Final Gross Demand Map:", grossDemandMap);

        //store to mongodb
        map.forEach( async (value, key) => {
            let newCountry = new UNDataCountryModel({
                'countryName': key,
                'energy_gross_demand': value
            });

            try {
                let savedCountry = await newCountry.save();
            } catch(err) {
                console.log(err);
            }
        });
    });
}


getEnergyProductionData = async () => {
    console.log("In getEnergyProductionData method");
    let map = new Map();

    fs.createReadStream('./dataset/totalelectricity-gross-production.csv')
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
        //console.log("Final Energy Gross Production Map:", energyProductionMap);

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
                    let newCountry = new UNDataCountryModel({
                        'countryName': key,
                        'energy_production': value
                    });
        
                    try {
                        let savedCountry = await newCountry.save();
                    } catch(err) {
                        console.log("Error in saving new country from energy production map", err);
                    }
                } else {
                    try {
                        foundCountry.energy_production = value;
                        let savedCountry = await foundCountry.save();
                    } catch(err) {
                        console.log("Error in updating new country from energy production map", err);
                    }
                    
                }
            } catch (err) {
                console.log("Error in processing energyProductionMap", err);
            }
            

        });
    });
}

getEnergyConsumptionDataByAgriculture = async () => {
    await processEnergyAndSaveToMongoDB('totalelectricity-consumption-by-agriculture', 'energy_consumption_agriculture');
}

getEnergyConsumptionDataByTransport = async () => {
    await processEnergyAndSaveToMongoDB('totalelectricity-consumption-by-transport', 'energy_consumption_transport');
}

getEnergyConsumptionDataByManufacturing = async () => {
    await processEnergyAndSaveToMongoDB('totalelectricity-consumption-by-manufacturing', 'energy_consumption_manufacturing');
}

getTotalEnergyConsumptionData = async () => {
    await processEnergyAndSaveToMongoDB('totalelectricity-consumption', 'energy_total_consumption');
}

processEnergyAndSaveToMongoDB = async (filename, objectType) => {
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
};

module.exports = {
    getEnergyGrossDemandData: getEnergyGrossDemandData,
    getEnergyProductionData: getEnergyProductionData,
    getEnergyConsumptionDataByAgriculture: getEnergyConsumptionDataByAgriculture,
    getEnergyConsumptionDataByTransport: getEnergyConsumptionDataByTransport,
    getEnergyConsumptionDataByManufacturing: getEnergyConsumptionDataByManufacturing,
    getTotalEnergyConsumptionData: getTotalEnergyConsumptionData
};