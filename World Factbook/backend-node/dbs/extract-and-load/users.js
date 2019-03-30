var fs =require('fs');
const userModel = require('../model/userModel.js');

async function postUserDetails() {
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


module.exports.postUserDetails = postUserDetails;