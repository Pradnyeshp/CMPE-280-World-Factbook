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
            arrayOfYearsFromStartToEnd: []
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

    render() {
        let finalArrayToShow = null;

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
                <GenericYearWiseEnergyGraph
                    key = {year}
                    year = {year}
                    dataForMainEnergyGraph = {this.state.data}
                    dataForconsumptionBySectorGraph = {this.state.energy_consumption_data_by_sector}
                />
            ); 
        })
        return (
            <div className="MoreEnergyInsights">

                <Navbar />
                
                {finalArrayToShow}
            </div>
        );
    }
}

export default MoreEnergyInsights;