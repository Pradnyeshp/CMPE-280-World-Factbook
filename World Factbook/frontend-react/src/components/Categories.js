import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../css/CardStyle.css';
import '../css/graphStyle.css'


class Categories extends Component {

    constructor() {
        super();
    }

    render() {

        console.log("state in Render : ", this.state);

        return(
            <div>
                <div className="container small">
                    <div className=''>
                        <h1>Categories</h1>
                    </div>

                    <br/>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <h4 className="card-title">Geography</h4>
                            <Link to={`/area`} style={{fontSize : "18px"}} >
                                <span>Area</span></Link>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <h4 className="card-title">People and Society</h4>
                            {/* <Link to={`/population`} >
                                <span>Population</span></Link>
                            <link /> */}
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <h4 className="card-title">Economy</h4>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <h4 className="card-title">Energy</h4>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <h4 className="card-title">Transportation</h4>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div className="card-body">
                            <h4 className="card-title">Communications</h4>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Categories;
