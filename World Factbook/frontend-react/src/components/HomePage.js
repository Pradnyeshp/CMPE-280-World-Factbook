import React, {Component} from 'react';
import "../css/style.css"
import globe from "../Images/globe.png"
import Can from "../components/can"


class Main extends Component {

    constructor() {
        super();
        this.state = {} ;
    }
    

    render() {
        return(
            <div className="classs">
                <header>
                    <div className="main">
                        <div className="logo">
                            <img src={globe}/>
                        </div>
                        <ul className="menu">
                            <li className="menu_item">
                                <a href="#"> Home</a>
                            </li>
                            <li className="menu_item">
                                <a href="#"> Things to do</a>
                                <ul className="submenu">
                                    <li className="submenu_item"><a href="#">Features </a></li>
                                    {/*<li className="submenu_item"><a href="#">Compare Countries</a></li>*/}
                                    <li className="submenu_item"><a href="#">Download Map</a></li>
                                </ul>
                            </li>
                            <li className="menu_item">
                                <a href="#"> Contibutors </a>
                                <ul className="submenu">
                                    <li className="submenu_item"><a href="#">Venkatesh</a></li>
                                    <li className="submenu_item"><a href="#">Pradnyesh</a></li>
                                    <li className="submenu_item"><a href="#">Abhishek</a></li>
                                    <li className="submenu_item"><a href="#">Nikhil</a></li>
                                </ul>
                            </li>
                            <li className="menu_item"><a href="#"> Want to Know More?</a>
                                <ul className="submenu">
                                    <li className="submenu_item">
                                        <a href="#">Click Let's Go</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                
                    <br/>
                    <br/>
                    <br/>
                <div>
                    <Can />
                </div>
                <div className="title">
                    <h1>World FactBook</h1>
                </div>
                <div className="button1">
                    <a href="../Form" className="btn2">First Time ?</a>
                    <a href="./dashboard/india" className="btn2">Let's Go</a>
                </div>
                
                
                {/* <div class="title1">
                    <h1>HTML Canvas 5 Animation</h1>
                    <canvas id="canvas" width="1400" height="200"></canvas>

                    {/* <script type = "text/javascript"></script> */}
                {/* </div> */} 

                </header>
            </div>
            )
    }
}

export default Main;
