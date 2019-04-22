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
            })
           this.loadEconomyGraph(nextProps.country);
        }
    }

    loadEconomyGraph(country) {
        axios.get(`http://localhost:4040/economy-data/${country}`)
        .then((response) => {
            console.log(response.data);
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
            <div className="EconomyGraph">
                <Chart
                    width={'700px'}
                    height={'300px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={this.state.dataSource}
                    options={{
                        chart: {
                        title: 'Economy Insights',
                        subtitle: 'Comparison between Umemployment rate and Growth rate',
                        },
                        series: {
                            0: { axis: 'growthrate' }, // Bind series 0 to an axis named 'distance'.
                            1: { axis: 'unemployment' } // Bind series 1 to an axis named 'brightness'.
                        },
                        axes: {
                            y: {
                                growthrate: {label: 'growth rate'}, // Left y-axis.
                                unemployment: {side: 'right', label: 'unemployment rate'} // Right y-axis.
                            }
                        }
                    }}
                    legendToggle
                    //rootProps={{ 'data-testid': '3' }}
                    />
            </div>
        )
    }
}


  

export default EconomyGraph;