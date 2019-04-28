var express = require('express');
var router = express.Router();
var read_area_file = require('./read_area_file');
var countrydetails = require('./country_specific_details');
var countrypopulationdetails = require('./country_population_details') ;
var userdetails = require('./user_details');
const energyData = require('./energy-data-retrieval');
const oldCountriesData = require('./old-countries-data-retrieval');
const economyData = require('./economy-data-retrieval');
const economyInsightsData = require('./economy-insights-dataret');
const economyInsightsData1 = require('./economy-insights-dataret1');
const youthLiteracyData = require('./youth-literacy-data-retrieval');

// const economyMultiLineData = require('./economy-multiline-chart');

/* GET area response page. */
router.get('/area', read_area_file.getArea);

router.get('/getcountry/:country', countrydetails.getCountrySpecificDetails);

router.get('/getcountry-for-dashboard/:country', countrydetails.getCountrySpecificDetailsForDashboard);

router.get('/fips-code/getcountry/:country', countrydetails.getFipsCode);

router.post('/postuser', userdetails.postUser);

router.get('/getuser', userdetails.getUser);

router.post('/updateUser', userdetails.updateUser);

router.post('/deleteUser', userdetails.deleteUser);

router.get('/population/countries', countrypopulationdetails.getAllCountryPopulationDetails);

router.get('/population/:country', countrypopulationdetails.getCountryPopulationDetails);

router.get('/energy-data/:country/', energyData.prepareEnergyGraph);

router.get('/age-structure-data/:country/', oldCountriesData.prepareAgeStructureGraph);

router.get('/birthcount/:country', countrypopulationdetails.getCountryBirthCount);

router.get('/deathcount/:country', countrypopulationdetails.getCountryDeathCount);

router.get('/migrantcount/:country', countrypopulationdetails.getCountryMigrantCount);

router.get('/populationCount/:country', countrypopulationdetails.getCountryPopulationCount) ;

router.get('/economy-data/:country/', economyData.prepareEconomyGraph);

router.get('/economy/getGDPofAllCountries', economyData.prepareGDPGraphData);

router.get('/economy-insights-data/:country/', economyInsightsData.prepareEconomyInsightsGraph);

router.get('/economy-insights-data1/:country/', economyInsightsData1.prepareEconomyInsightsGraph1);

router.get('/youth-literacy-rate/:country',youthLiteracyData.prepareYouthLiteracyChart);
//router.get('/economy-data-multiline/:country/', economyMultiLineData.prepareEconomyMultiLineGraph);

router.get('/energy-data/consumption/:country/:start/:end', energyData.prepareCountrySpecificEnergyConsumptionGraph);

module.exports = router;
