import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

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
        let data = this.state.searchText;
        console.log(data);
        let url = '' ;
        axios.post(url, data)
            .then( (response) => {
                console.log(response.data())
            })
    };

    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">The World Factbook</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        <form className="form-inline my-lg-6 my-lg-6">
                            <input className="form-control mr-sm-3 bg-dark" type="search"
                                   placeholder="Search by Country" name="searchText"
                                   aria-label="Search" onChange={this.handleChange}/>
                                <button className="btn btn-outline-success my-2 my-sm-0"
                                        type="submit" onClick={this.handleSearch}>
                                    Search
                                </button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;
