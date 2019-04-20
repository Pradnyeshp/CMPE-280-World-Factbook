import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

class AgeStructureGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4040/age-structure-data/${this.props.country}`)
        .then((response) => {
            if(response.data.message === 'success') {
                this.setState({
                    data: response.data.data
                })
            } else {

            }
        })
    }

    render() {
        return (
            <div className='AgeStructureGraph'>
                <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{
                    chartArea: {
                        top: '20',
                        left: '30'
                    },
                    legend: {position: 'right'}
                }}
                />
            </div>
        );
    }
}

export default AgeStructureGraph;