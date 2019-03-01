import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../css/CardStyle.css';
import '../css/graphStyle.css'


class Categories extends Component {

    constructor() {
        super();
        this.state = {
            geography: "Please click on each link to explore more insights on geographical aspects.",
            energy: "We will add links here shortly, Please explore Area in Georgraphy as of now.",
            peopleandsociety: "We will add links here shortly, Please explore Area in Georgraphy as of now.",
            transportation: "We will add links here shortly, Please explore Area in Georgraphy as of now.",
            economy: "We will add links here shortly, Please explore Area in Georgraphy as of now.",
            communications: "We will add links here shortly, Please explore Area in Georgraphy as of now.",
            acceptedDivs: ["geography", "energy", "peopleandsociety", "economy", "transportation", "communications"]
        }
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }

    mouseOver(event) {
        let divId = event.target.id.toString();
        if(this.state.acceptedDivs.includes(divId)) {
            let p = document.createElement("p");
            p.setAttribute("id", "tempParagraph");
            p.style.fontSize = "15px";
            let paragraphText = document.createTextNode(this.state[divId]);
            p.appendChild(paragraphText);
            document.getElementById(divId).appendChild(p);
        }
    }

    mouseOut(event) {
        let divId = event.target.id.toString();
        if(this.state.acceptedDivs.includes(divId)) {
            let p = document.getElementById("tempParagraph");
            document.getElementById(divId).removeChild(p);
        }
    }

    render() {

        return(
            <div>
                <div className="container small">
                    <div className='categories'>
                        <h1>Categories</h1>
                    </div>

                    <br/>
                    <div className="card text-white bg-dark mb-3">
                        <div 
                            id = "geography" 
                            className="card-body" 
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}>
                            
                            <h4 className="card-title">Geography</h4>
                            <Link to={`/area`} style={{fontSize : "18px"}} >
                                <span>Area</span></Link>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div id = "peopleandsociety" 
                            className="card-body"
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}>
                            <h4 className="card-title">People and Society</h4>
                            {/* <Link to={`/population`} >
                                <span>Population</span></Link>
                            <link /> */}
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div id = "economy" className="card-body" 
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}>
                            <h4 className="card-title">Economy</h4>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div id="energy" className="card-body" 
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}>
                            <h4 className="card-title">Energy</h4>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div id="transportation" className="card-body"
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}>
                            <h4 className="card-title">Transportation</h4>
                        </div>
                    </div>
                    <div className="card text-white bg-dark mb-3">
                        <div id="communications" className="card-body" 
                            onMouseOver={this.mouseOver}
                            onMouseOut={this.mouseOut}>
                            <h4 className="card-title">Communications</h4>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Categories;
