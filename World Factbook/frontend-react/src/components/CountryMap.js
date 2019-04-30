import React, {Component} from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import url from '../url.js';
import '../css/geogdpgraph.css';

class CountryMap extends Component{

    constructor(props){
        super(props);

        this.state = {
            country : this.props.country ,
            abbreviation : ''
        }

    }

    componentDidMount() {

        let countryDataURL = url + '/countrymap/' + this.state.country ;
        axios.get(countryDataURL)
            .then(response => {
                // console.log(response.data);
                if(response.data.message === "success"){
                    this.setState({
                        abbreviation : response.data.data
                    })
                }
                else{
                    this.setState({
                        abbreviation : ''
                    })
                }
            })

    }

    render() {

        let country = this.state.country.toUpperCase() ;
        let abbv = this.state.abbreviation ;

        return(
            <div className="geoGraphMainDiv" style={{marginTop : '0', marginBottom : '15px'}}>
                {/*<div className="headerGeoGDP">*/}
                {/*    /!*Map*!/*/}
                {/*</div>*/}
                {/*<div className="geoMapGDPSubtitle">*/}
                {/*    /!*GDP comparison of countries (2017 est.)*!/*/}
                {/*</div>*/}
                <div className='row' style={{marginLeft : '0'}}>
                    <div style={{border : '1px solid black'}}>
                        <Chart
                            loader={<div>Loading Chart</div>}
                            width = 'auto'
                            height = 'auto'
                            chartType="GeoChart"
                            data={[['country', 'abbreviation'], [ country, country]]}
                            options = {{
                                region : abbv ,
                                colorAxis: { colors: ['#65fe00'] },
                                // markerOpacity : 1,
                                // markerColor : 'blue',
                                // legend : 'none',
                                // tooltip : {
                                //     textStyle: {color: 'black', fontSize: 18},
                                //     trigger : 'focus'
                                // },
                                // marker : 'true',
                                // defaultColor : '#ccfbfe',
                                displayMode : 'regions',
                                backgroundColor : '#b1fafe'
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

export default CountryMap ;