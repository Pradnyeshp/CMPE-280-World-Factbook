import React, {Component} from 'react';
// import Navbar from "./Navbar";
import axios from 'axios';
// import {Bar, BarChart, CartesianGrid, Line, Legend, Tooltip, XAxis, YAxis, LineChart} from "recharts";
import { Chart } from "react-google-charts";

class PopulationGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            country : "india" ,
            populationArray : [],
            birthArray : [],
            deathArray : [],
            migrationArray : []
        }
    }

    componentWillMount() {

        console.log("country props : " , this.props.country) ;
        //change port to 3001
        let populationCountURL = `http://localhost:4040/populationCount/${this.state.country}` ;
        axios.get(populationCountURL)
            .then(response => {
                    console.log("Response from server : ", response.data) ;
                    this.setState({
                        populationArray : response.data.data
                    })
                }
            );
        
        //change port to 3001
        let birthCountURL = `http://localhost:4040/birthcount/${this.state.country}` ;
        axios.get(birthCountURL)
            .then(response => {
                    console.log("Response from server : ", response.data) ;
                    this.setState({
                        birthArray : response.data.data
                    })
                }
            );

        //change port to 3001
        let deathCountURL = `http://localhost:4040/deathcount/${this.state.country}` ;
        axios.get(deathCountURL)
            .then(response => {
                    console.log("Response from server : ", response.data) ;
                    this.setState({
                        deathArray : response.data.data
                    })
                }
            );
        
        //change port to 3001
        let migrantCountURL = `http://localhost:4040/migrantcount/${this.state.country}` ;
        axios.get(migrantCountURL)
            .then(response => {
                    console.log("Response from server : ", response.data) ;
                    this.setState({
                        migrationArray : response.data.data
                    })
                }
            );
        //let url = `http://localhost:4040/population/${this.state.country}` ;


    }

    render() {

        console.log(this.state);

        let populationArray = this.state.populationArray ;
        populationArray.sort((a,b) => {
            let year1 = a.year ;
            let year2 = b.year ;

            return year1 - year2 ;
        });

        let graphArray = [] ;
        let header = ['Year Range', 'value', 'birth rate', 'death rate', 'migrants count'] ;
        graphArray.push(header) ;
        let startYear = 0 ;
        let endYear = 0 ;

        populationArray.forEach(function (row) {
            let temp = [] ;
            if(parseInt(row.year) % 5 === 0){
                temp.push(row.year);
                temp.push(row.value);
                graphArray.push(temp) ;
            }
        });

        let birthArray = this.state.birthArray ;
        birthArray.forEach(function (row) {
            let range = row.yearRange ;
            row.yearRange = range.split('-')[0]
        });

        birthArray.sort((a,b) => (a.yearRange - b.yearRange)) ;

        for(let i = 1 ; i < graphArray.length ; i++){
            let temp = graphArray[i] ;
            let year = temp[0] ;

            birthArray.forEach(function (row) {
                if(row.yearRange === year)
                    temp.push(row.value);
            });
        }

        let deathArray = this.state.deathArray ;
        deathArray.forEach(function (row) {
            let range = row.yearRange ;
            row.yearRange = range.split('-')[0]
        });
        deathArray.sort((a,b) => ( a.yearRange - b.yearRange)) ;

        for(let i = 1 ; i < graphArray.length ; i++){
            let temp = graphArray[i] ;
            let year = temp[0] ;

            deathArray.forEach(function (row) {
                if(row.yearRange === year)
                    temp.push(row.value);
            });
        }

        let migrantArray = this.state.migrationArray ;
        migrantArray.forEach(function (row) {
            let range = row.yearRange ;
            row.yearRange = range.split('-')[0]
        });
        migrantArray.sort((a,b) => ( a.yearRange - b.yearRange)) ;

        for(let i = 1 ; i < graphArray.length ; i++){
            let temp = graphArray[i] ;
            let year = temp[0] ;

            migrantArray.forEach(function (row) {
                if(row.yearRange === year)
                    temp.push(row.value);
            });
        }

        // console.log(graphArray) ;
        // console.log(birthArray) ;

        // //
        // console.log(startYear) ;
        // console.log(endYear) ;

        return(
            <div>
                {/*<Navbar/>*/}
                <div className="container">
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data = {graphArray}
                            options={{
                                // Material design options
                                chart: {
                                    title: 'Population Growth ',
                                    subtitle: 'Year { ' + startYear + ' - ' + endYear + ' }'
                                },
                                chartArea: { right: 80 }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                        />
                    <br/>
                </div>
            </div>
        )
    }
}

export default PopulationGraph;
