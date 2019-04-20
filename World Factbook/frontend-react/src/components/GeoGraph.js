import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Chart } from "react-google-charts";

class GeoGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            country : "india" ,
            populationCountArray : []
        }
    }

    componentWillMount() {
        //change port to 3001
        let url = `http://localhost:4040/populationCount/${this.state.country}` ;
        axios.get(url)
            .then(response=>{
                console.log(response.data) ;
                this.setState({
                    populationCountArray : response.data.data
                })
            })
    }

    render() {

        // console.log(this.state.populationCountArray) ;
        let populationCountArray = this.state.populationCountArray ;
        let currentPopulation ;

        for(let i = 0 ; i < populationCountArray.length ; i++){

            let row = populationCountArray[i] ;
            if(row.year === "2019"){
                currentPopulation = row.value ;
                break;
            }
        }

        console.log(currentPopulation);


        return(
            <div>
                <Navbar/>
                <br/>
                <h2>
                    Geo Graph
                </h2>
                Geo Chart
                <Chart
                    width={'1200px'}
                    height={'700px'}
                    chartType="GeoChart"
                    data={[
                        ['Country', 'Population'],
                        [this.state.country.toLocaleUpperCase(), currentPopulation],
                        // ['United States', 300],
                        // ['Brazil', 400],
                        // ['Canada', 500],
                        // ['France', 600],
                        // ['RU', 700],
                    ]}
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