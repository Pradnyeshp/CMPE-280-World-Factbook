import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import '../css/graphStyle.css';
import globe from "../Images/globe.png"


class Navbar extends Component {

    constructor() {
        super();

        this.state = ({
            searchText : ''
        });

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state);
    };

    handleSearch = (e) => {
        e.preventDefault();
        console.log("Search Button Clicked");
        // let data = this.state.searchText;
        // this.props.history.push('http:localhost:3000/getcountry/'+ data);
        // console.log(data);
        // let url = 'http:' ;
        // axios.post(url, data)
        //     .then( (response) => {
        //         console.log(response.data())
        //     })
    };

    render() {
        const styleNavbar = {
            color : "white"
        }
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="logo">
                        <img style={{ width: "50px" , height: "auto" , marginRight: "15px"}} src={globe}/>
                    </div>
                    <Link className="navbar-brand" to="/">The World Factbook</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/homepage">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/countrylist">List of Countries</a>
                            </li>
                        </ul>
                        <form className="form-inline my-lg-6 my-lg-6">
                            <input style={styleNavbar} className="form-control mr-sm-3 bg-dark" type="search"
                                   placeholder="Search by Country" name="searchText"
                                   aria-label="Search" onChange={this.handleChange}/>
                                <Link className="btn btn-outline-success my-2 my-sm-0"
                                        to={`/getcountry/${this.state.searchText}`} >
                                    Search
                                </Link>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;
