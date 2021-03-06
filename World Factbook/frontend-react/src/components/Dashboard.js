import React, {Component} from 'react';
import Navbar from "./Navbar";
import PopulationGraph from "./PopulationGraph";
import EnergyGraph from './EnergyGraph';
import AgeStructureGraph from './AgeStructureGraph';
import EconomyGraph from './EconomyGraph';
import YouthLiteracyGraph from "./YouthLiteracyGraph";
import '../css/style.css';
import {Link} from "react-router-dom";
import CountryHeader from './CountryHeader.js';


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
        //console.log("In dashboard componentWillReceiveProps nextprops",nextProps.countryName);
        //console.log("In dashboard componentWillReceiveProps current props",this.state.country);
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

        // let countryName = this.state.country ;
        // countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
        return(
            <div>
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
                            <li className="breadcrumb-item active" aria-current="page">
                                Dashboard
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="dashboard" style={ {marginLeft : "50px" , marginRight : "50px"}}>
                    {/* <div className='row'>
                        <h1 className="countryHeader">{this.state.country.toUpperCase()}</h1>
                    </div> */}
                    
                    <CountryHeader country={this.state.country} />

                    
                    <div className='row firstRow'>
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
                        <div className= 'col-md-6' >
                            {/*<p>Graph Here</p>*/}
                            {/*Write graph component here, and pass countryName as props*/}
                            <EconomyGraph country = {this.state.country}/>
                        </div>
                        <div className= 'col-md-3 ageGraph'>
                            <br/>
                            <p className="graphTitle">Age Insights</p>
                            <p className="graphSubtitle">Population by age groups</p>
                            {/*Write graph component here, and pass countryName as props*/}
                            <AgeStructureGraph country = {this.state.country} />
                        </div>

                        <div className= 'col-md-3 literacyGraph'>
                            <br/>
                            <p className="graphTitle">Literacy Insights</p>
                            <p className="graphSubtitle">Literacy by gender</p>
                            {/*Write graph component here, and pass countryName as props*/}
                            <YouthLiteracyGraph country = {this.state.country} />
                        </div>

                    </div>
                    <div className="moreDetailsDiv">
                        <Link to={`/getcountry/${this.state.country}`}>
                            More Details
                        </Link>
                    </div>
                </div>
                <br/>
                <br/>
                <div>
                <footer class="page-footer font-small special-color-dark pt-4">
                    <div class="footer-copyright text-center py-3" style={{backgroundColor: "rgb(52, 58, 63)"}}><h6 style={{ color: 'white' }}>© 2018 Copyright: The World Factbook by Team Ninja</h6></div>  
                </footer>
                </div>
            </div>
        )
    }
}

export default Dashboard;
