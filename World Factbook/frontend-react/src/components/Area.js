import React, {Component} from 'react';
import Navbar from "./Navbar";
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import axios from 'axios';
import '../css/graphStyle.css'

class Area extends Component {

    constructor() {
        super();

        this.state = ({
            areaData : []
        })
    }

    componentWillMount() {
        let url = 'http://localhost:3001/area';
        axios.get(url)
            .then(response=>{
                console.log(response.data.data);
                this.setState({
                    areaData : response.data.data
                })
            })
    }

    render() {

        let data = this.state.areaData;
        let top10 = [];

        for(let i = 0 ; i < 10 ; i++){
            top10.push(data[i]);
        }

        return(
            <div>
                <Navbar/>
                <br/>
                <div className="container small">
                    <h1 className='graph'>Area Page</h1>
                    <br/>
                    <h3>Top 10 countries by Area</h3>
                    <br/>
                    <div className='graph'>
                        <BarChart width={1050} height={350} data={top10}>
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="countryName" />
                            <YAxis dataKey="area"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="area" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <br/>
                    {/*<PieChart width={730} height={250}>*/}
                        {/*<Pie data={top10} dataKey="area" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>*/}
                        {/*/!*<Pie data={top10} dataKey="country" nameKey="country" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />*!/*/}
                    {/*</PieChart>*/}
                </div>

            </div>
        )
    }
}

export default Area;
