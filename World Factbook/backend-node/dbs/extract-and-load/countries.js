var fs =require('fs');
const CountryModel = require('../model/country_model.js');

async function getCountryDetails() {
    //commented for safety as entire data is loaded now
    // try {
    //     let response = await getFileBuffer();
    //     let array = response.toString().split('\n');
    //     //console.log(array);
    //     for(let i=0;i<array.length;i++) {
    //         let tempArray = array[i].split('\t');
    //         if(tempArray != null && tempArray.length != 0) {
    //             try {
    //                 let countryDetails = await getCountrySpecificDetails(tempArray[0]);
    //                 //console.log("Country Details: ", countryDetails);
    //                 if(countryDetails.message === "success") {
    //                     try {
    //                         let requiredData = await getRequiredFormattedDateFromResponse(countryDetails, tempArray[1]);
    //                         console.log(requiredData.data);
    //                         let country = new CountryModel(requiredData.data);
    //                         country = await country.save();
    //                         //let data = requiredData.data;
    //                         //search for the country and add the relevant extra fields
    //                         //let country = await CountryModel.findOne({countryName: data.countryName});
    //                         // if(country != null || country != undefined) {
    //                         //     country.employment_details = data.employment_details;
    //                         //     country.land_boundary_in_km = data.land_boundary_in_km;
    //                         //     country.border_countries = data.border_countries;
    //                         //     country.natural_resources = data.natural_resources;
    //                         //     country.nationality = data.nationality;
    //                         //     country.language_spoken = data.language_spoken;
    //                         //     country.religions = data.religions;
    //                         //     country.population_growth_rate = data.population_growth_rate;
    //                         //     country.birth_rate = data.birth_rate;
    //                         //     country.death_rate = data.death_rate;
    //                         //     country.net_migration_rate = data.net_migration_rate;
    //                         //     country.infant_mortality_rate = data.infant_mortality_rate;
    //                         //     country.literacy_rate = data.literacy_rate;
    //                         //     country.unemployment_rate = data.unemployment_rate;
    //                         //     country.gdp_composition_by_sector = data.gdp_composition_by_sector;
    //                         //     country.population_below_poverty_line = data.population_below_poverty_line;
    //                         //     country.exports = data.exports;
    //                         //     country.imports = data.imports;
    //                         //     country.energy_production_latest_not_trend = data.energy_production_latest_not_trend;
    //                         //     country.energy_consumption_latest_not_trend = data.energy_consumption_latest_not_trend;
    //                         //     country.energy_imports_latest_not_trend = data.energy_imports_latest_not_trend;
    //                         //     country.energy_exports_latest_not_trend = data.energy_exports_latest_not_trend;

    //                         //     //let savedCountry = await country.save();

    //                         // }
    //                     } catch(err) {
    //                         //console.log("Issue in getRequiredFormattedDateFromResponse", err);
    //                     }
    //                 }
    //             } catch(err) {
    //                 //console.log("Issue in getCountrySpecificDetails", err);
    //             }
    //         }
    //     }
    // } catch(err) {
    //     //console.log("Error in reading the country code file");
    // }
    
}

addFIPSCountryCode = async () => {
    let buffer = await getFileBuffer();
    let array = buffer.toString().split('\n');
    let count = 0;
    array.forEach( async (element) => {
        let tempArray = element.split('\t');
        let fipsCode = tempArray[0];
        let countryName = tempArray[1].toString().toLowerCase();
        // console.log(fipsCode, countryName);
        // let foundCountry = await CountryModel.findOne({
        //     countryName: countryName
        // });
        // if(foundCountry !== null) {
        //     foundCountry.fips_country_code = fipsCode;
        //     foundCountry.save();
        // }
        
    });
}



async function getFileBuffer() {
    return new Promise((resolve, reject)=>{
        fs.readFile('./dataset/fips_country_codes.txt', (err, buff) => {
            if(err) {
                console.log("Returning the error");
                reject(err);
            } else {
                console.log("Returning the buffer");
                resolve(buff);
            }
        })
    });
}
 

