import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/countrylist.css';
import {Link} from "react-router-dom";
import url from '../url.js';
import CountryListTable from './CountryListTable.js';

class CountryList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            areaData: [],
            col1: [],
            col2: [],
            col3: [],
            col4: []
        }
    }

    componentDidMount() {
        let api = url+'/area';
        axios.get(api)
            .then(response=>{
                // console.log(response.data.data);
                let array = response.data.data;
                let array1 = [];
                let array2 = [];
                let array3 = [];
                let array4 = [];
                for(let i=0; i <= array.length; i++) {
                    if(i <= 64) {
                        array1.push(array[i]);
                    } else if(i >= 65 && i < 130) {
                        array2.push(array[i]);
                    } else if(i >= 130 && i < 195) {
                        array3.push(array[i]);
                    } else 
                        array4.push(array[i]);
                }

                // console.log('array1', array1);
                // console.log('array2', array2);
                // console.log('array3', array3);
                // console.log('array4', array4);
                this.setState({
                    areaData : response.data.data,
                    col1: array1,
                    col2: array2,
                    col3: array3,
                    col4: array4,
                })
            })
    }

    render() {
        
        return(
            <div className="CountryList">
                <Navbar/>
                {/* <div className="container"> */}
                    <div className="countryblock">
                       
                        <CountryListTable array={this.state.col1} />
                        
                        <CountryListTable array={this.state.col2} />

                        <CountryListTable array={this.state.col3} />

                        <CountryListTable array={this.state.col4} />
                    </div>
                {/* </div> */}
            </div>
        )
    }
}


export default CountryList;