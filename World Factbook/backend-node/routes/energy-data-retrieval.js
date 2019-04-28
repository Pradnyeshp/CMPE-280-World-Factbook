const UNCountryModel = require('../dbs/model/UNDataCountryModel.js');

prepareEnergyGraph = async (req, res, next) => {
    const country = req.params.country.toLowerCase();
    console.log("In prepareEnergyGraph", country);

    let result = await UNCountryModel.findOne({ countryName: country });

    if(result === null || result === undefined)
        res.json({message: 'error', data: 'No country found'});

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


    //console.log(start, end);
    console.log('FinalObject generated and sent');
    res.json({'message': 'success', 'dataSource': dataSource, 'start': start, 'end': end});
}

sortAndreturnFirstFiveElements = (array) => {
    let end = (array.length > 6 ) ? 6 : array.length;
    let temp = array.slice(0,end);
    // temp.sort((a,b) => {
    //     return parseInt(a.year) - parseInt(b.year);
    // })
    return temp;
}

getMap = (object, start, end) => {
    return new Promise((resolve) => {
        let finalObject = {};
        let map = new Map();
        object.agriculture.forEach((element)=>{
            let header = ['sector', 'kilo-watt-hour/million units'];
            let finalArray = [];
            finalArray.push(header);
            let array = ['Agriculture', element.value];
            finalArray.push(array);
            map.set(element.year, finalArray);
        })
    
        //console.log('My Map after inserting agriculture data' , map);
    
        object.manufacturing.forEach((element) => {
            try {
                let array = map.get(element.year);
                array.push(['Manufacturing', element.value]);
            } catch(error) {
                //console.log('Year not found');
            }
            
        });
    
        object.transport.forEach((element) => {
            try {
                let array = map.get(element.year);
                array.push(['Transport', element.value]);
            } catch(error) {
                //console.log('Year not found');
            }
            
        });
    
        object.chemical.forEach((element) => {
            try {
                let array = map.get(element.year);
                array.push(['Chemical', element.value]);
            } catch(error) {
                //console.log('Year not found');
            }
            
        });
        
        object.public_services.forEach((element) => {
            try {
                let array = map.get(element.year);
                array.push(['Public Services', element.value]);
            } catch(error) {
                //console.log('Year not found');
            }
            
        });
    
        object.construction.forEach((element) => {
            try {
                let array = map.get(element.year);
                array.push(['Construction', element.value]);
            } catch(error) {
                //console.log('Year not found');
            }
            
        });
    
        object.household.forEach((element) => {
            try {
                let array = map.get(element.year);
                array.push(['Household', element.value]);
            } catch(error) {
                //console.log('Year not found');
            }
            
        });

        map.forEach((value, key) => {
            if(parseInt(key) >= start && parseInt(key) <= end)
                finalObject[key] = value;
        });
    
        //console.log('My Map after inserting data' , map);
        resolve(finalObject) ;
    });
}

prepareCountrySpecificEnergyConsumptionGraph = async (req, res, next) => {
    console.log('In prepareCountrySpecificEnergyConsumptionGraph', req.params.country);
    let country = req.params.country;
    let start = req.params.start;
    let end = req.params.end;
    let foundCountry = await UNCountryModel.findOne({
        countryName: country
    });

    if(foundCountry !== null) {

        let finalObject = {};
        try {
            let agriculture = foundCountry.energy_consumption_agriculture;
            if(agriculture.length > 0) {
                finalObject.agriculture = sortAndreturnFirstFiveElements(agriculture);
            } else if(agriculture.length == 0) {
                finalObject.agriculture = [];    
            }
        } catch(err) {
            //console.log('No energy_consumption_agriculture object found in searched country');
            finalObject.agriculture = [];
        }

        try {
            let manufacturing = foundCountry.energy_consumption_manufacturing;
            if(manufacturing.length > 0) {
                finalObject.manufacturing = sortAndreturnFirstFiveElements(manufacturing);
            } else if(manufacturing.length == 0) {
                finalObject.manufacturing = [];    
            }
        } catch(err) {
            //console.log('No energy_consumption_manufacturing object found in searched country');
            finalObject.manufacturing = [];
        }

        try {
            let transport = foundCountry.energy_consumption_transport;
            if(transport.length > 0) {
                finalObject.transport = sortAndreturnFirstFiveElements(transport);
            } else if(transport.length == 0) {
                finalObject.transport = [];    
            }
        } catch(err) {
            //console.log('No energy_consumption_transport object found in searched country');
            finalObject.transport = [];
        }

        try {
            let chemical = foundCountry.energy_consumption_chemical_petrochemical;
            if(chemical.length > 0) {
                finalObject.chemical = sortAndreturnFirstFiveElements(chemical);
            } else if(chemical.length == 0) {
                finalObject.chemical = [];    
            }
        } catch(err) {
            //console.log('No energy_consumption_chemical_petrochemical object found in searched country');
            finalObject.chemical = [];
        }

        try {
            let public_services = foundCountry.energy_consumption_commercial_and_public_services;
            if(public_services.length > 0) {
                finalObject.public_services = sortAndreturnFirstFiveElements(public_services);
            } else if(public_services.length == 0) {
                finalObject.public_services = [];    
            }
        } catch(err) {
            //console.log('No energy_consumption_chemical_petrochemical object found in searched country');
            finalObject.public_services = [];
        }

        try {
            let construction = foundCountry.energy_consumption_construction;
            if(construction.length > 0) {
                finalObject.construction = sortAndreturnFirstFiveElements(construction);
            } else if(construction.length == 0) {
                finalObject.construction = [];    
            }
            
        } catch(err) {
            //console.log('No energy_consumption_construction object found in searched country');
            finalObject.construction = [];
        }

        try {
            let household = foundCountry.energy_consumption_household;
            if(household.length > 0) {
                finalObject.household = sortAndreturnFirstFiveElements(household);
            } else if(household.length == 0) {
                finalObject.household = [];    
            }
        } catch(err) {
            //console.log('No energy_consumption_household object found in searched country');
            finalObject.household = [];
        }
        let result = await getMap(finalObject, start, end);
        //console.log("After generating the result",result);
        res.status(200).send({'message': 'success', 'data': result});

    } else {
        res.status(500).json({'message':'error', 'data': 'Country Not Found'});
    }
}

module.exports = {
    prepareEnergyGraph: prepareEnergyGraph,
    prepareCountrySpecificEnergyConsumptionGraph: prepareCountrySpecificEnergyConsumptionGraph
}