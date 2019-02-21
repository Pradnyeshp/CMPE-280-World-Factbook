var fs = require('fs');

module.exports.getArea = (req, res, next) => {
    fs.readFile('./dataset/area.txt', function(err, buf) {
    let newArray = []
    if(err) {
        console.log(err);
        res.json({"message":"error", "data": null});
    }
    else {
        let array = buf.toString().split('\n');
        
        array.forEach((a)=>{
        //console.log(a,"+");
        let temp = a.replace( /\s\s+/g, '-');
        let tempArray = temp.split('-');
        //console.log(tempArray);
        if(tempArray.length > 1) {
            let obj = {
            "country": tempArray[1],
            "area": parseInt(tempArray[2].replace(/,/g,''))
            }
            newArray.push(obj);
        }
        });
        
    }
    res.json({"message": "success", "data": newArray});
    });
}