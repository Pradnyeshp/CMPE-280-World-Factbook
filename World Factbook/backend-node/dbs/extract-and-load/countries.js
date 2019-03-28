var fs =require('fs');
const CountryModel = require('../model/country_model.js');

async function getCountryDetails() {
    try {
        let response = await getFileBuffer();
        let array = response.toString().split('\n');
        console.log(array);
        for(let i=0;i<array.length;i++) {
            let tempArray = array[i].split('\t');
            if(tempArray != null && tempArray.length != 0) {
                try {
                    let countryDetails = await getCountrySpecificDetails(tempArray[0]);
                    console.log("Country Details: ", countryDetails);
                    if(countryDetails.message === "success") {
                        try {
                            let requiredData = await getRequiredFormattedDateFromResponse(countryDetails, tempArray[1]);
                            let country = new CountryModel(requiredData.data);
                            country = await country.save();
                        } catch(err) {
                            console.log("Issue in getRequiredFormattedDateFromResponse");
                        }
                    }
                } catch(err) {
                    console.log("Issue in getCountrySpecificDetails", err);
                }
            }
        }
    } catch(err) {
        console.log("Error in reading the country code file");
    }
    
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
        finalObject.introduction = data.Introduction.Background.text;

        //Adding country name
        finalObject.countryName = countryName.toString().toLowerCase();
        
        //Adding Area charts
        let tempAreaArray = [];
        let tempString = data.Geography.Area.land.text.replace(/,/g,'');
        let landArea = parseInt(tempString);
        console.log(landArea);
        tempAreaArray.push({"areaType":"land", "area":landArea});
    
        tempString = data.Geography.Area.water.text.replace(/,/g,'');
        let waterArea = parseInt(tempString)
        tempAreaArray.push({"areaType":"water", "area":waterArea})
        finalObject.area = tempAreaArray;


        //Adding Climate
        tempString = data.Geography.Climate.text;
        finalObject.climate = tempString;

        //Adding Population
        tempString = data["People and Society"]["Population"].text;
        finalObject.population = tempString;

        //Adding Age Structure
        let tempAgeStructureArray = [];
        tempString = parseInt(data["People and Society"]["Age structure"]["0-14 years"].text.split('%')[0]);
        tempAgeStructureArray.push({"range": "0-14", "percentage":tempString})

        tempString = parseInt(data["People and Society"]["Age structure"]["15-24 years"].text.split('%')[0]);
        tempAgeStructureArray.push({"range": "15-24", "percentage":tempString})

        tempString = parseInt(data["People and Society"]["Age structure"]["25-54 years"].text.split('%')[0]);
        tempAgeStructureArray.push({"range": "25-54", "percentage":tempString})


        tempString = parseInt(data["People and Society"]["Age structure"]["55-64 years"].text.split('%')[0])
        tempAgeStructureArray.push({"range": "55-64", "percentage":tempString})


        tempString = parseInt(data["People and Society"]["Age structure"]["65 years and over"].text.split('%')[0]);
        tempAgeStructureArray.push({"range": "65+", "percentage":tempString})
        finalObject.age_structure = tempAgeStructureArray;

        console.log("Final Object",finalObject);



        resolve({"message":"success", "data":finalObject});
    })
    

}


module.exports.getCountryDetails = getCountryDetails;