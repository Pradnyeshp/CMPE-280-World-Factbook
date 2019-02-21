import React, {Component} from 'react';
import Navbar from "./Navbar";
// import {Link} from "react-router-dom";
import '../css/CardStyle.css';
import Categories from "./Categories";

class Home extends Component {

    constructor() {
        super();
    }

    render() {

        return(
            <div>
                <Navbar/>
                <br/>
                <Categories/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default Home;
