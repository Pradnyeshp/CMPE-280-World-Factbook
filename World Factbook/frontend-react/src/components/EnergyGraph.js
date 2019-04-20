import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

class EnergyGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //change port to 3001
        axios.get(`http://localhost:4040/energy-data/${this.props.country}`)
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
            <div className="EnergyGraph">
                <Chart
                    width={900}
                    height={300}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data= {this.state.dataSource}
                    options={
                        {
                            width: 600,
                            chart: {
                                title: 'Energy Insights',
                                subtitle: `Energy demand, production and consumption from ${this.state.start} - ${this.state.end}`
                              },
                            axes: {
                                y: {
                                  0: { side: 'left', label: 'killo-watts/million'} // left y position 
                                }
                              },
                        }
                    }
                    legendToggle
                />
            </div>
        )
    }
}


  

export default EnergyGraph;