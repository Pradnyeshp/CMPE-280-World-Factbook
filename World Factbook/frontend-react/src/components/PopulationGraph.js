import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import {Bar, BarChart, CartesianGrid, Line, Legend, Tooltip, XAxis, YAxis, LineChart} from "recharts";

class PopulationGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            country : "india" ,
            populationArray : []
        }
    }

    componentWillMount() {

        console.log("country props : " , this.props.country) ;

        let url = `http://localhost:3001/population/${this.state.country}` ;

        axios.get(url)
            .then(response =>{
                console.log("Response from server : ", response.data) ;
                this.setState({
                    populationArray : response.data.data
                })
            }
        )

    }

    render() {

        let populationArray = this.state.populationArray ;
        populationArray.sort((a,b) => {
            let year1 = a.yearRange.split('-') ;
            let year2 = b.yearRange.split('-') ;

            return year1[0] - year2[0] ;
        });

        return(
            <div>
                {/*<Navbar/>*/}
                <div className="container">
                    {/*<h1 className='graph'>Population Page</h1>*/}
                    {/*<br/>*/}
                    {/*<h3>Population growth trend</h3>*/}
                    <br/>
                    <div className='graph'>

                        <BarChart width={550} height={250} data={populationArray}>
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="yearRange" />
                            <YAxis dataKey="value"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                        {/*<LineChart width={500} height={300} data={populationArray}>*/}
                        {/*    <XAxis dataKey="value"/>*/}
                        {/*    <YAxis dataKey="yearRange"/>*/}
                        {/*    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>*/}
                        {/*    <Line type="monotone" dataKey="uv" stroke="#8884d8" />*/}
                        {/*    <Line type="monotone" dataKey="value" stroke="#82ca9d" />*/}
                        {/*</LineChart>*/}
                    </div>
                    <br/>
                </div>
            </div>
        )
    }
}

export default PopulationGraph;
