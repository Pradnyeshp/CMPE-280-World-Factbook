import React, {Component} from 'react';
import axios from 'axios';
import url from '../url.js';
import GenericYearWiseEnergyGraph from './GenericYearWiseEnergyGraph';
import Navbar from './Navbar';

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
        })
        return (
            <div className="MoreEnergyInsights">

                <Navbar />

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Year
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {finalArrayToShow}        
                    </div>
                </div>

                {graphToShow}
                
            </div>
        );
    }
}

export default MoreEnergyInsights;