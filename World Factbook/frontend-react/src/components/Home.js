import React, {Component} from 'react';
import '../css/CardStyle.css';
import Dashboard from "./Dashboard";
import swal from "sweetalert" ;

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

    componentDidMount() {
        swal("Welcome to World FactBook!", "Search for new country using search box in navbar");
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
