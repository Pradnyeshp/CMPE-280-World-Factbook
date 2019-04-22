import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

class AgeStructureGraph extends Component {

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

           this.loadAgeStructureGraph(nextProps.country);
        }
    }

    loadAgeStructureGraph(country) {
        axios.get(`http://localhost:4040/age-structure-data/${country}`)
        .then((response) => {
            if(response.data.message === 'success') {
                this.setState({
                    data: response.data.data
                })
            } else {

            }
        })
    }

    componentDidMount() {
        //change port to 3001
        this.loadAgeStructureGraph(this.state.country);
    }


    render() {
        return (
            <div className='AgeStructureGraph'>
                <Chart
                width={'500px'}
                height={'320px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{
                    chartArea: {
                        top: '20',
                        left: '30'
                    },
                    legend: {position: 'right'},
                    fontSize: 15
                }}
                />
            </div>
        );
    }
}

export default AgeStructureGraph;