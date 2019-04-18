const csv = require('csv-parser'); 
const fs = require('fs');
const UNDataCountryModel = require('../model/UNDataCountryModel.js');

// async function getEducationExpenditure() {
//     console.log("You're in getEducationExpenditure");
//     let educationExpenditureMap = new Map();
//     //read education expenditure CSV File
//     fs.createReadStream('./dataset/education-expenditure.csv')
//     .pipe(csv())
//     .on('data', async (row)=>{
//         if(educationExpenditureMap.has(row.countryName)) {
//             let educationExpenditureArray = educationExpenditureMap.get(row.countryName);
//             educationExpenditureArray.push({'year': row.year, 'value': Number(row.value)});
//             educationExpenditureMap.set(row.countryName, educationExpenditureArray);
//         } else {
//             let educationExpenditureArray = [];
//             educationExpenditureArray.push({'year': row.year, 'value': Number(row.value)});
//             educationExpenditureMap.set(row.countryName, educationExpenditureArray);
//         }
//     })
//     .on('end', () => {
//         //console.log('CSV file successfully processed');
//         //console.log("Final Gross Demand Map:", educationExpenditureMap);

//         //store to mongodb
//         educationExpenditureMap.forEach( async (value, key) => {
//             try {
//                 let foundCountry = await UNDataCountryModel.findOne({
//                     countryName: key
//                 });

//                 /*  if we do not find a country already in db in uncountries collection 
//                     then add it to uncountries collection as new country
//                 */
//                 if(foundCountry == null || foundCountry == undefined) {
//                     let newCountry = new UNDataCountryModel({
//                         'countryName': key,
//                         'education_expenditure': value
//                     });
        
//                     try {
//                         let savedCountry = await newCountry.save();
//                     } catch(err) {
//                         console.log("Error in saving new country from education Expenditure map", err);
//                     }
//                 } else {
//                     try {
//                         foundCountry.education_expenditure = value;
//                         let savedCountry = await foundCountry.save();
//                     } catch(err) {
//                         console.log("Error in updating new country from education Expenditure map", err);
//                     }
                    
//                 }
//             } catch (err) {
//                 console.log("Error in processing educationExpenditureMap", err);
//             }
            

//         });
//     });
// }

//2.Education
getEducationExpenditure = async () => {
    await processEducationAndSaveToMongoDB('education-expenditure', 'education_expenditure');
}

processEducationAndSaveToMongoDB = async (filename, objectType) => {
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
        console.log("Printing the map", map);

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
    getEducationExpenditure: getEducationExpenditure
}