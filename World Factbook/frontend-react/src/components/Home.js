import React, {Component} from 'react';
import Navbar from "./Navbar";

class Home extends Component {

    constructor() {
        super();
    }

    render() {

        return(
            <div>
                <Navbar/>
                <br/>
                <div className="container small">
                    <h1>Categories</h1>
                    <br/>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: "21rem", float : 'left', marginRight : '1.1em', marginBottom : '1.3em', height : '12rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">People and Society</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: "21rem", float : 'left', marginRight : '1.1em', height : '12rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Geography</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: "21rem", float : 'left', marginRight : '1.1em', height : '12rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Economy</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: "21rem", float : 'left', marginRight : '1.1em', height : '12rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Energy</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: "21rem", float : 'left', marginRight : '1.1em', height : '12rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Transpotation</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3" style={{maxWidth: "21rem", float : 'left', marginRight : '1.1em', height : '12rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Communications</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default Home;