async function getCountrySpecificDetails(country_code) {
    //console.log("getCountrySpecificDetails: "+country_code);
    let country_file_name = country_code + ".json";
    return new Promise((resolve, reject) =>{
        fs.readFile('./dataset/'+country_file_name, (err, buf) => {
            if(err)
                reject({"message":"error", "data":"No country content found"})
            else {
                let bufferJson = JSON.parse(buf);
                resolve({"message":"success", "data":bufferJson})
            }
                
        })
    });
}

function getRequiredFormattedDateFromResponse(response, countryName) {
    let finalObject = {}
    return new Promise((resolve)=>{
       
        let data = response.data;

        //Adding Country Introduction
        try{
            finalObject.introduction = data.Introduction.Background.text;
        } catch(err) {
            console.log('No data for introduction');
        }
        

        //Adding country name
        try {
            finalObject.countryName = countryName.toString().toLowerCase();
        }catch(err) {
            console.log('No data for countryName');
        }
        
        
        //Adding Area charts
        let tempAreaArray = [];
        try {
            let tempString = data.Geography.Area.land.text.replace(/,/g,'');
            let landArea = parseInt(tempString);
            if(isNaN(landArea))
                throw Error("Not a number");
            //console.log(landArea);
            tempAreaArray.push({"areaType":"land", "area":landArea});
            tempString = data.Geography.Area.water.text.replace(/,/g,'');
            let waterArea = parseInt(tempString);
            if(isNaN(waterArea))
                throw Error("Not a number");
            tempAreaArray.push({"areaType":"water", "area":waterArea});
            finalObject.area = tempAreaArray;
        } catch(err) {
            finalObject.area = [];
            console.log('No data for land or water area');
        }


        //Adding Climate
        try {
            tempString = data.Geography.Climate.text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.climate = tempString;
        } catch(err) {
            finalObject.climate = '';
            console.log('No data for climate');
        }
        

        //Adding Population
        try {
            tempString = data["People and Society"]["Population"].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.population = tempString;
        }catch(err) {
            finalObject.population = '';
            console.log('No data for population');
        }
        

        //Adding Age Structure
        let tempAgeStructureArray = [];
        try {
            tempString = parseInt(data["People and Society"]["Age structure"]["0-14 years"].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            tempAgeStructureArray.push({"range": "0-14", "percentage":tempString})

            tempString = parseInt(data["People and Society"]["Age structure"]["15-24 years"].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            tempAgeStructureArray.push({"range": "15-24", "percentage":tempString})

            tempString = parseInt(data["People and Society"]["Age structure"]["25-54 years"].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            tempAgeStructureArray.push({"range": "25-54", "percentage":tempString})


            tempString = parseInt(data["People and Society"]["Age structure"]["55-64 years"].text.split('%')[0])
            if(isNaN(tempString))
                throw Error("Not a number");
            tempAgeStructureArray.push({"range": "55-64", "percentage":tempString})


            tempString = parseInt(data["People and Society"]["Age structure"]["65 years and over"].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            tempAgeStructureArray.push({"range": "65+", "percentage":tempString})
            finalObject.age_structure = tempAgeStructureArray;
        } catch(err) {
            finalObject.age_structure = [];
            console.log('No data for age structure');
        }
        
        //pushing labour employment details
        let employmentDetailsArray = [];
        try {
            tempString = parseInt(data['Economy']['Labor force - by occupation']['agriculture'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            employmentDetailsArray.push({'sector': 'Agriculture', 'percentage':tempString});
    
            tempString = parseInt(data['Economy']['Labor force - by occupation']['industry'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            employmentDetailsArray.push({'sector': 'Industry', 'percentage':tempString});
    
            tempString = parseInt(data['Economy']['Labor force - by occupation']['services'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            employmentDetailsArray.push({'sector':'Services', 'percentage':tempString});
            finalObject.employment_details = employmentDetailsArray;
        } catch(err) {
            finalObject.employment_details = [];
            console.log('No data for employment_details');
        }
        

        //pushing land boundaries
        try {
            tempString = data['Geography']['Land boundaries']['total'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.land_boundary_in_km = tempString;
        } catch(err) {
            finalObject.land_boundary_in_km = '';
            console.log('No data for land_boundary_in_km');
        }
        

        //border countries
        try {
            tempString = data['Geography']['Land boundaries']['border countries'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.border_countries = tempString;
        } catch(err) {
            finalObject.border_countries = '';
            console.log('No data for border_countries');
        }
        

        //natural resources
        try {
            tempString = data['Geography']['Natural resources'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.natural_resources = tempString;
        } catch(err) {
            finalObject.natural_resources = '';
            console.log('No data for natural_resources');
        }
        

        //nationality
        try {
            tempString = data['People and Society']['Nationality']['adjective'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.nationality = tempString;
        }  catch(err) {
            finalObject.nationality = '';
            console.log('No data for nationality');
        }
        

        //languages
        try {
            tempString = data['People and Society']['Languages'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.language_spoken = tempString;
        } catch(err) {
            finalObject.language_spoken = '';
            console.log('No data for language_spoken');
        }
        

        //religions
        try {
            tempString = data['People and Society']['Religions'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.religions = tempString;
        } catch(err) {
            finalObject.religions = '';
            console.log('No data for religions');
        }
        

        //population growth rate
        try {
            tempString = data['People and Society']['Population growth rate'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.population_growth_rate = tempString;
        } catch(err) {
            finalObject.population_growth_rate = '';
            console.log('No data for population_growth_rate');
        }
        

        //population birth rate
        try {
            tempString = data['People and Society']['Birth rate'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.birth_rate = tempString;
        } catch(err) {
            finalObject.birth_rate = '';
            console.log('No data for birth_rate');
        }
        
        

        //population death rate
        try {
            tempString = data['People and Society']['Death rate'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.death_rate = tempString;
        } catch(err) {
            finalObject.death_rate = '';
            console.log('No data for death_rate');
        }
        

        //net migration rate
        try {
            tempString = data['People and Society']['Net migration rate'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.net_migration_rate = tempString;
        } catch(err) {
            finalObject.net_migration_rate = '';
            console.log('No data for net_migration_rate');
        }
        

        //Infant mortality rate
        let infantMortalityRateData = [];
        try {
            tempString = parseInt(data['People and Society']['Infant mortality rate']['male'].text.split(' ')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            infantMortalityRateData.push({'sex':'male', 'per_1000_birth_lives': tempString});
    
            tempString = parseInt(data['People and Society']['Infant mortality rate']['female'].text.split(' ')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            infantMortalityRateData.push({'sex': 'female', 'per_1000_birth_lives': tempString});
            finalObject.infant_mortality_rate = infantMortalityRateData;
        } catch(err) {
            finalObject.infant_mortality_rate = [];
            console.log('No data for infant_mortality_rate');
        }
        

        //Expenditures
        let expendituresData = [];
        try {
            tempString = parseInt(data['People and Society']['Health expenditures'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            expendituresData.push({'sector': 'Health','percentage': tempString});
    
            tempString = parseInt(data['People and Society']['Education expenditures'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            expendituresData.push({'sector': 'Education','percentage': tempString});
    
            tempString = parseInt(data['Military and Security']['Military expenditures'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            expendituresData.push({'sector': 'Military','percentage': tempString});
            finalObject.expenditures_data = expendituresData;
        } catch(err) {
            finalObject.expenditures_data = [];
            console.log('No data for expenditures_data');
        }
        

        //Literacy
        let literacyData = [];
        try {
            tempString = parseInt(data['People and Society']['Literacy']['male'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            literacyData.push({'sex': 'male', 'percentage': tempString});
            tempString = parseInt(data['People and Society']['Literacy']['female'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            literacyData.push({'sex': 'female', 'percentage': tempString});
            finalObject.literacy_rate = literacyData;
        } catch(err) {
            finalObject.literacy_rate = [];
            console.log('No data for literacy_rate');
        }
        

        

        //Unemployment
        let unemploymentData = [];
        try {
            tempString = parseInt(data['People and Society']['Unemployment, youth ages 15-24']['male'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            unemploymentData.push({'sex':'male', 'percentage':tempString});
    
            tempString = parseInt(data['People and Society']['Unemployment, youth ages 15-24']['female'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            unemploymentData.push({'sex':'female', 'percentage':tempString});
            finalObject.unemployment_rate = unemploymentData;    
        } catch(err) {
            finalObject.unemployment_rate = [];
            console.log('No data for unemployment_rate');
        }
        
        //GDP composition by sector
        let gdpCompositionData = [];
        try {
            tempString = parseInt(data['Economy']['GDP - composition, by sector of origin']['agriculture'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            gdpCompositionData.push({'sector': 'Agriculture', 'percentage': tempString});
    
            tempString = parseInt(data['Economy']['GDP - composition, by sector of origin']['industry'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            gdpCompositionData.push({'sector':'Industry', 'percentage':tempString});
    
            tempString = parseInt(data['Economy']['GDP - composition, by sector of origin']['services'].text.split('%')[0]);
            if(isNaN(tempString))
                throw Error("Not a number");
            gdpCompositionData.push({'sector':'Services', 'percentage':tempString});
            finalObject.gdp_composition_by_sector = gdpCompositionData;    
        } catch(err) {
            finalObject.gdp_composition_by_sector = [];
            console.log('No data for gdp_composition_by_sector');
        }
        
        //Population below poverty line
        try {
            tempString = data['Economy']['Population below poverty line'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.population_below_poverty_line = tempString;
        } catch(err) {
            finalObject.population_below_poverty_line = '';
            console.log('No data for population_below_poverty_line');
        }
        

        //Exports
        try {
            tempString = data['Economy']['Exports'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.exports = tempString;
        } catch(err) {
            finalObject.exports = '';
            console.log('No data for exports');
        }
        

        //imports
        try {
            tempString = data['Economy']['Imports'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.imports = tempString;
        } catch(err) {
            finalObject.imports = '';
            console.log('No data for imports');
        }
        

        //energy production
        try {
            tempString = data['Energy']['Electricity - production'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.energy_production_latest_not_trend = tempString;
        } catch(err) {
            finalObject.energy_production_latest_not_trend = '';
            console.log('No data for energy_production_latest_not_trend');
        }
        

        //energy consumption
        try {
            tempString = data['Energy']['Electricity - consumption'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.energy_consumption_latest_not_trend = tempString;
        } catch(err) {
            finalObject.energy_consumption_latest_not_trend = '';
            console.log('No data for energy_consumption_latest_not_trend');
        }
        

        //energy imports
        try {
            tempString = data['Energy']['Electricity - imports'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.energy_imports_latest_not_trend = tempString;    
        } catch(err) {
            finalObject.energy_imports_latest_not_trend = '';
            console.log('No data for energy_imports_latest_not_trend');
        }
        

        //energy exports
        try {
            tempString = data['Energy']['Electricity - exports'].text.toString();
            if(tempString.toLowerCase().includes('na'))
                throw Error('Not a valid data string');
            finalObject.energy_exports_latest_not_trend = tempString;
        } catch(err) {
            finalObject.energy_exports_latest_not_trend = '';
            console.log('No data for energy_exports_latest_not_trend');
        }
        
        //console.log("Final Object",finalObject);



        resolve({"message":"success", "data":finalObject});
    })
    

}


module.exports = {
    getCountryDetails: getCountryDetails,
    addFIPSCountryCode: addFIPSCountryCode
}