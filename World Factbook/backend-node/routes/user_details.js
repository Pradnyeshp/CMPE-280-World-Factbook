const UserModel = require('../dbs/model/userModel.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');



module.exports.postUser = async (req, res, next) => {
    console.log(req.body);
    // if (req.body._id == '')
        insertRecord(req, res);
        // else
        // updateRecord(req, res);
}



module.exports.getUser = async (req, res, next) => {
    email=req.query.emailId
    let response = await UserModel.find({emailId:email});
    if(response != null && response.length != 0) {
        console.log("Backend data",response);
        res.json({"message": "success", "data": response})
    } 
    else res.json({"message": "error", "data": "Error reading country database"})
}

function insertRecord(req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.emailId = req.body.emailId;
    user.number = req.body.number;
    user.save((err, doc) => {
        console.log(doc)
        if (!err){
            console.log("Registered Successfully");
            // swal("Registered Successfully",'','success')
            // .then((response)=>{
            //     window.location.href = 'http://localhost:3000/Homepage';
            // });
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("http://localhost:3000/Homepage", {
                    viewTitle: "Insert User",
                    user : req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


module.exports.updateUser = async (req, res, next) => {
    
    let response = await UserModel.findOneAndUpdate({emailId:req.body.email},{$set:{firstName:req.body.fname,lastName:req.body.lname,number:req.body.phone}},{new:true});
    if(response != null && response.length != 0) {
        console.log("Backend data",response);
        res.json({"message": "success", "data": response})
    } 
    else res.json({"message": "error", "data": "Error reading country database"})
}

module.exports.deleteUser = async (req, res, next) => {
    
    let response = await UserModel.deleteOne({emailId:req.body.email});
    console.log(req.query.email);
    if(response != null && response.length != 0) {
        console.log("Backend data",response);
        res.json({"message": "success", "data": response})
    } 
    else res.json({"message": "error", "data": "Error reading country database"})
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}