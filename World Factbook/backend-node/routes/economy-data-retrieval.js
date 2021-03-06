const csv = require('csv-parser');
const fs = require('fs');
let UNDataCountryModel = require('../dbs/model/UNDataCountryModel') ;
const UNCountryModel = require('../dbs/model/UNDataCountryModel1.js');

prepareEconomyGraph = async (req, res, next) => {

    const country = req.params.country.toLowerCase();
    console.log("In prepareEconomyGraph", country);

    let result = await UNCountryModel.findOne({ countryName: country });

    //Get the ggrowth rate world data
    let growthRateWorldData = result.growth_rate_world;

    let unemploymentRateWorldData = result.unemployment_rate_world;

    let map = new Map();
    let finalObject = [];
    growthRateWorldData.forEach((element) => {
        map.set(element.year, {'year': element.year, 'value': element.value});
    });

    unemploymentRateWorldData.forEach((element) => {
        if(map.has(element.year)) {
            let object = map.get(element.year);
            object['Unemployment'] = element.value;
            map.set(element.year, object);
        }
    });

    let i = 0;
    map.forEach((value, key)=>{
        if(i<9) {
            finalObject.push(value);
            i++;
        }
            
    });

    finalObject.sort((a, b)=>{
        return parseInt(a.year) - parseInt(b.year);
    });



    let start = 0;
    let end = 0;
    

   //Google charts data
    let dataSource = [];
    let header = ['Year', 'GDP Growth Rate','Unemployment Rate'];
    dataSource.push(header);
    i=0;
    finalObject.forEach((object)=>{
        let row = [];
        row.push(object.year);
        row.push(object.value);
        row.push(object.Unemployment);
        if(i === 0)
            start = object.year;
        if(i === finalObject.length-1)
            end = object.year;
        i++;
        dataSource.push(row);
    });  

    //console.log(start, end);
    // console.log('FinalObject generated and sent');

    res.json({'message': 'success', 'dataSource': dataSource, 'start': start, 'end': end});
};

prepareGDPGraphData = async (req,res) => {

    console.log("preparing GDP Graph data here") ;
    try {

        let countryDetails = await UNDataCountryModel.find() ;
        let response = [] ;
        let header = ['Country', 'GDP'] ;
        response.push(header) ;

        let allCountriesMap = new Map();

        fs.createReadStream(`./dataset/countries.csv`)
            .pipe(csv())
            .on('data', async (row) => {
                let country = row.country.split(",")[0].toString().toUpperCase();
                allCountriesMap.set(country, country) ;
            })
            .on('end', ()=>{
                    console.log(allCountriesMap) ;
                    countryDetails.forEach(function (row) {
                        // let gdp = row.gdp;
                        let countryName = row.countryName.toUpperCase() ;

                        if(row.gdp !== null){
                            let gdpArray = row.gdp ;
                            let temp = [] ;
                            gdpArray.forEach(function (row1) {
                                if(row1.year === "2017" && allCountriesMap.has(countryName)){
                                    temp.push(countryName);
                                    temp.push(row1.value) ;
                                    console.log("temp : ", temp);
                                    response.push(temp) ;
                                }
                            })
                        }
                    });

                    console.log("Response in GDP graph : ",response) ;

                    res.json({message : "success", data : response}) ;
                }
            );

    }
    catch (e) {
        console.log("error in gdp : ",e);
        res.json({message: "error", data: "Could not find the gdp data in the database"});
    }
};


module.exports = {
    prepareEconomyGraph: prepareEconomyGraph,
    prepareGDPGraphData: prepareGDPGraphData
};