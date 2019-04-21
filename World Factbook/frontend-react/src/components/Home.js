import React, {Component} from 'react';
import Navbar from "./Navbar";
// import {Link} from "react-router-dom";
import '../css/CardStyle.css';
import Categories from "./Categories";
import Dashboard from "./Dashboard";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            country: 'india'
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("In home componentWillReceiveProps nextprops",nextProps.match.params.country);
        console.log("In home componentWillReceiveProps current props",this.state.country);
        if(nextProps.match.params.country.toLowerCase() !== this.state.country.toLowerCase()) {
            this.setState({
                country: nextProps.match.params.country.toLowerCase()
            })
        }
    }

    render() {

        return(
            <div>
                <Dashboard countryName={this.state.country}/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default Home;
