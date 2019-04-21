import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import PopulationGraph from "./PopulationGraph";
import EnergyGraph from './EnergyGraph';
import AgeStructureGraph from './AgeStructureGraph';
import EconomyGraph from './EconomyGraph';
import PopulationGrowthGraph from "./PopulationGrowthGraph";
import YouthLiteracyGraph from "./YouthLiteracyGraph";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country : this.props.countryName.toLowerCase(),
            populationArray : [] ,
            areaData : []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("In dashboard componentWillReceiveProps nextprops",nextProps.countryName);
        console.log("In dashboard componentWillReceiveProps current props",this.state.country);
        if(nextProps.countryName.toLowerCase() !== this.state.country.toLowerCase()) {
            this.setState({
                country: nextProps.countryName.toLowerCase()
            })
        }
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
                    <h1>{this.state.country.toUpperCase()}</h1>
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
                            <br/>
                            {/*<p>Graph Here</p>*/}
                            {/*Write graph component here, and pass countryName as props*/}
                            <EconomyGraph country = {this.state.country}/>
                        </div>
                        <div className= 'col-md-3'>
                            <h3>Age Structure</h3>
                            <br/>
                            {/*Write graph component here, and pass countryName as props*/}
                            <AgeStructureGraph country = {this.state.country} />
                        </div>
                        
                        <div className= 'col-md-3'>
                            <h3>Youth Literacy</h3>
                            <br/>
                            {/*Write graph component here, and pass countryName as props*/}
                            <YouthLiteracyGraph country = {this.state.country} />
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default Dashboard;
