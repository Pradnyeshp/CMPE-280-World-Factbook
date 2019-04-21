import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend} from 'recharts';
import '../css/countrydetails.css';
import swal from 'sweetalert';
import AgeStructureGraph from './AgeStructureGraph';


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
        console.log("in country details page");
        console.log("country length : ", country.length );
        if( country === ""  || country.length === 0 ){
            swal("Please enter some serach criteria" , "try with different keyword", "error");
            this.props.history.push('/HomePage');
        }
        else {
            let url = `http://localhost:3001/getcountry/${country}`;
            axios.get(url)
                .then((response)=>{
                    if(response.data.message === 'error') {
                        swal(response.data.data, "try with different keyword", "error");
                        this.props.history.push('/HomePage');
                    } else {
                        //console.log(response.data.data);
                        this.setState({
                            introduction: response.data.data.introduction,
                            area: response.data.data.area,
                            age_structure: response.data.data.age_structure,
                            climate: response.data.data.climate,
                            population: response.data.data.population
                        })
                    }
                })
        }

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

                <div id="graphAgeStructure">
                    <h3>
                        Age Structure:
                    </h3>
                    
                    <AgeStructureGraph country = {this.state.country} />
                    
                </div>
            </div>
                
            </div>
        )
    }
}

export default CountryDetails;