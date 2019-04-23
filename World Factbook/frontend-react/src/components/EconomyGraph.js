import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

class EconomyGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.country
        }
    }

    componentDidMount() {
        this.loadEconomyGraph(this.state.country);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //console.log("In age componentWillReceiveProps nextprops",nextProps.country);
        //console.log("In age componentWillReceiveProps current props",this.state.country);
        if(nextProps.country.toLowerCase() !== this.state.country.toLowerCase()) {
            this.setState({
                country: nextProps.country.toLowerCase()
            });
           this.loadEconomyGraph(nextProps.country);
        }
    }

    loadEconomyGraph(country) {
        axios.get(`http://localhost:4040/economy-data/${country}`)
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
                alert("Error loading the content");
            }

        })  
    }

    render() {
        return (
            <div className="EconomyGraph" style={{paddingRight : "0", paddingLeft : "0", width : '770px'}}>

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
                        width: 700,
                        height: 290,
                        series: {
                            0: {targetAxisIndex: 0},
                            1: {targetAxisIndex: 1}
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
                                title: 'unemployment rate',
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 2
                                }
                            },
                            1: {
                                title: 'GDP growth rate', 
                                gridlines: {
                                    color: 'lightgrey',
                                    count: 1
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


  

export default EconomyGraph;