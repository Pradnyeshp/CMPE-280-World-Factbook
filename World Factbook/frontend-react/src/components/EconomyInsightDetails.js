import React, { Component } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/economyInsightDetails.css';
import ranking1 from "../Images/ranking1.jpg";
import growthchart from "../Images/growthchart.png";
import geograph from "../Images/geograph.png";
import MilitaryEd from "../Images/MilitaryEd.jpg";
import {Link} from "react-router-dom";
import CountryHeader from './CountryHeader.js';
import gdpgnp from "../Images/gdpgnp.jpeg"


// class EconomyInsightsDetails extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             country: '',
//             //country: this.props.match.params.country.toUpperCase(),
//             introduction: '',
//             area: [],
//             age_structure:[],
//             climate: '',
//             population: ''
//         }
//     }

class EconomyInsightsDetails1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country : '',
            country:'',
            populationArray : [] ,
            areaData : []
        }
    }

    componentWillMount() {
        this.loadEconomyInsightsDetails( this.state.country );
        console.log(this.props);
        this.setState({
            country : this.props.match.params.country
        })
        console.log(this.props.match.params.country);


    }

    componentWillReceiveProps(nextProps, nextContext) {
        // // if(nextProps.match.params.country !== this.state.country) {
        // //     this.setState({
        // //         country: nextProps.match.params.country
        // //     })
        // // }
        // this.setState({
        //     country : nextProps.match.params.country.toUpperCase()
        // });
        // this.loadEconomyInsightsDetails(nextProps.match.params.country );
        // console.log("In dashboard componentWillReceiveProps nextprops",nextProps.countryName);
        // console.log("In dashboard componentWillReceiveProps current props",this.state.country);
        // if(nextProps.countryName.toLowerCase() !== this.state.country.toLowerCase()) {
        //     this.setState({
        //         country: nextProps.countryName.toLowerCase()
        //     })
        // }
    }

    loadEconomyInsightsDetails(country) {
        // console.log("in country details page");
        // console.log("country length : ", country.length );
        // if( country === ""  || country.length === 0 ){
        //     swal("Please enter some search criteria" , "try with different keyword", "error");
        //     this.props.history.push('/dashboard/india');
        // }
        // else {
        //     //let api = url+'/economyinsightdetails';
        //     let api = url+'/getcountry/'+country;
        //     axios.get(api)
        //         .then((response)=>{
        //             if(response.data.message === 'error') {
        //                 swal(response.data.data, "try with different keyword", "error");
        //                 this.props.history.push('/dashboard/india');
        //             } else {
        //                 //console.log(response.data.data);
        //                 this.setState({
        //                     //introduction: response.data.data.introduction,
        //                     // area: response.data.data.area,
        //                     // age_structure: response.data.data.age_structure,
        //                     // climate: response.data.data.climate,
        //                     // population: response.data.data.population
        //                 })
        //             }
        //         })
        // }

    }

    // createDynamicURL(){
    //     console.log("custom url")
    //     return `/dashboard/${this.state.country}`;
    // }



    render() {

      

        return (
            <div className="EconomyInsightsDetails"> 
                <Navbar/>
                <div className="breadcrumbs" >
                    <nav aria-label="breadcrumb" >
                        <ol className="breadcrumb" style={{paddingLeft : '3%', marginBottom : '0'}}>
                            <Link to = {{pathname: '/'}}>
                                <li className="breadcrumb-item">Home</li>
                            </Link>
                            &nbsp;
                            <li>>></li>
                            &nbsp;
                            <Link to = {{pathname: '/dashboard/'+this.state.country}}>
                                <li class="breadcrumb-item">Dashboard</li>
                            </Link>
                            &nbsp;
                            <li>>></li>
                            &nbsp;
                            <li className="breadcrumb-item active" aria-current="page">Economy Insights</li>
                        </ol>
                    </nav>
                </div>
                <div className='row'>
                    <div id='MoreEnergyInsightsCountryHeader'>
                        <CountryHeader country={this.state.country}/>
                    </div>
                </div>
                <div className="container">
                    <div id="carousel1">
                        <div class="bd-example">
                            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={ranking1} class="d-block w-100" alt="..." height={ 450 } width={ 600}/>
                                    <div class="carousel-caption d-none d-md-block" >
                                    <h4 style={{ color: 'black' }}>Country Standings</h4>
                                    <h5 style={{ color: 'black' }}><p style={{textAlign:"center"}}>Featuring a table of all the top countries in Economy Sector</p></h5>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src={growthchart} class="d-block w-100" alt="..." height={ 450 } width={ 600}/>
                                    <div class="carousel-caption d-none d-md-block">
                                    <h4 style={{ color: 'black' }}>All in one Economy Chart</h4>
                                    <h5 style={{ color: 'black' }}><p style={{textAlign:"center"}}>Featuring a comparison between growth/fall of different categories in Economy</p></h5>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src={geograph} class="d-block w-100" alt="..." height={ 450 } width={ 600}/>
                                    <div class="carousel-caption d-none d-md-block">
                                    <h4 style={{ color: 'black' }}>Insights through GeoGraph</h4>
                                    <h5 style={{ color: 'black' }}><p style={{textAlign:"center"}}>Get Insights of Economy through Geographs</p></h5>
                                    </div>
                                </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="details1">
                        <h6>
                        <p><h3> Things to look out for:</h3> </p>
                        <p>So, in the previous "Economic Insights" graph the GDP growth rate vs Unemployment graph clearly indicates that as and when the Unemployment decreases, the growth rate increases for that particular year which clearly indicates that there is an indirect relation between both these factors.
                        This relationship is usually referred to as Okun's law. According to Okun's law, a 1 percent decrease in GDP has been associated with a slightly less than 2-percentage-point increase in the unemployment rate.</p>
                        </h6>
                        <p><h6>Lets see some other statistics that contribute to the economy of a country ---->> </h6></p>
                        <p className="EconomyInsightsDetails">
                            
                        </p>
                    </div>
                    <div id="graphAgeStructure">
                        <div class="card" style={{'width': '30%','height':'5%'}}>
                            <img class="card-img-top" src={gdpgnp} alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">GDP-GNI Graph</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to = {{pathname: '/economyinsightdetails2/'+this.state.country}}><a href="#" class="btn btn-primary">Go </a></Link>
                            </div>
                        </div>
                        <div class="card" style={{'width': '30%','height':'5%'}}>
                            <img class="card-img-top" src={MilitaryEd} alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">Military-Education Graph</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to = {{pathname: '/economyinsightdetails1/'+this.state.country}}><a href="#" class="btn btn-primary">Go </a></Link>
                            </div>
                        </div>
                    </div>
                    <div id="population1">
                        <h3>
                            Country Standing:
                        </h3>
                        <table class="table table-sm table-dark">
                            <thead>
                                <tr>
                                <th scope="col">No</th>
                                <th scope="col">Country</th>
                                <th scope="col">GDP value</th>
                                <th scope="col">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-info">
                                <th scope="row">1</th>
                                <td>USA</td>
                                <td>9000</td>
                                <td>2018</td>
                                </tr>
                                <tr class="bg-info">
                                <th scope="row">2</th>
                                <td>China</td>
                                <td>8700</td>
                                <td>2018</td>
                                </tr>
                                <tr class="bg-info">
                                <th scope="row">3</th>
                                <td>Australia</td>
                                <td>8500</td>
                                <td>2018</td>
                                </tr>
                                <tr class="bg-info">
                                <th scope="row">4</th>
                                <td>Russia</td>
                                <td>8400</td>
                                <td>2018</td>
                                </tr>
                                <tr class="bg-info">
                                <th scope="row">5</th>
                                <td>Austria</td>
                                <td>8000</td>
                                <td>2018</td>
                                </tr>
                                <tr class="table-light">
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                                <tr class="table-light">
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                                <tr class="table-light">
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                                <tr class="bg-info">
                                <th class="bg-success" scope="row">10</th>
                                <td class="bg-success">India</td>
                                <td class="bg-success">6900</td>
                                <td class="bg-success">2018</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* <div id="climate1">
                        <h3>
                            Climate:
                        </h3>
                        <p className="EconomyInsightsDetails">
                            {this.state.climate}
                        </p>
                    </div> */}
                    <br/>
                    <br/>                    
                </div>
                {/* <div className="footer"> <p>This footer will always be positioned at the bottom of the page, but </p></div> */}
            </div>
            
            
        )
    }
}

export default EconomyInsightsDetails1;