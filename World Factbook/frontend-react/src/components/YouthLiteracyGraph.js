import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

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
        axios.get(`http://localhost:4040/youth-literacy-rate/${country}`)
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
                            legend: {position: 'right'},
                            fontSize: 16
                        }}
                        
                        />

            </div>
        )
    }
}

export default YouthLiteracyGraph;