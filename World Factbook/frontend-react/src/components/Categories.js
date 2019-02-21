import React, {Component} from 'react';
// import Navbar from '../components/Navbar';
import '../css/filter.css';
import axios from 'axios';
import Navbar from "./Navbar";
import {Link} from "react-router-dom";
import '../App.css';
import {api} from '../store/actions';
import Pagination from './Pagination';
import {DeleteMovieFunc} from '../store/actions';
import {connect} from 'react-redux';

class Filter extends Component {

    constructor() {
        super();
    }

    render() {

        console.log("state in Render : ", this.state);
        // const styleForLiA = {
        //     float: "right",
        //     display: "block",
        //     color: "#000",
        //     textAlign: "center",
        //     padding: "10px 15px",
        //     textDecoration: "none",
        // };
        // const styleForButton = {
        //     float: 'right',
        //     height: "50px",
        //     marginRight: '19%'
        // };
        // const styleForApplyFilter = {
        //     float:'right',
        //     marginRight : '12px',
        //     height: '50px'
        // };
        // const genreStyle = {float: 'left', marginRight: '25px'};
        // const MPAAStyle = {
        //     paddingTop: '10px',
        //     paddingBottom: '10px',
        //     marginRight: '10px'
        // };

        return(
            <div>
                <h1>Hello World</h1>
            </div>
        )

    }
}

export default Categories;
