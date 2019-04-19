var express = require('express');
var router = express.Router();
var read_area_file = require('./read_area_file');
var countrydetails = require('./country_specific_details');
var countrypopulationdetails = require('./country_population_details') ;
var userdetails = require('./user_details');

/* GET area response page. */
router.get('/area', read_area_file.getArea);

router.get('/getcountry/:country', countrydetails.getCountrySpecificDetails);

router.post('/postuser', userdetails.postUser);

router.get('/getuser', userdetails.getUser);

router.post('/updateUser', userdetails.updateUser);

router.post('/deleteUser', userdetails.deleteUser);

router.get('/population/:country', countrypopulationdetails.getCountryPopulationDetails);

module.exports = router;
