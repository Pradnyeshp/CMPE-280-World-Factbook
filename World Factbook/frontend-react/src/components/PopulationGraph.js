import React, {Component} from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import '../css/style.css';
import url from '../url.js';
import {Link} from "react-router-dom";

class PopulationGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country : this.props.country ,
            populationArray : [],
            populationGrowthArray : [],
            birthArray : [],
            deathArray : [],
            migrationArray : [],
            growthRate : 0
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //console.log("In age componentWillReceiveProps nextprops",nextProps.country);
        //console.log("In age componentWillReceiveProps current props",this.state.country);
        if(nextProps.country.toLowerCase() !== this.state.country.toLowerCase()) {
            this.setState({
                country: nextProps.country.toLowerCase()
            });
           this.loadPopulationGraph(nextProps.country);
        }
    }

    loadPopulationGraph(country) {
        //console.log("country props : " , this.props.country) ;
        //change port to 3001

        let api = url+`/population/${country}` ;

        axios.get(api)
            .then(response =>{
                    //console.log("Response from server : ", response.data) ;
                    if(response.data.message === 'success') {
                        this.setState({
                            populationGrowthArray : response.data.data
                        });
                    }
                    
                }
            );

        let populationCountURL = url+`/populationCount/${country}` ;
        axios.get(populationCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    if(response.data.message === 'success') {
                        this.setState({
                            populationArray : response.data.data
                        })
                    }
                    
                }
            );
        
        //change port to 3001
        let birthCountURL = url+`/birthcount/${country}` ;
        axios.get(birthCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    if(response.data.message === 'success') {
                        this.setState({
                            birthArray : response.data.data
                        })
                    }
                    
                }
            );

        //change port to 3001
        let deathCountURL = url+`/deathcount/${country}` ;
        axios.get(deathCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    if(response.data.message === 'success') {
                        this.setState({
                            deathArray : response.data.data
                        })
                    }
                    
                }
            );
        
        //change port to 3001
        let migrantCountURL = url+`/migrantcount/${country}` ;
        axios.get(migrantCountURL)
            .then(response => {
                    //console.log("Response from server : ", response.data) ;
                    if(response.data.message === 'success') {
                        this.setState({
                            migrationArray : response.data.data
                        })
                    }
                    
                }
            );
        //let url = `http://localhost:4040/population/${this.state.country}` ;


    }

    componentDidMount() {
        this.loadPopulationGraph(this.state.country);
    }

    render() {

        //console.log(this.state);

        let populationArray = this.state.populationArray ;
        populationArray.sort((a,b) => {
            let year1 = a.year ;
            let year2 = b.year ;

            return year1 - year2 ;
        });

        let graphArray = [] ;
        // let header = ['Year', 'population', 'birthcount', 'death count'] ;
        let header = ['Year', 'Population', 'Growth Rate'] ;

        graphArray.push(header) ;

        populationArray.forEach(function (row) {
            let temp = [] ;
            if(parseInt(row.year) % 5 === 0){
                temp.push(row.year);
                temp.push(row.value);
                graphArray.push(temp) ;
            }
        });

        let populationGrowthArray = this.state.populationGrowthArray ;
        populationGrowthArray.forEach(function (row) {
            let range = row.yearRange ;
            row.yearRange = range.split('-')[0]
        });

        populationGrowthArray.sort((a,b) => (a.yearRange - b.yearRange)) ;

        for(let i = 1 ; i < graphArray.length ; i++){
            let temp = graphArray[i] ;
            let year = temp[0] ;

            populationGrowthArray.forEach(function (row) {
                if(row.yearRange === year)
                    temp.push(row.value);
            });
        }
        console.log("graphArray", graphArray);
        // let birthArray = this.state.birthArray ;
        // birthArray.forEach(function (row) {
        //     let range = row.yearRange ;
        //     row.yearRange = range.split('-')[0]
        // });
        //
        // birthArray.sort((a,b) => (a.yearRange - b.yearRange)) ;
        //
        // for(let i = 1 ; i < graphArray.length ; i++){
        //     let temp = graphArray[i] ;
        //     let year = temp[0] ;
        //
        //     birthArray.forEach(function (row) {
        //         if(row.yearRange === year)
        //             temp.push(row.value);
        //     });
        // }
        //
        // let deathArray = this.state.deathArray ;
        // deathArray.forEach(function (row) {
        //     let range = row.yearRange ;
        //     row.yearRange = range.split('-')[0]
        // });
        // deathArray.sort((a,b) => ( a.yearRange - b.yearRange)) ;
        //
        // for(let i = 1 ; i < graphArray.length ; i++){
        //     let temp = graphArray[i] ;
        //     let year = temp[0] ;
        //
        //     deathArray.forEach(function (row) {
        //         if(row.yearRange === year)
        //             temp.push(row.value);
        //     });
        // }

        // let migrantArray = this.state.migrationArray ;
        // migrantArray.forEach(function (row) {
        //     let range = row.yearRange ;
        //     row.yearRange = range.split('-')[0]
        // });
        // migrantArray.sort((a,b) => ( a.yearRange - b.yearRange)) ;
        //
        // for(let i = 1 ; i < graphArray.length ; i++){
        //     let temp = graphArray[i] ;
        //     let year = temp[0] ;
        //
        //     migrantArray.forEach(function (row) {
        //         if(row.yearRange === year)
        //             temp.push(row.value);
        //     });
        // }

        // console.log(graphArray) ;
        // console.log(birthArray) ;

        // //
        // console.log(startYear) ;
        // console.log(endYear) ;

        return(
            <div>
                <div className="populationGraph">

                    <div className="graphTitle">
                        <Link
                            to = {{
                                pathname: `/PopulationInsights`,
                                state: {
                                    growthArray: this.state.populationGrowthArray,
                                    country: this.state.country
                                }
                            }}
                        >
                            Population Insights
                        </Link>
                    </div>
                    <div className="graphSubtitle">
                        Population count, growth rate from 1995 - 2020
                    </div>
                        <Chart
                            chartType="ComboChart"
                            loader={<div>Loading Chart</div>}
                            data = {graphArray}
                            options={{
                                // Material design options
                                // chart: {
                                //     title: 'Population Insights ',
                                //     subtitle: 'Population count, growth rate from ' + startYear + ' - ' + endYear
                                // },
                                // series: {
                                //     0: { axis: 'population' }, // Bind series 0 to an axis named 'distance'.
                                //     1: { axis: 'growthrate' } // Bind series 1 to an axis named 'brightness'.
                                // },
                                // axes: {
                                //     y: {
                                //         population: {label: 'population'}, // Left y-axis.
                                //         growthrate: {side: 'right', label: 'population growth rate'} // Right y-axis.
                                //     }
                                // }

                                width: 650,
                                height: 290,
                                seriesType: 'bars',
                                series: {
                                    0: {targetAxisIndex: 0},
                                    1: {targetAxisIndex: 1, type: 'line'}
                                },
                                hAxis: {
                                    title: 'Year'
                                },
                                vAxes: {
                                    0: {
                                        title: 'population in thousands', 
                                        format: 'short', 
                                        gridlines: {
                                            color: 'lightgrey',
                                            count: 2
                                        },
                                        italic : false
                                    },
                                    1: {
                                        title: 'population growth rate', 
                                        gridlines: {
                                            color: 'lightgrey',
                                            count: 1
                                        },
                                        italic : false
                                    },
                                    
                                },
                                fontSize: 14,
                                legend: { position: 'top'},
                                bar: {groupWidth: "40%"}
                            }}
                            legendToggle
                        />
                    <br/>
                </div>
            </div>
        )
    }
}

export default PopulationGraph;
