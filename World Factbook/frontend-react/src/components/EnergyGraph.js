import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import url from '../url.js';
import {Link} from "react-router-dom";

class EnergyGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.country
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //console.log("In age componentWillReceiveProps nextprops",nextProps.country);
        //console.log("In age componentWillReceiveProps current props",this.state.country);
        if(nextProps.country.toLowerCase() !== this.state.country.toLowerCase()) {
            this.setState({
                country: nextProps.country.toLowerCase()
            })
           this.loadEnergyGraph(nextProps.country);
        }
    }

    loadEnergyGraph(country) {
        let api = url + '/energy-data/' + country;
        axios.get(api)
        .then((response) => {
            //console.log(response.data);
            if(response.data.message === 'success') {
                this.setState({
                    dataSource: response.data.dataSource,
                    start: response.data.start,
                    end: response.data.end
                });
            }
            else {
                //alert("Error loading the content");
            }
        })  
    }

    componentDidMount() {
        this.loadEnergyGraph(this.state.country);
    }

    render() {
        return (
            <div className="EnergyGraph">
                <div className="graphTitle">
                    <Link 
                        to = {{
                            pathname: '/dashboard/country-specific/more-energy-insights',
                            state: {
                                data: this.state.dataSource,
                                start: this.state.start,
                                end: this.state.end,
                                country: this.state.country
                            }
                        }}
                    >
                        Energy Insights
                    </Link>
                </div>
                <div className="graphSubtitle">
                    Energy demand, production and consumption from {this.state.start} - {this.state.end}
                </div>
                <Chart
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data= {this.state.dataSource}
                    options={
                        {
                            width: 700,
                            height: 290,
                            hAxis: {
                                title: 'Year'
                            },
                            vAxis: {
                                title: 'killo-watt-hour/million',
                                format: 'short',
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 2
                                }
                            },
                            fontSize: 14,
                            legend: { position: 'top'}
                        }
                    }
                    legendToggle
                />
            </div>
        )
    }
}


  

export default EnergyGraph;