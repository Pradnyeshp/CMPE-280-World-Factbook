import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import PopulationGraph from "./PopulationGraph";
import EnergyGraph from './EnergyGraph';
import AgeStructureGraph from './AgeStructureGraph';
import EconomyGraph from './EconomyGraph';
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
        let url = `http://localhost:4040/dashboard/${this.state.country}`;
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
                            {/*<h3>Population</h3>*/}
                            {/*Write graph component here, and pass countryName as props*/}
                            <PopulationGraph country = {this.state.country}/>
                            {/*Basic demo graph below*/}
                        </div>
                        <div className= 'col-md-6'>
                            {/* <h3>Energy</h3>
                            <br/>
                            <p>Graph Here</p> */}
                            {/*Write graph component here, and pass countryName as props*/}
                            <EnergyGraph country = {this.state.country}/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className= 'col-md-6'>
                            <h3>Economy</h3>
                            <br/>
                            {/*<p>Graph Here</p>*/}
                            {/*Write graph component here, and pass countryName as props*/}
                            <EconomyGraph country = {this.state.country}/>
                        </div>
                        <div className= 'col-md-6'>
                            <h3>Age Structure</h3>
                            <br/>
                            {/*Write graph component here, and pass countryName as props*/}
                            <AgeStructureGraph country = {this.state.country} />
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Dashboard;
