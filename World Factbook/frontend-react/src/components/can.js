import React, { Component } from 'react'
import "../css/style.css"
import Background from '../Images/world-map.png';

// var sectionStyle = {
//     //width: "100%",
//     //height: "400px",
//     backgroundImage: `url(${Background})`
//   };

class Can extends Component {
  constructor(props){
      super(props);
  }

          render() {
            var img = new Image();

            // User Variables - customize these to change the image being scrolled, its
            // direction, and the speed.
            //backgroundImage: `url(${Background})`
            img.src = 'https://www.techwench.com/wp-content/uploads/2012/02/world-map.png';
            
            var CanvasXSize = 1500;
            var CanvasYSize = 2;
            var speed = 10; // lower is faster
            var scale = 0.2;
            var y = -1.5; // vertical offset
            
            // Main program
            
            var dx = 0.75;
            var imgW;
            var imgH;
            var x = 0;
            var clearX;
            var clearY;
            var ctx;
            
            img.onload = function() {
                imgW = img.width * scale;
                imgH = img.height * scale;
                
                if (imgW > CanvasXSize) {
                    // image larger than canvas
                    x = CanvasXSize - imgW;
                }
                if (imgW > CanvasXSize) {
                    // image width larger than canvas
                    clearX = imgW;
                } else {
                    clearX = CanvasXSize;
                }
                if (imgH > CanvasYSize) {
                    // image height larger than canvas
                    clearY = imgH;
                } else {
                    clearY = CanvasYSize;
                }
                
                // get canvas context
                ctx = document.getElementById('HTMLcanvas').getContext('2d');
                // set refresh rate
                return setInterval(draw, speed);
            }
            
            function draw() {
                ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
                
                // if image is <= Canvas Size
                if (imgW <= CanvasXSize) {
                    // reset, start from beginning
                    if (x > CanvasXSize) {
                        x = -imgW + x;
                    }
                    // draw additional image1
                    if (x > 0) {
                        ctx.drawImage(img, -imgW + x, y, imgW, imgH);
                    }
                    // draw additional image2
                    if (x - imgW > 0) {
                        ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
                    }
                }
            
                // image is > Canvas Size
                else {
                    // reset, start from beginning
                    if (x > (CanvasXSize)) {
                        x = CanvasXSize - imgW;
                    }
                    // draw aditional image
                    if (x > (CanvasXSize-imgW)) {
                        ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
                    }
                }
                // draw image
                ctx.drawImage(img, x, y,imgW, imgH);
                // amount to move
                x += dx;
            }
   return (
    
    //</section>
      <div>
         
        <div class="title1">
                    {/* <h1>HTML Canvas 5 Animation</h1> */}
                    <canvas id="HTMLcanvas" width="600" height="100"></canvas>
                    {/* <section style={ sectionStyle } /> */}

                    {/* <script type = "text/javascript"></script> */}
                </div>

      </div>
    )
  }
}

export default Can;
