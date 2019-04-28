import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import url from '../url.js';

class EconomyInsightsDetailsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.country
        }
    }

    componentDidMount() {
        this.loadEconomyInsightsDetailsGraph(this.state.country);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //console.log("In age componentWillReceiveProps nextprops",nextProps.country);
        //console.log("In age componentWillReceiveProps current props",this.state.country);
        if(nextProps.country.toLowerCase() !== this.state.country.toLowerCase()) {
            this.setState({
                country: nextProps.country.toLowerCase()
            });
           this.loadEconomyInsightsDetailsGraph(nextProps.country);
        }
    }

    loadEconomyInsightsDetailsGraph(country) {
        let api = url+ '/economy-insights-data/'+country;
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

    render() {
        return (
            <div className="EconomyInsightsDetailsGraph" style={{paddingRight : "0", paddingLeft : "0", width : '770px'}}>

                <div className="graphTitle">
                    Economy Insights
                </div>
                <div className="graphSubtitle">
                    GDP growth rate vs Unemployment rate from {this.state.start} - {this.state.end}
                </div>

                <Chart
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.dataSource}
                    options={{
                        width: 1000,
                        height: 290,
                        series: {
                            0: {targetAxisIndex: 0},
                            1: {targetAxisIndex: 1}
                            // 2: {targetAxisIndex: 2},
                            // 3: {targetAxisIndex: 3}
                        },
                        // series: {
                        //     0: { axis: 'growthrate' }, // Bind series 0 to an axis named 'distance'.
                        //     1: { axis: 'unemployment' } // Bind series 1 to an axis named 'brightness'.
                        // },
                        // axes: {
                        //     y: {
                        //         growthrate: {label: 'growth rate'}, // Left y-axis.
                        //         unemployment: {side: 'right', label: 'unemployment rate'} // Right y-axis.
                        //     }
                        // },
                        hAxis: {
                            title: 'Year'
                        },
                        vAxes: {
                            0: {
                                title: 'Military rate',
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 4
                                }
                            },
                            1: {
                                title: 'educatiion rate', 
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 1
                                }
                            },
                            2: {
                                title: 'Military rate',
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 3
                                }
                            },
                            3: {
                                title: 'educatiion rate', 
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 4
                                }
                            },
                            
                        },
                        fontSize: 14,
                        legend: { position: 'top'},
                    }}
                    legendToggle
                    //rootProps={{ 'data-testid': '3' }}
                    />
            </div>
        )
    }
}


  

export default EconomyInsightsDetailsGraph;