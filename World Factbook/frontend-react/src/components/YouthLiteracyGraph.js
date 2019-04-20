import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

class YouthLiteracyGraph extends Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:4040/youth-literacy-rate/${this.props.country}`)
            .then((response) =>{

                console.log(response.data);
                if(response.data.message === 'success') {
                    this.setState({
                        data: response.data.data
                    });
                }
                else {
                    alert("Error loading the content");
                }
            }
        )

    }


    render(){
        return(

            <div className="YouthLiteracyGraph">
                <Chart
                        width={'300px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.data}
                        options={{
                            title: 'Youth Literacy Rate',
                            // Just add this option
                            pieHole: 0.4,
                        }}
                        rootProps={{ 'data-testid': '3' }}
                        />

            </div>
        )
    }
}

export default YouthLiteracyGraph;