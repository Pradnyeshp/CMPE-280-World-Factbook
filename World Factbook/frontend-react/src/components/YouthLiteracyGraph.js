import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import url from '../url.js';
class YouthLiteracyGraph extends Component{

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
           this.loadYouthLiteracyGraph(nextProps.country);
        }
    }

    loadYouthLiteracyGraph(country) {
        let api = url+`/youth-literacy-rate/${country}`;
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
        this.loadYouthLiteracyGraph(this.state.country);
    }


    render(){
        return(

            <div className="YouthLiteracyGraph">
                <Chart
                    width={'400px'}
                    height={'290px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        chartArea: {
                            top: '20',
                            left: '-30'
                        },
                        legend: {position: 'bottom'},
                        fontSize: 14
                    }}
                />
            </div>
        )
    }
}

export default YouthLiteracyGraph;