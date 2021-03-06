const UNCountryModel = require('../dbs/model/UNDataCountryModel1.js');

prepareEconomyInsightsGraph1 = async (req, res, next) => {

    const country = req.params.country.toLowerCase();
    console.log("In prepareEconomyInsightsGraph", country);

    let result = await UNCountryModel.findOne({ countryName: country });

    //Get the ggrowth rate world data
    // let growthRateWorldData = result.growth_rate_world;
    let gdpppp = result.gdp_ppp;
    let gni = result.gni;
    // let militaryExpenditureData = result.military_expenditure;
    // let educationExpenditureData = result.education_expenditure;

    // let unemploymentRateWorldData = result.unemployment_rate_world;

    let map = new Map();
    let finalObject = [];
    gdpppp.forEach((element) => {
        map.set(element.year, {'year': element.year, 'GDP': element.value});
    });

    gni.forEach((element) => {
        if(map.has(element.year)) {
            let object = map.get(element.year);
            object['GNI'] = element.value;
            map.set(element.year, object);
        }
    });

    // militaryExpenditureData.forEach((element) => {
    //     if(map.has(element.year)) {
    //         let object = map.get(element.year);
    //         object['MilitaryExpenditure'] = element.value;
    //         map.set(element.year, object);
    //     }
    // });

    // educationExpenditureData.forEach((element) => {
    //     if(map.has(element.year)) {
    //         let object = map.get(element.year);
    //         object['EducationExpenditure'] = element.value;
    //         map.set(element.year, object);
    //     }
    // });

    let i = 0;
    map.forEach((value, key)=>{
        if(i<10) {
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
    let header = ['Year', 'GDP(PPP)','GNI'];
    dataSource.push(header);
    i=0;
    finalObject.forEach((object)=>{
        let row = [];
        row.push(object.year);
        row.push(object.GDP);
        row.push(object.GNI);
        // row.push(object.MilitaryExpenditure);
        // row.push(object.EducationExpenditure);
        if(i==0)
            start = object.year;
        if(i == finalObject.length-1)
            end = object.year;
        i++;
        dataSource.push(row);
        console.log(dataSource);
    });  


    //console.log(start, end);
    console.log('FinalObject generated and sent');
    res.json({'message': 'success', 'dataSource': dataSource, 'start': start, 'end': end});
}

module.exports = {
    prepareEconomyInsightsGraph1: prepareEconomyInsightsGraph1
}