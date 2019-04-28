import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import url from '../url.js';

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
            });

           this.loadAgeStructureGraph(nextProps.country);
        }
    }

    loadAgeStructureGraph(country) {
        let api = url+'/age-structure-data/'+country;
        axios.get(api)
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
                height={'290px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{
                    chartArea: {
                        top: '20',
                        left: '30'
                    },
                    legend: {position: 'bottom'},
                    fontSize: 14
                }}
                />
            </div>
        );
    }
}

export default AgeStructureGraph;