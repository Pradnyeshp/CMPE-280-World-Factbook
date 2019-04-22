import React, {Component} from 'react';
import Navbar from "./Navbar";
import PopulationGraph from "./PopulationGraph";
import EnergyGraph from './EnergyGraph';
import AgeStructureGraph from './AgeStructureGraph';
import EconomyGraph from './EconomyGraph';
import YouthLiteracyGraph from "./YouthLiteracyGraph";
import '../css/style.css';


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

        // let countryName = this.state.country ;
        // countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

        return(
            <div>
                <Navbar/>
                <div className="dashboard" style={ {marginLeft : "50px" , marginRight : "50px"}}>
                    <h1 className="countryHeader">{this.state.country.toUpperCase()}</h1>
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
                        <div className= 'col-md-6 graphEconomy' style={{paddingRight : "0", paddingLeft : "0", width :"770px"}}>
                            <br/>
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

                </div>

            </div>
        )
    }
}

export default Dashboard;
