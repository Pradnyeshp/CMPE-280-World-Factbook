import React, {Component} from 'react';
import Navbar from "./Navbar";

class Population extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Navbar/>
                <br/>
                <br/>
                <div className="container small">
                    <h1>Population Page</h1>
                </div>

            </div>
        )
    }
}

export default Population;
