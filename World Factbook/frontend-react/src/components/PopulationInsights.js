import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Chart } from "react-google-charts";
import url from '../url.js';
import '../css/populationGeograph.css' ;

class PopulationInsights extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country : "united states of america" ,
            populationArray : [],
            allCountryPopulationArray : [],
            birthArray : [],
            deathArray : [],
            migrationArray : [],
            countryPopulation : 0,
            topFiveArray : []
        };

    }

    componentWillMount() {

        let countryPopulationURL = url+'/population/countries' ;
        axios.get(countryPopulationURL)
            .then(response=> {
                // console.log(response.data) ;
                this.setState({
                    allCountryPopulationArray : response.data.data
                },() => {
                    let array = this.state.allCountryPopulationArray ;
                    array.sort((a,b) => (b[1] - a[1])) ;

                    let temp = [] ;
                    let header = ['Country', 'Population', { role: 'annotation' }] ;
                    temp.push(header);


                    for (let i = 0 ; i < 5 ; i++){
                        temp.push(array[i]);
                    }

                    for (let i = 1 ; i < 6 ; i++){
                        let x = temp[i][1] ;
                        temp[i].push(x+'') ;
                        // temp.push(array[i]);
                    }

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

        // console.log(populationMap) ;

        let populationArray = this.state.populationArray ;
        populationArray.sort((a,b) => {
            let year1 = a.year ;
            let year2 = b.year ;

            return year1 - year2 ;
        });

        let rateGraphArray = [] ;
        let header1 = ['Year', 'birthcount', 'death count', 'migration count'] ;

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
            temp.push(values[0]);
            temp.push(values[1]);
            temp.push(values[2]);

            rateGraphArray.push(temp);
        });

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
                <div className= "container-fluid">

                    <div className="populationInsightHeader">
                        {this.state.country.toUpperCase()}
                    </div>

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
                            <Chart
                                // width={'1690px'}
                                // height={'910px'}
                                width = {'800px'}
                                height = {'600px'}
                                chartType="GeoChart"
                                data={ graphData
                                    //     [
                                    //     ['Country', 'Population'],
                                    //     [this.state.country.toLocaleUpperCase(), currentPopulation],
                                    //     // ['United States', 300],
                                    //     // ['Brazil', 400],
                                    //     // ['Canada', 500],
                                    //     // ['France', 600],
                                    //     // ['RU', 700],
                                    // ]
                                }
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
                                // Note: you will need to get a mapsApiKey for your project.
                                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                                mapsApiKey="AIzaSyBgT9S1jtBpZ7HNyqTz86ay1uEeHVj0bMY"
                                //rootProps={{ 'data-testid': '1' }}
                            />
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

                            <Chart
                                // width={'1690px'}
                                // height={'910px'}
                                width = {'600px'}
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
                            <br/>
                            <br/>
                            <div className="topFiveTable">
                                <div className="pigraphTitle">
                                    Population of top populous countries
                                </div>
                                <div className="pigraphSubtitle">
                                    Based on most recent and previous census data
                                </div>
                                <Chart
                                    // width={'1690px'}
                                    // height={'910px'}
                                    width = {'650px'}
                                    height = {'250px'}
                                    chartType="Bar"
                                    data={ this.state.topFiveArray }
                                    options = {{
                                        // displayMode : 'text',
                                        // chart: {
                                        //     title: 'Population of top populous countries',
                                        //     subtitle: 'Based on most recent and previous census data'
                                        // },
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
                    <div className="row container-fluid">
                        <div className="col-7 populationBox">
                            Population : {countryPopulation*1000}
                        </div>
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