const UNCountryModel = require('../dbs/model/UNDataCountryModel.js');

prepareEconomyMultiLineGraph = async (req, res, next) => {
    //const country = req.params.country.toLowerCase();
    //console.log("In prepareEconomyGraph", country);

    //let result = await UNCountryModel.findOne({ countryName: country });
    let alldata = await UNCountryModel.find({});
    let allcountrydata = alldata.countryName;
    let populationCountData = allcountrydata.population_count;
    
    // console.log("*************************",allcountrydata);
    // console.log("******************************************",alldata);
    // console.log("************************************",populationCountData);

    //Get the gross demand data
//     let gdpData = result.gdp;

     let map = new Map();
     let finalObject = [];
    populationCountData.forEach((element) => {
        map.set(element.year, {'year': element.year, 'value': element.value});
    });

//     let i = 0;
//     map.forEach((value, key)=>{
//         if(i<9) {
//             finalObject.push(value);
//             i++;
//         }
            
//     });

//     finalObject.sort((a, b)=>{
//         return parseInt(a.year) - parseInt(b.year);
//     });



//     let start = 0;
//     let end = 0;
    

//    //Google charts data
//     let dataSource = [];
//     let header = ['Year', 'Value'];
//     dataSource.push(header);
//     i=0;
//     finalObject.forEach((object)=>{
//         let row = [];
//         row.push(object.year);
//         row.push(object.value);
//         if(i==0)
//             start = object.year;
//         if(i == finalObject.length-1)
//             end = object.year;
//         i++;
//         dataSource.push(row);
//     });  


//     console.log(start, end);
//     console.log('FinalObject generated and sent');
//     res.json({'message': 'success', 'dataSource': dataSource, 'start': start, 'end': end});
}

module.exports = {
    prepareEconomyMultiLineGraph: prepareEconomyMultiLineGraph
}