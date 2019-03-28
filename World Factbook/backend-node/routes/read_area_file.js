const AreaModel = require('../dbs/model/areaModel.js');

module.exports.getArea = async (req, res, next) => {
    let response = await AreaModel.find();
    if(response != null && response.length != 0) {
        res.json({"message": "success", "data": response})
    } 
    else res.json({"message": "error", "data": "Error reading country database"})
}