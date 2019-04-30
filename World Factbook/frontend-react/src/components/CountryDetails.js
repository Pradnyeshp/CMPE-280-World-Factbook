import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import '../css/countrydetails.css';
import swal from 'sweetalert';
import AgeStructureGraph from './AgeStructureGraph';
import url from '../url.js';
import InfantMortalityRateGraph from './InfantMortalityRateGraph.js';
import UnemploymentRateGraph from './UnemploymentRateGraph.js';
import GenericSectorPercentageGraph from './GenericSectorPercentageGraph.js';
import CountryHeader from './CountryHeader.js';
import {Link} from 'react-router-dom';
import CountryMap from "./CountryMap";


class CountryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: this.props.match.params.country.toUpperCase(),
            introduction: '',
            area: [],
            age_structure:[],
            climate: '',
            population: '',
            employment_details: [],
            land_boundary_in_km: '',
            border_countries: '',
            natural_resources: '',
            nationality: '',
            language_spoken: '',
            religions: '',
            population_growth_rate: '',
            birth_rate: '',
            death_rate: '',
            net_migration_rate: '',
            infant_mortality_rate: [],
            literacy_rate: [],
            unemployment_rate: [],
            gdp_composition_by_sector: [],
            population_below_poverty_line: '',
            exports: '',
            imports: '',
            energy_production_latest_not_trend: '',
            energy_consumption_latest_not_trend: '',
            energy_imports_latest_not_trend: '',
            energy_exports_latest_not_trend: '',
            expenditures_data: []
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
        //console.log("in country details page");
        //console.log("country length : ", country.length );
        if( country === ""  || country.length === 0 ){
            swal("Please enter some search criteria" , "try with different keyword", "error");
            this.props.history.push('/dashboard/india');
        }
        else {
            let api = url+'/getcountry/'+country;
            axios.get(api)
                .then((response)=>{
                    if(response.data.message === 'error') {
                        swal(response.data.data, "try with different keyword", "error");
                        this.props.history.push('/dashboard/india');
                    } else {
                        console.log(response.data.data);
                        let country = response.data.data;
                        this.setState({
                            introduction: country.introduction,
                            area: country.area,
                            age_structure: country.age_structure,
                            climate: country.climate,
                            population: country.population,
                            employment_details: country.employment_details,
                            land_boundary_in_km: country.land_boundary_in_km,
                            border_countries: country.border_countries,
                            natural_resources: country.natural_resources,
                            nationality: country.nationality,
                            language_spoken: country.language_spoken,
                            religions: country.religions,
                            population_growth_rate: country.population_growth_rate,
                            birth_rate: country.birth_rate,
                            death_rate: country.death_rate,
                            net_migration_rate: country.net_migration_rate,
                            infant_mortality_rate: country.infant_mortality_rate,
                            literacy_rate: country.literacy_rate,
                            unemployment_rate: country.unemployment_rate,
                            gdp_composition_by_sector: country.gdp_composition_by_sector,
                            population_below_poverty_line: country.population_below_poverty_line,
                            exports: country.exports,
                            imports: country.imports,
                            energy_production_latest_not_trend: country.energy_production_latest_not_trend,
                            energy_consumption_latest_not_trend: country.energy_consumption_latest_not_trend,
                            energy_imports_latest_not_trend: country.energy_imports_latest_not_trend,
                            energy_exports_latest_not_trend: country.energy_exports_latest_not_trend,
                            expenditures_data: country.expenditures_data
                        })
                    }
                })
        }

    }

    


    render() {

        let introduction = null;
        if(this.state.introduction !== '') {
            introduction =  
                <div className="details">
                    <h3>
                        Introduction
                    </h3>
                    <p className="countryDetails">
                        {this.state.introduction}
                    </p>
                </div>;
        }

        let population = null;
        if(this.state.population !== '') {
            population = <div id="population">
                            <h3>
                                Population
                            </h3>
                            <p className="countryDetails">
                                {this.state.population}
                            </p>
                        </div>;
        }

        let climate = null;
        if(this.state.climate !== '') {
            climate = <div id="climate">
                        <h3>
                            Climate
                        </h3>
                        <p className="countryDetails">
                            {this.state.climate}
                        </p>
                    </div>;
        }

        let border_countries = null;
        if(this.state.border_countries !== '') {
            border_countries = 
                <div className="indicators border_countries">
                    <h3>
                        Border Countries
                    </h3>
                    <p className="countryDetails">
                        {this.state.border_countries}
                    </p>
                </div>;

        } 
        
        let land_boundary_in_km = null;
        if(this.state.land_boundary_in_km !== '') {
            land_boundary_in_km = <div className="indicators land_boundary_in_km">
                    <h3>
                        Land Boundary (km)
                    </h3>
                    <p className="countryDetails">
                        {this.state.land_boundary_in_km}
                    </p>

                </div>;
        }

        let natural_resources = null;
        if(this.state.natural_resources !== '') {
            natural_resources = <div className="indicators natural_resources">
                                    <h3>
                                        Natural Resources
                                    </h3>
                                    <p className="countryDetails">
                                        {this.state.natural_resources}
                                    </p>
                                </div>;

        }

        let nationality = null;
        if(this.state.nationality !== '') {
            nationality = <div className="indicators nationality">
                            <h3>
                                Nationality
                            </h3>
                            <p className="countryDetails">
                                {this.state.nationality}
                            </p>
                        </div>;
        }

        let language_spoken = null;
        if(this.state.language_spoken !== '') {
            language_spoken = <div className="indicators language_spoken">
                                <h3>
                                    Languages Spoken
                                </h3>
                                <p className="countryDetails">
                                    {this.state.language_spoken}
                                </p>
                            </div>;
        }

        let religions = null;
        if(this.state.religions !== '') {
            religions = <div className="indicators religions">
                            <h3>
                                Religions
                            </h3>
                            <p className="countryDetails">
                                {this.state.religions}
                            </p>
                        </div>;
        }

        let population_growth_rate = null;
        if(this.state.population_growth_rate !== '') {
            population_growth_rate = <div className="indicators population_growth_rate">
                                        <h3>
                                            Population Growth Rate
                                        </h3>
                                        <p className="countryDetails">
                                            {this.state.population_growth_rate}
                                        </p>
                                    </div>;
        }

        let birth_rate = null;
        if(this.state.birth_rate !== '') {
            birth_rate = <div className="indicators birth_rate">
                            <h3>
                                Birth Rate
                            </h3>
                            <p className="countryDetails">
                                {this.state.birth_rate}
                            </p>
                        </div>;
        }
         
        let death_rate = null;
        if(this.state.death_rate !== '') {
            death_rate = <div className="indicators death_rate">
                            <h3>
                            Death Rate
                            </h3>
                            <p className="countryDetails">
                                {this.state.death_rate}
                            </p>
                        </div>;
        }

        let net_migration_rate = null;
        if(this.state.net_migration_rate !== '') {
            net_migration_rate = <div className="indicators net_migration_rate">
                                    <h3>
                                        Net Migration Rate
                                    </h3>
                                    <p className="countryDetails">
                                        {this.state.net_migration_rate}
                                    </p>
                                </div>;
        }

        let population_below_poverty_line = null;
        if(this.state.population_below_poverty_line !== '') {
            population_below_poverty_line =  <div className="indicators population_below_poverty_line">
                                                <h3>
                                                Population below poverty line
                                                </h3>
                                                <p className="countryDetails">
                                                    {this.state.population_below_poverty_line}
                                                </p>
                                            </div>;
        }

        let _exports = null;
        if(this.state.exports !== '') {
            _exports = <div className="indicators exports">
                        <h3>
                            Exports
                        </h3>
                        <p className="countryDetails">
                            {this.state.exports}
                        </p>
                    </div>;
        }

        let imports = null;
        if(this.state.imports !== '') {
            imports = <div className="indicators imports">
                        <h3>
                        Imports
                        </h3>
                        <p className="countryDetails">
                            {this.state.imports}
                        </p>
                    </div>;
        }

        let energy_production_latest_not_trend = null;
        if(this.state.energy_production_latest_not_trend !== '') {
            energy_production_latest_not_trend = <div className="indicators energy_production_latest_not_trend">
                                                    <h3>
                                                    Energy Production
                                                    </h3>
                                                    <p className="countryDetails">
                                                        {this.state.energy_production_latest_not_trend}
                                                    </p>
                                                </div>;
        }

        let energy_consumption_latest_not_trend = null;
        if(this.state.energy_consumption_latest_not_trend !== '') {
            energy_consumption_latest_not_trend = <div className="indicators energy_consumption_latest_not_trend">
                                                    <h3>
                                                        Energy Consumption
                                                    </h3>
                                                    <p className="countryDetails">
                                                        {this.state.energy_consumption_latest_not_trend}
                                                    </p>
                                                </div>;
        }

        let energy_imports_latest_not_trend = null;
        if(this.state.energy_imports_latest_not_trend !== '') {
            energy_imports_latest_not_trend = <div className="indicators energy_imports_latest_not_trend">
                                                <h3>
                                                    Energy Imports
                                                </h3>
                                                <p className="countryDetails">
                                                    {this.state.energy_imports_latest_not_trend}
                                                </p>
                                            </div>;
        }

        let energy_exports_latest_not_trend = null;
        if(this.state.energy_exports_latest_not_trend !== '') {
            energy_exports_latest_not_trend = <div className="indicators energy_exports_latest_not_trend">
                                                <h3>
                                                    Energy Exports
                                                </h3>
                                                <p className="countryDetails">
                                                    {this.state.energy_exports_latest_not_trend}
                                                </p>
                                            </div>;
        }

        let age_structure = null;
        if(this.state.age_structure.length !== 0) {
            age_structure = <div id="graphAgeStructureCountryDetailsPage">
                                <h3>
                                    Age Structure
                                </h3>
                                
                                <AgeStructureGraph country = {this.state.country} />
                                
                            </div>;
        }
 
        return (
            <div className="CountryDetails">

                <Navbar/>

                <div className="breadcrumbs" >
                    <nav aria-label="breadcrumb" >
                        <ol className="breadcrumb" style={{paddingLeft : '3%', marginBottom : '0'}} >
                            {/*<li>You are here: </li>*/}
                            <Link to = {{pathname: '/'}}>
                            <li className="breadcrumb-item"> Home </li></Link>
                            &nbsp;
                            <li> >> </li>
                            &nbsp;
                            <Link to = {{pathname: `/dashboard/${this.state.country}`}}>
                            <li className="breadcrumb-item"> Dashboard </li></Link>
                            &nbsp;
                            <li> >> </li>
                            &nbsp;
                            <Link to = {{pathname: '/countrylist'}}>
                            <li className="breadcrumb-item" aria-current="page">
                                List of Countries
                            </li></Link>
                            &nbsp;
                            <li> >> </li>
                            &nbsp;
                            <li className="breadcrumb-item active" aria-current="page">
                                {this.state.country}
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="container">
                    
                    <CountryHeader country={this.state.country}/>

                    <div style={{marginLeft: "-15px" }}>
                        <CountryMap country = {this.state.country}/>
                    </div>

                    <div className='row'>
                    
                        {introduction}

                        {population}

                        {climate}

                        {language_spoken}

                        {religions}

                        {border_countries}

                        {land_boundary_in_km}

                        {nationality}

                        {natural_resources}

                        {population_growth_rate}

                        {birth_rate}

                        {death_rate}

                        {net_migration_rate}

                        {population_below_poverty_line}

                        {imports}

                        {_exports}

                        {energy_production_latest_not_trend}

                        {energy_consumption_latest_not_trend}

                        {energy_exports_latest_not_trend}

                        {energy_imports_latest_not_trend}

                    </div>

                    {age_structure}

                    <InfantMortalityRateGraph details={this.state.infant_mortality_rate} />
                
                    <GenericSectorPercentageGraph 
                        details = {this.state.employment_details} 
                        id = "employment_details_data" 
                        heading = "Employment by Sector"
                    />
                
                    <UnemploymentRateGraph details = {this.state.unemployment_rate} />

                    <GenericSectorPercentageGraph 
                        details = {this.state.expenditures_data} 
                        id = "expenditures_data" 
                        heading = "Expenditures by Sector"
                    />

                    <GenericSectorPercentageGraph 
                        details = {this.state.gdp_composition_by_sector} 
                        id = "gdp_by_sector_data" 
                        heading = "GDP Composition by Sector"
                    />


                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <footer class="page-footer font-small special-color-dark pt-4">
                    <div class="footer-copyright text-center py-3" style={{backgroundColor: "rgb(52, 58, 63)"}}><h6 style={{ color: 'white' }}>© 2018 Copyright: The World Factbook by Team Ninja</h6></div>  
                </footer>
            </div>
        )
    }
}

export default CountryDetails;