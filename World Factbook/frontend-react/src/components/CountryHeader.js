import React, { Component } from 'react';
import url from '../url.js';
import axios from 'axios';
import '../css/style.css';
import '../css/country-header.css';

class CountryHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fips_code: '',
            country: this.props.country
        }
    }

    componentDidMount() {
        this.getFipsCode(this.state.country);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.country !== this.props.country) {
           this.getFipsCode(nextProps.country.toLowerCase());
        }
    }
    
    getFipsCode(country) {
        let api = url + '/fips-code/getcountry/' + country;
        axios.get(api)
        .then((response) => {
            //console.log(response.data);
            if(response.data.message === 'success') {
                this.setState({
                    fips_code: response.data.data,
                    country: country
                });
            }
        });
    }

    render() {
        let image = null;
        if(this.state.fips_code !== '') {
            let image_source = `/images/flags/${this.state.fips_code}-flag.gif`;
            image = (
                <div className='countryFlag'>
                    <img src={image_source} alt="Flag">
                    </img>
                </div>
            );
        }
            

        
        return (
            <div className="headerCountryName">
                <div className='row' style={{marginLeft:'15px'}}>
                    <div className='countryHeader'>
                        <p>
                            {this.state.country.toUpperCase()}
                        </p>
                    </div>

                    {image}
                
                </div>
                
            </div>
        );
    }


    
   
}


export default CountryHeader;