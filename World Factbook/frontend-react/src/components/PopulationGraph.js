import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

class PopulationGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            country : "india" ,
            populationArray : []
        }
    }

    componentWillMount() {
        let url = 'http://localhost:3001/population/' + this.state.country ;
        axios.get(url)
            .then(response =>{
                console.log("Response from server : ", response) ;
                this.setState({
                    populationArray : response.data
                })
            }
        )
    }

    render() {
        
        return(
            <div>
                {/*<Navbar/>*/}
                <br/>
                <div className="container small">
                    {/*<h1 className='graph'>Population Page</h1>*/}
                    {/*<br/>*/}
                    <h3>Population growth trend</h3>
                    <br/>
                    <div className='graph'>

                        {/*<BarChart width={1050} height={350} data={top10}>*/}
                        {/*    <CartesianGrid strokeDasharray="1 1" />*/}
                        {/*    <XAxis dataKey="countryName" />*/}
                        {/*    <YAxis dataKey="area"/>*/}
                        {/*    <Tooltip />*/}
                        {/*    <Legend />*/}
                        {/*    <Bar dataKey="area" fill="#8884d8" />*/}
                        {/*</BarChart>*/}
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

export default PopulationGraph;
