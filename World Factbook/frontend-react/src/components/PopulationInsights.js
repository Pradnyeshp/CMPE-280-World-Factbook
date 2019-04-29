import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Chart } from "react-google-charts";
import url from '../url.js';
import '../css/populationGeograph.css' ;
import {Link} from "react-router-dom";
import CountryHeader from "./CountryHeader";

class PopulationInsights extends Component {

    constructor(props) {
        super(props);

        this.state = {
            growthArray : this.props.location.state.growthArray,
            country: (this.props.location.state.country === '') ? '' : this.props.location.state.country,
            populationArray : [],
            allCountryPopulationArray : [],
            birthArray : [],
            deathArray : [],
            migrationArray : [],
            countryPopulation : 0,
            topFiveArray : []
        };

    }

    abbreviateNumber(value) {
        var newValue = value;
        if (value >= 1000) {
            var suffixes = ["", "Thousand", "Million", "Billion","Trillion"];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 !== 0)
                shortValue = shortValue.toFixed(1);
            newValue = shortValue + " " + suffixes[suffixNum];
        }
        return newValue;
    }

    componentWillMount() {

        let countryPopulationURL = url+'/population/countries' ;
        axios.get(countryPopulationURL)
            .then(response => {
                // console.log(response.data) ;
                this.setState({
                    allCountryPopulationArray : response.data.data
                },() => {
                    let array = this.state.allCountryPopulationArray ;
                    let currentCountry = this.state.country ;

                    array.sort((a,b) => (b[1] - a[1])) ;
                    let tempMap = new Map();

                    let temp = [] ;
                    let header = ['Country', 'Population'] ;
                    temp.push(header);

                    for (let i = 0 ; i < 5 ; i++){
                        tempMap.set(array[i][0], array[i][1]);
                        temp.push(array[i]);
                    }

                    console.log(tempMap) ;

                    array.forEach(function (row) {
                        // console.log(row);
                        if(!tempMap.has(row[0])){
                            if (row[0] === currentCountry.toUpperCase()) {
                                temp.push(row);
                            }
                        }
                    });

                    // for (let i = 1 ; i < 6 ; i++){
                    //     let x = temp[i][1] ;
                    //     temp[i].push(x+'') ;
                    //     // temp.push(array[i]);
                    // }

                    this.setState({
                        topFiveArray : temp
                    });

                    console.log(temp);
                })
            });

        let populationCountURL = url+`/populationCount/${this.state.country}` ;
        axios.get(populationCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    this.setState({
                        populationArray : response.data.data
                    })
                }
            );

        let birthCountURL = url+`/birthcount/${this.state.country}` ;
        axios.get(birthCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    this.setState({
                        birthArray : response.data.data
                    })
                }
            );

        //change port to 3001
        let deathCountURL = url+`/deathcount/${this.state.country}` ;
        axios.get(deathCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    this.setState({
                        deathArray : response.data.data
                    })
                }
            );

        //change port to 3001
        let migrantCountURL = url+`/migrantcount/${this.state.country}` ;
        axios.get(migrantCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    this.setState({
                        migrationArray : response.data.data
                    })
                }
            );
    }

    render() {

        // console.log(this.state.populationCountArray) ;
        let countryPopulation = 0 ;
        let header = ['Country', 'Population'] ;
        let graphData = [] ;
        graphData.push(header) ;
        let populationMap = new Map() ;
        let currentCountry = this.state.country ;

        let allCountryPouplations = this.state.allCountryPopulationArray ;

        if(allCountryPouplations !== null){
            allCountryPouplations.forEach(function (row) {
                populationMap.set(row[0], row[1]) ;

                // console.log(row[0]);
                // let currentCountry = row[0] ;
                if(row[0] === currentCountry.toUpperCase()){
                    countryPopulation = row[1] ;
                }
                graphData.push(row) ;
            }) ;
        }

        let growthArray = this.state.growthArray ;
        let growthRate = 0 ;
        growthArray.forEach(function (row) {
            // console.log(row);
            if(row.yearRange === "2015")
                growthRate = row.value ;
        });

        // console.log(populationMap) ;

        let populationArray = this.state.populationArray ;
        populationArray.sort((a,b) => {
            let year1 = a.year ;
            let year2 = b.year ;

            return year1 - year2 ;
        });

        let rateGraphArray = [] ;
        let header1 = ['Year', 'birth count', 'death count', 'migration count'] ;

        rateGraphArray.push(header1) ;

        let birthArray = this.state.birthArray;

        birthArray.forEach(function (row) {
            row.yearRange = row.yearRange.split("-")[0] ;
        });

        birthArray = birthArray.filter(function (row) {
            return row.yearRange >= 1995 && row.yearRange <= 2020;
        });

        // console.log(birthArray) ;

        let deathArray = this.state.deathArray ;
        deathArray.forEach(function (row) {
            row.yearRange = row.yearRange.split("-")[0] ;
        });

        deathArray = deathArray.filter(function (row) {
            return row.yearRange >= 1995 && row.yearRange <= 2020 ;
        });

        let migrationArray = this.state.migrationArray ;
        migrationArray.forEach(function (row) {
           row.yearRange = row.yearRange.split("-")[0] ;
        });

        migrationArray.filter(function (row) {
           return row.yearRange >= 1995 && row.yearRange <= 2020 ;
        });

        // console.log(deathArray) ;
        birthArray.sort((a,b) => (a.yearRange - b.yearRange)) ;
        deathArray.sort((a,b) => (a.yearRange - b.yearRange)) ;
        migrationArray.sort((a,b) => (a.yearRange - b.yearRange)) ;

        // for(let i = 0 ; i < 6 ; i++ ){
        //     let temp = [] ;
        //     console.log(birthArray[i]) ;
        //     // temp.push(birthArray[i]["yearRange"]) ;
        //     // temp.push(birthArray[i].value) ;
        //     // temp.push(deathArray[i].value) ;
        //     rateGraphArray.push(temp) ;
        // } ;

        let map = new Map() ;

        birthArray.forEach(function (row) {
            if(map.has(row.yearRange)){
                let array = map.get(row.yearRange) ;
                map.set(row.yearRange, array.push(row.value)) ;
            }
            else{
                let array = [] ;
                array.push(row.value) ;
                map.set(row.yearRange, array) ;
            }
        });

        deathArray.forEach(function (row) {
            if(map.has(row.yearRange)){
                let array = map.get(row.yearRange) ;
                array.push(row.value) ;
                map.set(row.yearRange, array);
            }
        });

        migrationArray.forEach(function (row) {
            if(map.has(row.yearRange)){
                let array = map.get(row.yearRange) ;
                array.push(row.value) ;
                map.set(row.yearRange, array) ;
            }
        });

        // console.log(map) ;

        map.forEach(function (value, key, map) {
            let temp = [] ;
            temp.push(key);

            let values = map.get(key) ;
            let x = [...values] ;

            x.forEach(function (z) {
               temp.push(z);
            });

            rateGraphArray.push(temp);
        });

        // console.log(temp);

        // birthArray.forEach(function (row) {
        //     let temp = [] ;
        //     temp.push(row.yearRange);
        //     temp.push(row.value) ;
        //     rateGraphArray.push(temp) ;
        // });

        // for(let i = 1 ; i < 6 ; i++ ){
        //     let temp = rateGraphArray[i] ;
        //     deathArray.some(function (row) {
        //         // temp.push(row.)
        //     })
        //     // temp.push(birthArray[i].yearRange) ;
        //     // temp.push(birthArray[i].value) ;
        //     // temp.push(deathArray[i].value) ;
        //     // rateGraphArray.push(temp) ;
        // }


        console.log(this.state) ;

        // let populationCountArray = this.state.allCountryPopulationArray ;
        // let currentPopulation ;
        //
        // for(let i = 0 ; i < populationCountArray.length ; i++){
        //
        //     let row = populationCountArray[i] ;
        //     if(row.year === "2019"){
        //         currentPopulation = row.value ;
        //         break;
        //     }
        // }

        // console.log(currentPopulation);

        return(
            <div>
                <Navbar/>
                <div className="breadcrumbs" >
                    <nav aria-label="breadcrumb" >
                        <ol className="breadcrumb" style={{paddingLeft : '2%', marginBottom : '0'}}>
                            <Link to = {{pathname: '/'}}>
                                <li className="breadcrumb-item">
                                    HomePage
                                </li>
                            </Link>
                            &nbsp;
                            <li>>></li>
                            &nbsp;
                            <Link to = {{pathname: '/dashboard/'+this.state.country}}>
                                <li className="breadcrumb-item">Dashboard</li>
                            </Link>
                            &nbsp;
                            <li>>></li>
                            &nbsp;
                            <li className="breadcrumb-item active" aria-current="page">Population Insights</li>
                        </ol>
                    </nav>
                </div>
                <div className= "container-fluid" style={{ paddingLeft : '2%', paddingRight: '20px'}}>

                    <CountryHeader country = {this.state.country}/>

                    <div className="row populationGeograph">
                        <div className="col-7">
                            <div className = "geoGraph">
                                <div className="pigraphTitle">
                                    Population Density
                                </div>
                                <div className="pigraphSubtitle">
                                    Population density comparison of countries (2018 est.)
                                </div>
                            </div>
                            <div className='geoGraphStyle'>
                                <Chart
                                    // width={'1690px'}
                                    // height={'910px'}
                                    loader={<div>Loading Chart</div>}
                                    width = {'800px'}
                                    height = {'600px'}
                                    chartType="GeoChart"
                                    data={ graphData }
                                    options = {{
                                        // displayMode : 'text',
                                        colorAxis: { colors: ['#c8fefe', '#c80c00'] },
                                        // backgroundColor: '#81d4fa',
                                        markerOpacity : 1,
                                        markerColor : 'blue',
                                        legend : { numberFormat : '0',
                                            textStyle: {color: 'black', fontSize: 16}
                                        },
                                        tooltip : {
                                            textStyle: {color: 'black', fontSize: 18},
                                            trigger : 'focus'
                                        }
                                    }}

                                    legend = {{
                                        textStyle: {color: 'yellow', fontSize: 16},
                                    }}
                                    // Note: you will need to get a mapsApiKey for your project.
                                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                                    mapsApiKey="AIzaSyBgT9S1jtBpZ7HNyqTz86ay1uEeHVj0bMY"
                                    //rootProps={{ 'data-testid': '1' }}
                                />
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-4 populationBox">
                                    Population : {this.abbreviateNumber(countryPopulation*1000)}
                                </div>
                                <div className="col-5 populationBox">
                                    Population Growth Rate : {growthRate.toFixed(2)} %
                                </div>
                            </div>
                        </div>

                        <div className="col-5">
                            <div className="rateGraph">
                                <div className="pigraphTitle">
                                    Factors affecting population growth rate
                                </div>
                                <div className="pigraphSubtitle">
                                    Comparisons of factors like birth count, death count and migration count
                                </div>
                            </div>
                            <div className="geoGraphStyle">
                                <Chart
                                    // width={'1690px'}
                                    // height={'910px'}
                                    loader={<div>Loading Chart</div>}
                                    width = {'640px'}
                                    height = {'300px'}
                                    chartType="Bar"
                                    data={ rateGraphArray }
                                    options = {{
                                        // displayMode : 'text',
                                        colorAxis: { colors: ['#A7FEFE', '#e31b23'] },
                                        // backgroundColor: '#81d4fa',
                                        markerOpacity : 1,
                                        markerColor : 'blue',
                                        legend : { numberFormat : '0',
                                            textStyle: {color: 'black', fontSize: 16}
                                        },
                                        tooltip : {
                                            textStyle: {color: 'black', fontSize: 18},
                                            trigger : 'focus'
                                        }
                                    }}

                                    legend = {{
                                        textStyle: {color: 'yellow', fontSize: 16},
                                    }}
                                />
                            </div>
                            <br/>
                            <div className="topFiveTable">
                                <div className="pigraphTitle">
                                    Population of top populous countries
                                </div>
                                <div className="pigraphSubtitle">
                                    Based on most recent census data (population in thousands)
                                </div>
                                <div className="geoGraphStyle">
                                    <Chart
                                        // width={'1690px'}
                                        // height={'910px'}
                                        loader={<div>Loading Chart</div>}
                                        width = {'640px'}
                                        height = {'250px'}
                                        chartType="Bar"
                                        data={ this.state.topFiveArray }
                                        options = {{
                                            hAxis: {
                                                title: 'Total Population',
                                                minValue: 0,
                                            },
                                            vAxis: {
                                                title: 'City'
                                            },
                                            bars: 'horizontal',
                                        }}

                                        legend = {{
                                            textStyle: {color: 'yellow', fontSize: 16},
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row container-fluid">
                        <div className="col-11 extraInfoText">
                            <ul className="ulBulletPoints">
                                <li>
                                    In this page, we display more insightful graphs about population.
                                    First is Geo graph of the world, which displays the population density of each country.
                                    Annotation will be displayed when user moves mouse over a particular country in the map.
                                    Annotation information includes name of the country and it's population count as per the most recent information.
                                    Geo graph is also color coded as per the population of country.
                                    Countries with lower population count are shown in light blue shade, whereas countries with higher pouplations are shown in red shade.
                                    Below the geograph, population count and most recent population growth rate of country is shown.
                                </li>
                                <li>
                                    Second graph displays Factors affecting the population growth. It considers following measures:
                                    <ol className="olList">
                                        <li>
                                            Birth Count
                                        </li>
                                        <li>
                                            Death Count
                                        </li>
                                        <li>
                                            Migrants Count
                                        </li>
                                    </ol>
                                    Graph displays information over the years (from 1995-2020) with an interval of 5 years between them.
                                    It shows, the birth count, death count and migrants count using bar chart.
                                </li>
                                <li>
                                    Third graph displays information about five most populous countries in the world using horizontal bar chart.
                                    It also displays population of the current country, so as to gain insight about current countries stand against world's top 5.
                                </li>
                                <br/>
                                <li className="moreDetailsPopulationInsights">
                                    <div >
                                        <Link to={`/getcountry/${this.state.country}`}>
                                            More Details
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <br/>
                        <div className="col-5">
                        </div>
                        {/*Small Information boxes : */}
                    </div>
                </div>
            </div>
        )
    }

}

export default PopulationInsights;