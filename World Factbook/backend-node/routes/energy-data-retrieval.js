const UNCountryModel = require('../dbs/model/UNDataCountryModel.js');

prepareEnergyGraph = async (req, res, next) => {
    const country = req.params.country.toLowerCase();
    console.log("In prepareEnergyGraph", country);

    let result = await UNCountryModel.findOne({ countryName: country });

    //Get the gross demand data
    let energyGrossDemandData = result.energy_gross_demand;

    //Get the production data
    let energyProductionData = result.energy_production;

    //Get consumption data
    let energyConsumptionData = result.energy_total_consumption;

    let map = new Map();
    let finalObject = [];
    energyGrossDemandData.forEach((element) => {
        map.set(element.year, {'year': element.year, 'demand': element.value});
    });

    energyProductionData.forEach((element) => {
        if(map.has(element.year)) {
            let object = map.get(element.year);
            object['production'] = element.value;
            map.set(element.year, object);
        }
    });

    energyConsumptionData.forEach((element) => {
        if(map.has(element.year)) {
            let object = map.get(element.year);
            object['consumption'] = element.value;
            map.set(element.year, object);
        }
    });

    let i = 0;
    map.forEach((value, key)=>{
        if(i<6) {
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
    let header = ['Year', 'Demand', 'Production', 'Consumption'];
    dataSource.push(header);
    i=0;
    finalObject.forEach((object)=>{
        let row = [];
        row.push(object.year);
        row.push(object.demand);
        row.push(object.production);
        row.push(object.consumption);
        if(i==0)
            start = object.year;
        if(i == finalObject.length-1)
            end = object.year;
        i++;
        dataSource.push(row);
    });  


    console.log(start, end);
    console.log('FinalObject generated and sent');
    res.json({'message': 'success', 'dataSource': dataSource, 'start': start, 'end': end});
}

module.exports = {
    prepareEnergyGraph: prepareEnergyGraph
}