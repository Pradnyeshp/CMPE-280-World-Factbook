import React, {Component} from 'react';
import Navbar from "./Navbar";
import "../css/style.css"
import globe from "../Images/globe.png"


class Main extends Component {

    constructor() {
        super();
    }

    render() {

        return(
            <div class="classs">
                <header>
                    <div class="main">
                        <div class="logo"> 
                            <img src={globe}/>
                        </div>
                        <ul class="menu">
                            <li class="menu_item"><a href="#"> Home</a></li>
                            <li class="menu_item"><a href="#"> Things to do</a>
                                <ul class="submenu">
                                    <li class="submenu_item"><a href="#">Country Features </a></li>
                                    <li class="submenu_item"><a href="#">Compare Countries</a></li>
                                    <li class="submenu_item"><a href="#">Download Map</a></li>
                                </ul>
                            </li>
                            <li class="menu_item"><a href="#"> Contibutors</a>
                                <ul class="submenu">
                                    <li class="submenu_item"><a href="#">Venkatesh</a></li>
                                    <li class="submenu_item"><a href="#">Pradnyesh</a></li>
                                    <li class="submenu_item"><a href="#">Abhishek</a></li>
                                    <li class="submenu_item"><a href="#">Nikhil</a></li>
                                </ul>
                            </li>
                            <li class="menu_item"><a href="#"> Want to Know More?</a>
                                <ul class="submenu">
                                    <li class="submenu_item"><a href="#">Click Let's Go</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                <div class="title">
                    <h1>World FactBook</h1>
                </div>
                    <br/>
                    <br/>
                    <br/>

                <div class="button1">
                    <a href="../Form" class="btn2">First Time ?</a>
                    <a href="../Homepage" class="btn2">Let's Go</a>
                </div>
                </header>
            </div>
            )
    }
}

export default Main;
