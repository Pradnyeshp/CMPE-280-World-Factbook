import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/countrylist.css';
import {Link} from "react-router-dom";

class CountryList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            areaData: []
        }
    }

    componentWillMount() {
        let url = 'http://localhost:3001/area';
        axios.get(url)
            .then(response=>{
                console.log(response.data.data);
                this.setState({
                    areaData : response.data.data
                })
            })
    }

    render() {
        let topTenCountryListToShow = null;
        topTenCountryListToShow = this.state.areaData.map((a)=>{
            return (
                <tr key={a.country}>
                    <td>
                        <Link to={`/getcountry/${a.country}`}>{a.country}</Link>
                    </td>
                </tr>
            )
        });

        return(
            <div className="CountryList">
                <Navbar/>
                <div className="container">
                    <div className="countryblock">
                        <h1 >
                            Country List
                        </h1>
                        <table style={{fontSize: "20px"}}>
                            {topTenCountryListToShow}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default CountryList;