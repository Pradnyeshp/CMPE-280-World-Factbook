import React, {Component} from 'react';
import axios from 'axios';
import url from '../url.js';
import GenericYearWiseEnergyGraph from './GenericYearWiseEnergyGraph';
import Navbar from './Navbar';
import '../css/more-insights-energy.css';
import CountryHeader from './CountryHeader.js';
import {Link} from "react-router-dom";

class MoreEnergyInsights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: (this.props.location.state.data.length === 0) ? [] : this.props.location.state.data,
            start: (this.props.location.state.start === '') ? '' : this.props.location.state.start,
            end: (this.props.location.state.end === '') ? '' : this.props.location.state.end,
            country: (this.props.location.state.country === '') ? '' : this.props.location.state.country,
            energy_consumption_data_by_sector: {},
            arrayOfYearsFromStartToEnd: [],
            year: ''
        }
    }

    componentDidMount() {
        //console.log(this.state);
        this.loadEnergyInsightsBySector();
        
    }

    loadEnergyInsightsBySector = async () => {
        let array = [];
        for(let i = parseInt(this.state.start); i <= parseInt(this.state.end); i++)
            array.push(i);
        let api = url + `/energy-data/consumption/${this.state.country}/${this.state.start}/${this.state.end}`;
        axios.get(api).then((response)=>{
            console.log(response.data);
            this.setState({
                energy_consumption_data_by_sector: response.data.data,
                arrayOfYearsFromStartToEnd: array
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    handleYearClick = (event) => {
        event.preventDefault();
        let year = event.target.value;
        this.setState({
            year: year
        });
    }

    render() {
        let finalArrayToShow = null;
        let graphToShow = (
            <GenericYearWiseEnergyGraph
               year = {this.state.start}
               dataForMainEnergyGraph = {this.state.data}
               dataForconsumptionBySectorGraph = {this.state.energy_consumption_data_by_sector}
           />
        );
        
        if(this.state.year !== '')
            graphToShow = (
                    <GenericYearWiseEnergyGraph
                       year = {this.state.year}
                       dataForMainEnergyGraph = {this.state.data}
                       dataForconsumptionBySectorGraph = {this.state.energy_consumption_data_by_sector}
                   />
            );

        if(this.state.arrayOfYearsFromStartToEnd.length === 0) 
            finalArrayToShow =  (
                <div className="MoreEnergyInsights">
                    <div>
                        <p>No data to show</p>
                    </div>
                </div>    
            );

        finalArrayToShow = this.state.arrayOfYearsFromStartToEnd.map((year) => {
            return (
                <button className="dropdown-item" type="button" value={year} key = {year} onClick={this.handleYearClick}>{year}</button>
            ); 
        });

        return (
            <div className="MoreEnergyInsights">

                <Navbar />

                <div className="breadcrumbs" >
                    <nav aria-label="breadcrumb" >
                        <ol className="breadcrumb" style={{paddingLeft : '3%', marginBottom : '0'}} >
                            {/* <li>You are here: </li> */}
                            <Link to = {{pathname: '/'}}>
                            <li className="breadcrumb-item">Home</li></Link>
                            &nbsp;
                            <li>>></li>
                            &nbsp;
                            <Link to = {{pathname: '/dashboard/'+this.state.country}}><li className="breadcrumb-item">Dashboard</li></Link>
                            &nbsp;
                            <li>>></li>
                            &nbsp;
                            <li className="breadcrumb-item active" aria-current="page">Energy Insights</li>
                        </ol>
                    </nav>
                </div>

                <div className='row firstRowEnergy'>
                    <div className="col-8" id='MoreEnergyInsightsCountryHeader'>
                        <CountryHeader country={this.state.country}/>
                    </div>

                    <div className="col-2 yearDropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Year
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            {finalArrayToShow}        
                        </div>
                    </div>
                </div>

                {graphToShow}

                <div className='moreInfo'>
                        <ul className='moreInfo-ul'>
                            <li>
                                Here we show two graphs, the first tells us about the consumption, demand and production of the energy of a paricular
                                year in last five to six years and the second tells us about the sector wise comparison in percentage of their consumption.
                            </li>
                            <li>
                                From the comparison, in first chart one can understand that if demand and consumption of energy is more than the production
                                of the energy by this country then definitely, this country is importing the energy in some form of resource.
                            </li>
                            <li>
                                The second graph shows the sector wise comparison, one can clearly see which sector required more consumption and then can
                                search further ways either to research on inside factors of that particular sector or explore other energy production ways.
                            </li>
                            <li>
                                This importing may result into indirectly affecting the economy of the entire country. From our research we found that the
                                economy of the country depends on below three factors:
                                    <ol className='moreInfo-ol'>
                                        <li>
                                            <p>Oil imports from other countries</p>
                                        </li>
                                        <li>
                                            <p>Gold deposits in the world bank</p>
                                        </li>
                                        <li>
                                            <p>Cash reserves in the world bank</p>
                                        </li>
                                    </ol>
                            </li>
                            <li>
                                Considering about mentioned factors, definitely, the energy factor is one of the important factor to be considered while
                                studying about the country.
                            </li>
                            <li id='moreDetailsOnEnergyInsights'>
                                <Link to={`/getcountry/${this.state.country}`}>
                                    More Details
                                </Link>
                            </li>
                            <br/>
                        </ul>

                        
                </div>
                <footer class="page-footer font-small special-color-dark pt-4">
                    <div class="footer-copyright text-center py-3" style={{backgroundColor: "rgb(52, 58, 63)"}}><h6 style={{ color: 'white' }}>© 2018 Copyright: The World Factbook by Team Ninja</h6></div>  
                </footer>
            </div>
        );
    }
}

export default MoreEnergyInsights;