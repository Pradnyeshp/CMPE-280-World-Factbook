var fs =require('fs');

module.exports.getCountryDetails = async (req, res, next) => {
    console.log(req.params.country);
    let response;
    let cc = await getCountryCode(req.params.country);
    
    if(cc.message === "success") {
        response = await getCountrySpecificDetails(cc.data);
        requiredData = await getRequiredFormattedDateFromResponse(response);
        res.json(requiredData);
    } else {
        res.json(cc)
    }
    
}

getCountryCode = (countryname) => {
    let returnObject = {
        "message": "error",
        "data":"Could not find the country"
    }
    return new Promise((resolve, reject) => {
        fs.readFile('./dataset/fips_country_codes.txt', (err, buf) => {
            if(err) {
                returnObject.message = "error",
                returnObject.data = "File - fips_country_codes could not be opened"
                resolve(returnObject);
            }
            else {
                let array = buf.toString().split('\n');
                for(let i=0;i<array.length;i++) {
                    let tempArray = array[i].split('\t')
                    //
                    if(tempArray[1].toLowerCase() === countryname.toLowerCase()) {
                        // console.log('matched');
                        // console.log(tempArray[1]);
                        // console.log(tempArray);
                        returnObject.message = "success",
                        returnObject.data = tempArray[0].toLowerCase();
                        resolve(returnObject);
                    }
                }
                if(returnObject.message === "error") {
                    //console.log("Could not find the country");
                    resolve(returnObject);
                }
                    
            }
            
        });
    })
    

    
}

getCountrySpecificDetails = (country_code) => {
    //console.log("getCountrySpecificDetails: "+country_code);
    let country_file_name = country_code + ".json";
    return new Promise((resolve) =>{
        fs.readFile('./dataset/'+country_file_name, (err, buf) => {
            if(err)
                resolve({"message":"error", "data":"No country content found"})
            else {
                let bufferJson = JSON.parse(buf);
                resolve({"message":"success", "data":bufferJson})
            }
                
        })
    });
}

getRequiredFormattedDateFromResponse = (response) => {
    let finalObject = {}
    return new Promise((resolve)=>{
       
        let data = response.data;

        //Adding Country Introduction
        finalObject.introduction = data.Introduction.Background.text;
        
        //Adding Area charts
        let tempAreaArray = [];
        let tempString = data.Geography.Area.land.text.replace(/,/g,'');
        let landArea = parseInt(tempString);
        console.log(landArea);
        tempAreaArray.push({"type":"land", "area":landArea});
    
        tempString = data.Geography.Area.water.text.replace(/,/g,'');
        let waterArea = parseInt(tempString)
        tempAreaArray.push({"type":"water", "area":waterArea})
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