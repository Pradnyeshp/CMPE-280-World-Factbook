const fs = require('fs');
const AreaModel = require('../model/areaModel.js');

async function loadCountryList() {
    console.log("In loadCountryList: ");
    try {
        let buf = await getBuffer();
        let array = buf.toString().split('\n');
        let finalArray = await getFormattedArray(array);
        console.log("Final Array: ", finalArray);
        finalArray.forEach((element) => {
            let area = new AreaModel(element);
            try {
                area.save((err)=>{
                    if(err) console.log("Ignoring the incorrect fomatted country");
                });
            } catch(err) {
                console.log("Error in format");
            }
        });
    } catch(err) {
        console.log("Some error occured");
    }
    

}

async function getBuffer() {
    console.log("In getBuffer: ");
    return new Promise((resolve, reject) => {
        fs.readFile('./dataset/area.txt', function(err, buf) {
            if(err) {
                console.log(err);
                reject(err);
            }
            else {
                
                console.log(buf);
                resolve(buf);
            }
        });
    });
    
}

async function getFormattedArray(array) {
    console.log("In getFormattedArray: ");
    let newArray = [];
    array.forEach((a)=>{
        //console.log(a,"+");
        let temp = a.replace( /\s\s+/g, '-');
        let tempArray = temp.split('-');
        //console.log(tempArray);
        if(tempArray.length > 1) {
            let obj = {
            "countryName": tempArray[1],
            "area": parseInt(tempArray[2].replace(/,/g,''))
            }
            newArray.push(obj);
        }
    });
    return newArray;
}

module.exports.loadCountryList = loadCountryList;