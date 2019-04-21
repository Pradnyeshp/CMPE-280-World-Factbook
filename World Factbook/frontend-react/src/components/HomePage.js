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
        // var img = new Image();

        // // User Variables - customize these to change the image being scrolled, its
        // // direction, and the speed.
        
        // img.src = 'https://www.techwench.com/wp-content/uploads/2012/02/world-map.png';
        // var CanvasXSize = 900;
        // var CanvasYSize = 200;
        // var speed = 30; // lower is faster
        // var scale = 0.3;
        // var y = -1.5; // vertical offset
        
        // // Main program
        
        // var dx = 0.75;
        // var imgW;
        // var imgH;
        // var x = 0;
        // var clearX;
        // var clearY;
        // var ctx;
        
        // img.onload = function() {
        //     imgW = img.width * scale;
        //     imgH = img.height * scale;
            
        //     if (imgW > CanvasXSize) {
        //         // image larger than canvas
        //         x = CanvasXSize - imgW;
        //     }
        //     if (imgW > CanvasXSize) {
        //         // image width larger than canvas
        //         clearX = imgW;
        //     } else {
        //         clearX = CanvasXSize;
        //     }
        //     if (imgH > CanvasYSize) {
        //         // image height larger than canvas
        //         clearY = imgH;
        //     } else {
        //         clearY = CanvasYSize;
        //     }
            
        //     // get canvas context
        //     ctx = document.getElementById('canvas').getContext('2d');
         
        //     // set refresh rate
        //     return setInterval(draw, speed);
        // }
        
        // function draw() {
        //     ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
            
        //     // if image is <= Canvas Size
        //     if (imgW <= CanvasXSize) {
        //         // reset, start from beginning
        //         if (x > CanvasXSize) {
        //             x = -imgW + x;
        //         }
        //         // draw additional image1
        //         if (x > 0) {
        //             ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        //         }
        //         // draw additional image2
        //         if (x - imgW > 0) {
        //             ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        //         }
        //     }
        
        //     // image is > Canvas Size
        //     else {
        //         // reset, start from beginning
        //         if (x > (CanvasXSize)) {
        //             x = CanvasXSize - imgW;
        //         }
        //         // draw aditional image
        //         if (x > (CanvasXSize-imgW)) {
        //             ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        //         }
        //     }
        //     // draw image
        //     ctx.drawImage(img, x, y,imgW, imgH);
        //     // amount to move
        //     x += dx;
        // }
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
                    <a href="../Homepage" className="btn2">Let's Go</a>
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
