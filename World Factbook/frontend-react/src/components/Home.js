import React, {Component} from 'react';
import '../css/CardStyle.css';
import Dashboard from "./Dashboard";
import swal from "sweetalert" ;
import axios from 'axios';
import url from '../url.js';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: this.props.match.params.country.toLowerCase()
        }
    }

    componentWillMount() {
        this.checkIfCountryPresent(this.props.match.params.country.toLowerCase());
    }

    async checkIfCountryPresent(countryName) {
        console.log("checkIfCountryPresent", countryName);
        if( countryName === ""  || countryName.length === 0 ){
            swal("Please enter some search criteria" , "try with different keyword", "error");
            this.props.history.push('/dashboard/india');
        }
        else {
            let api = url+`/getcountry-for-dashboard/${countryName}`;
            let response = await axios.get(api);
            console.log("checkIfCountryPresent", response.data.message)
            if(response.data.message === 'error') {
                swal(response.data.data, "try with different keyword", "error")
                .then(()=>{
                    window.location.href = '/dashboard/india';
                })
                // this.props.history.push('/getcountry/'+countryName);
                
            } else {
                this.setState({
                    country: countryName
                })
            }
                // .then((response)=>{
                //     console.log("checkIfCountryPresent", response.data.message)
                //     if(response.data.message == 'error') {
                //         swal(response.data.data, "try with different keyword", "error");
                //         this.props.history.push('/dashboard/india');
                //     } else {
                //         console.log(response.data.data);
                //         this.setState({
                //             country: countryName
                //         })
                //     }
                // })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        
        if(nextProps.match.params.country.toLowerCase() !== this.state.country.toLowerCase()) {
            this.checkIfCountryPresent(nextProps.match.params.country.toLowerCase());
            //console.log("In home componentWillReceiveProps nextprops",nextProps.match.params.country);
            //console.log("In home componentWillReceiveProps current props",this.state.country);
        }
    }

    
    render() {
        
        return(
            <div>
                <Dashboard countryName={this.state.country}/>
                {/* <br/>
                <br/>
                <br/>
                <br/> */}
            </div>
        )
    }
}

export default Home;
