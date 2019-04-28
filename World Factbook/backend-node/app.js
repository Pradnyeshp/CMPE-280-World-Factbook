var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const db = require('./dbs/index.js');
const getCountryDetails = require('./dbs/extract-and-load/countries.js');
const loadCountryList = require('./dbs/extract-and-load/areas-of-all-countries.js');
const postUserDetails = require('./dbs/extract-and-load/areas-of-all-countries.js');
const energyData = require('./dbs/extract-and-load/energy-data-collection.js');
const educationData = require('./dbs/extract-and-load/education-data-collection.js');
const economyData = require('./dbs/extract-and-load/economy-data-collection.js');
const economyData1 = require('./dbs/extract-and-load/economy-gdp_unemp-data-collection');
const populationData = require('./dbs/extract-and-load/population-data-collection.js');



var cors = app.use(cors(
  {
    origin: 'http://localhost:3000'
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//MongoDB connection
db.connection.once('open', ()=>{
  console.log("Successfully connected to MongoDB");

  //extract and load the database
  //Please do not uncomment this next line as the database is already populated, it will insert
  //getCountryDetails.getCountryDetails();
  //loadCountryList.loadCountryList();

  //adding fips code to countries collection
  //getCountryDetails.addFIPSCountryCode();

  //postUserDetails.postUserDetails();

  // <--- Pradnyesh population data collection starts
  // populationData.getPopulationData();

  // populationData.getPopulationCount() ;
  // <--- Pradnyesh population data collection ends

  // <--- Abhishek education data collection starts
  //educationData.getEducationExpenditure();
  // <--- Abhishek education data collection ends

  // <--- Abhishek economy data collection starts
  //Collecting GDP data
  // economyData.getGDP();

  //Collecting Poverty Headcount Ratio data
  // economyData.getPovertyHeadcountRatio();

  //Collecting Military Expenditure data
  // economyData.getMilitaryExpenditure();

  //economyData1.getUnemploymentRateWorld();

  //economyData1.getGrowthRateWorld();

  //economyData1.getGDPPPP();
  //economyData1.getGNI();
  //economyData1.getMilitaryExpenditure();
  //economyData1.getMilitaryExpenditure();
  //economyData1.getEducationExpenditure();
  
  // <--- Abhishek economy data collection ends

  // <--- Venkatesh energy data collection starts
  //Collection for energy data

  //Collecting gross demand data
  //energyData.getEnergyGrossDemandData();


  //Collecting gross production data
  // energyData.getEnergyProductionData();

  //Collecting electricity consumption by agriculture
  // energyData.getEnergyConsumptionDataByAgriculture();

  //Collecting electricity consumption by transport
  // energyData.getEnergyConsumptionDataByTransport();

  //Collecting electricity consumption by manufacturing
  // energyData.getEnergyConsumptionDataByManufacturing();

  //Collecting electricity consumption by chemical use
  //energyData.getTotalEnergyConsumptionDataByChemical();

  //Collecting electricity consumption by commercial and public services
  //energyData.getTotalEnergyConsumptionDataByCommercialAndPublicServices();

  //Collecting electricity consumption by construction
  //energyData.getTotalEnergyConsumptionDataByConstruction();

  //Collecting electricity consumption by household
  //energyData.getTotalEnergyConsumptionDataByHousehold();

  //Collecting total energy consumption
  // energyData.getTotalEnergyConsumptionData();

  ////Venkatesh energy data collection ends --->

  //Nikhil Collecting youth literacy rate
  // educationData.getYouthLiteracyRate();
  // Nikhil youth literacy data end


  
});

db.connection.once('disconnected', ()=>{
  console.log("Successfully disconnected from MongoDB");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//comment the next two lines
app.listen(4040,
  console.log("Changed and connected on 4040"));

module.exports = app;
