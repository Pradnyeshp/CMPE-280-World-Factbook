import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend} from 'recharts';
import Piechart from 'react-minimal-pie-chart';

class CountryDetails extends Component {
    constructor(props) {
        super(props);
        let countryName = this.props.match.params.country;
        countryName = countryName.toUpperCase();
        this.state = {
            country: countryName,
            introduction: '',
            area: [],
            age_structure:[],
            climate: '',
            population: ''
        }
    }

    componentWillMount() {
        let url = `http://localhost:3001/getcountry/${this.state.country}`;
        axios.get(url)
        .then((response)=>{
            console.log();
            this.setState({
                introduction: response.data.data.introduction,
                area: response.data.data.area,
                age_structure: response.data.data.age_structure,
                climate: response.data.data.climate,
                population: response.data.data.population
            })
        })
    }


    render() {
        
        return (
            <div className="CountryDetails"> 
                <Navbar/>
                <h1>
                    {this.state.country}
                </h1>

                <h3>
                    Introduction:
                </h3>
                <p>
                    {this.state.introduction}
                </p>

                <h3>
                    Population:
                </h3>
                <p>
                    {this.state.population}
                </p>
                
                <h3>
                    Climate:
                </h3>
                <p>
                    {this.state.climate}
                </p>

                <div>
                    <h3>
                        Area - (In Sq. Km.)
                    </h3>
                    <BarChart width={600} height={300} data={this.state.area}
                                margin={{top: 5, right: 30, left: 100, bottom: 5}}>
                        {/* <CartesianGrid strokeDasharray="3 3"/> */}
                        <XAxis dataKey="type">
                            <Label value="Geography Type" offset={0} position="bottom" />
                        </XAxis>
                        <YAxis dataKey="area">
                            <Label value="Area" offset={50} angle={-90} position="outside" />
                        </YAxis>
                        <Tooltip/>
                        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }}/>
                        <Bar dataKey="area" fill="#8884d8" />
                    </BarChart>
                </div>


                <div>
                    <h3>
                        Age Structure
                    </h3>
                    
                    <BarChart width={800} height={500} data={this.state.age_structure}
                                margin={{top: 50, right: 30, left: 20, bottom: 5}}>
                        {/* <CartesianGrid strokeDasharray="3 3"/> */}
                        <XAxis dataKey="range">
                            <Label value="Age range in the country" offset={0} position="bottom" />
                        </XAxis>
                        <YAxis dataKey="percentage"> 
                            <Label value="Percentage of the range" offset={0} angle={-90} position="left" />
                        </YAxis>
                        
                        <Tooltip/>
                        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }}/>
                        <Bar dataKey="percentage" fill="#8884d8" />
                    </BarChart>
                    
                </div>
            </div>
        )
    }
}

export default CountryDetails;