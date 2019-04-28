const CountryModel = require('../dbs/model/country_model.js');

prepareAgeStructureGraph = async (req, res, next) => {
    console.log('Preparing the age structure graph');
    let countryName = req.params.country.toString().toLowerCase();
    let country = await CountryModel.findOne({'countryName': countryName});
    let finalArray = [];
    if(country) {
        let header = ['Age Range', 'Percentage'];
        finalArray.push(header);
        console.log('Country: ', country);
        country.age_structure.forEach(element => {
            let array = [];
            array.push(element.range);
            array.push(element.percentage);
            finalArray.push(array);
        });
    }
    //console.log(finalArray);
    
    res.json({'message': 'success', 'data': finalArray});
}

module.exports = {
    prepareAgeStructureGraph: prepareAgeStructureGraph
}