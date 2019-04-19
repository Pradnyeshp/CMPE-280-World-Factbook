import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import PopulationGraph from "./PopulationGraph";

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            country : 'india' ,
            populationArray : [] ,
            areaData : []
        }
    }

    componentWillMount() {
        let url = `http://localhost:3001/dashboard/${this.state.country}`;
        // let url = 'http://localhost:3001/area';
        // axios.get(url)
        //     .then(response=>{
        //         console.log(response.data.data);
        //         this.setState({
        //             areaData : response.data.data
        //         })
        //     })

        // let url = 'http://localhost:3001/population/' + this.state.country ;
        // axios.get(url)
        //     .then(response =>{
        //             console.log("Response from server : ", response) ;
        //             this.setState({
        //                 populationArray : response.data
        //             })
        //         }
        //     )
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
                <div className="dashboard" style={ {marginLeft : "50px" , marginRight : "50px"}}>
                    <h1 className='graph'>Dashboard</h1>
                    <br/>
                    <div className='row'>
                        <div className= 'col-md-6'>
                            <h3>Population</h3>
                            {/*Write graph component here, and pass countryName as props*/}
                            <PopulationGraph country = {this.state.country}/>
                            {/*Basic demo graph below*/}
                        </div>
                        <div className= 'col-md-6'>
                            <h3>Energy</h3>
                            <br/>
                            <p>Graph Here</p>
                            {/*Write graph component here, and pass countryName as props*/}
                        </div>
                    </div>

                    <div className='row'>
                        <div className= 'col-md-6'>
                            <h3>Economy</h3>
                            <br/>
                            <p>Graph Here</p>
                            {/*Write graph component here, and pass countryName as props*/}
                        </div>
                        <div className= 'col-md-6'>
                            <h3>Age Structure</h3>
                            <br/>
                            <p>Graph Here</p>
                            {/*Write graph component here, and pass countryName as props*/}

                        </div>
                    </div>

                    {/*<br/>*/}
                    {/*<div className='graph'>*/}
                    {/*    /!*<BarChart width={1050} height={350} data={top10}>*!/*/}
                    {/*    /!*    <CartesianGrid strokeDasharray="1 1" />*!/*/}
                    {/*    /!*    <XAxis dataKey="countryName" />*!/*/}
                    {/*    /!*    <YAxis dataKey="area"/>*!/*/}
                    {/*    /!*    <Tooltip />*!/*/}
                    {/*    /!*    <Legend />*!/*/}
                    {/*    /!*    <Bar dataKey="area" fill="#8884d8" />*!/*/}
                    {/*    /!*</BarChart>*!/*/}
                    {/*</div>*/}
                    {/*<br/>*/}
                    {/*<PieChart width={730} height={250}>*/}
                    {/*<Pie data={top10} dataKey="area" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>*/}
                    {/*/!*<Pie data={top10} dataKey="country" nameKey="country" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />*!/*/}
                    {/*</PieChart>*/}
                </div>

            </div>
        )
    }
}

export default Dashboard;
