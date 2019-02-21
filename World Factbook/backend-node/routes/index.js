var express = require('express');
var router = express.Router();
var read_area_file = require('./read_area_file');
var countrydetails = require('./country_specific_details');

/* GET area response page. */
router.get('/area', read_area_file.getArea);

router.get('/getcountry/:country', countrydetails.getCountryDetails);

module.exports = router;
