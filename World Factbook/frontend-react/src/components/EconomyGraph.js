import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

class EconomyGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4040/economy-data/${this.props.country}`)
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
                    width={'600px'}
                    height={'300px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={this.state.dataSource}
                    options={{
                        chart: {
                        title: 'GDP Data',
                        subtitle: `GDP per capita from ${this.state.start} - ${this.state.end}`
                        },
                        axes: {
                            y: {
                              0: { side: 'left', label: 'Value in Trillions'} 
                            }
                          },
                    }}
                    //rootProps={{ 'data-testid': '3' }}
                    />
            </div>
        )
    }
}


  

export default EconomyGraph;