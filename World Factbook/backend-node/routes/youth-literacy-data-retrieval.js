const UNCountryModel = require('../dbs/model/UNDataCountryModel.js');

prepareYouthLiteracyChart = async (req, res, next) => {

    const country = req.params.country.toLowerCase();
    console.log("In Youth literacy graph", country);

    let result = await UNCountryModel.findOne({ countryName: country });


    //Get the gross demand data
    let youthLiteracyData = result.youth_literacy_rate;
    
    let finalObject = [];
    youthLiteracyData.forEach(element => {
        if(element.year == '2015' && (element.sex == 'Male' || element.sex == 'Female'))
        {
            finalObject.push({'sex':element.sex,'value':element.value});
        }
    });
    
    console.log(finalObject);
    //res.send("this is complete");

       //Google charts data
       let data = [];
       let header = ['Youth literacy', 'Percentage'];
       data.push(header);

       finalObject.forEach((object) =>{
        let row = []
        row.push(object.sex)
        row.push(object.value)
        data.push(row);
       });


       res.json({'message': 'success', 'data': data});
}

module.exports = {
    prepareYouthLiteracyChart: prepareYouthLiteracyChart
}