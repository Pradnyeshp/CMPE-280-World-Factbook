import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend} from 'recharts';
import '../css/countrydetails.css';
import swal from 'sweetalert';



class CountryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.match.params.country.toUpperCase(),
            introduction: '',
            area: [],
            age_structure:[],
            climate: '',
            population: ''
        }
    }

    componentWillMount() {
        this.loadCountryDetails( this.state.country );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // if(nextProps.match.params.country !== this.state.country) {
        //     this.setState({
        //         country: nextProps.match.params.country
        //     })
        // }
        this.setState({
            country : nextProps.match.params.country.toUpperCase()
        });
        this.loadCountryDetails(nextProps.match.params.country );
    }

    loadCountryDetails(country) {
        let url = `http://localhost:3001/getcountry/${country}`;
        axios.get(url)
            .then((response)=>{
                if(response.data.message === 'error') {
                    swal(response.data.data, "sorry please search again", "error");
                    this.props.history.push('/HomePage');
                }

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
            <div className="container">

                <div className="details">
                    <h1>
                        {this.state.country}
                    </h1>
                </div>
                
                <div className="details">
                    <h3>
                        Introduction:
                    </h3>
                    <p className="countryDetails">
                        {this.state.introduction}
                    </p>
                </div>
                
                <div id="population">
                    <h3>
                        Population:
                    </h3>
                    <p className="countryDetails">
                        {this.state.population}
                    </p>
                </div>
                
                <div id="climate">
                    <h3>
                        Climate:
                    </h3>
                    <p className="countryDetails">
                        {this.state.climate}
                    </p>

                </div>

                <br/>
                <br/>
                
                <div id="graphArea">
                    <h3>
                        Area - (In Sq. Km.)
                    </h3>
                    <BarChart width={400} height={300} data={this.state.area}
                                margin={{top: 50, right: 30, left: 20, bottom: 5}}>
                        {/* <CartesianGrid strokeDasharray="3 3"/> */}
                        <XAxis dataKey="type">
                            {/* <Label value="Geography Type" offset={0} position="bottom" /> */}
                        </XAxis>
                        <YAxis dataKey="area">
                            {/* <Label value="Area" offset={3} angle={-90} position="left"/> */}
                        </YAxis>
                        <Tooltip/>
                        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 1, lineHeight: '20px' }}/>
                        <Bar dataKey="area" fill="#8884d8" />
                    </BarChart>
                </div>


                <div id="graphAgeStructure">
                    <h3>
                        Age Structure
                    </h3>
                    
                    <BarChart width={600} height={300} data={this.state.age_structure}
                                margin={{top: 50, right: 30, left: 20, bottom: 5}}>
                        {/* <CartesianGrid strokeDasharray="3 3"/> */}
                        <XAxis dataKey="range">
                            {/* <Label value="Age range in the country" offset={0} position="bottom" /> */}
                        </XAxis>
                        <YAxis dataKey="percentage"> 
                            {/* <Label value="Percentage of the range" offset={0} angle={-90} position="left" /> */}
                        </YAxis>
                        
                        <Tooltip/>
                        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 1, lineHeight: '20px' }}/>
                        <Bar dataKey="percentage" fill="#8884d8" />
                    </BarChart>
                    
                </div>
            </div>
                
            </div>
        )
    }
}

export default CountryDetails;