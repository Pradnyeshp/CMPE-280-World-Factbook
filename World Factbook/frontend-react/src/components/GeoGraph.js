import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Chart } from "react-google-charts";

class GeoGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            country : "india" ,
            populationCountArray : [],
            allCountryPopulationArray : []
        }
    }

    componentWillMount() {
        // change port to 3001
        // let url = `http://localhost:4040/populationCount/${this.state.country}` ;
        // axios.get(url)
        //     .then(response=>{
        //         console.log(response.data) ;
        //         this.setState({
        //             populationCountArray : response.data.data
        //         })
        //     }) ;

        let countryPopulationURL = 'http://localhost:4040/population/countries' ;
        axios.get(countryPopulationURL)
            .then(response=> {
                console.log(response.data) ;
                this.setState({
                    allCountryPopulationArray : response.data.data
                })
            })
    }

    render() {

        // console.log(this.state.populationCountArray) ;
        let header = ['Country', 'Population'] ;
        let graphData = [] ;
        graphData.push(header) ;

        let allCountryPouplations = this.state.allCountryPopulationArray ;

        if(allCountryPouplations !== null){
            allCountryPouplations.forEach(function (row) {
                graphData.push(row) ;
            }) ;
        }

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
                <br/>
                <Chart
                    width={'1550px'}
                    height={'750px'}
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
                        colorAxis: { colors: ['white', '#e31b23'] },
                        backgroundColor: '#81d4fa',
                        // textStyle: {color: 'blue', fontSize: 16}
                    }}
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    mapsApiKey="AIzaSyBgT9S1jtBpZ7HNyqTz86ay1uEeHVj0bMY"
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }

}

export default GeoGraph;