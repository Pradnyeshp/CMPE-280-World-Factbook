import React, {Component} from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import url from '../url.js';
import '../css/geogdpgraph.css';

class GeoGraphForGDP extends Component{

    constructor(props){
        super(props);

        this.state = {
            graphData : []
        }

    }

    componentDidMount() {

        let gdpFetchURL = url + '/economy/getGDPofAllCountries' ;
        axios.get(gdpFetchURL)
            .then(response => {
                // console.log(response.data);
                if(response.data.message === "success"){
                    this.setState({
                        graphData : response.data.data
                    })
                }
                else{
                    this.setState({
                        graphData : []
                    })
                }
            })

    }

    render() {

        return(
            <div className="geoGraphMainDiv">
                <div className="headerGeoGDP">
                    GDP Distribution
                </div>
                <div className="geoMapGDPSubtitle">
                    GDP comparison of countries (2017 est.)
                </div>
                <div className='row' style={{marginLeft : '0'}}>
                    <div className="col-11 geographGDP">
                        <Chart
                            loader={<div>Loading Chart</div>}
                            width = '850px'
                            height = '600px'
                            chartType="GeoChart"
                            data={ this.state.graphData }
                            options = {{
                                colorAxis: { colors: ['#ccfbfe', '#0064c8'] },
                                markerOpacity : 1,
                                markerColor : 'blue',
                                legend : 'none',
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
                        />
                    </div>
                    {/* <div className="row">
                                <div className="col-4 populationBox">
                                    Population : {this.abbreviateNumber(countryPopulation*1000)}
                                </div>
                                <div className="col-5 populationBox">
                                    Population Growth Rate : {growthRate.toFixed(2)} %
                                </div>
                    </div> */}
                </div>
            </div>
        )
    }

}

export default GeoGraphForGDP ;