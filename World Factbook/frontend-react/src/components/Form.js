import React, { Component } from 'react'
import "../css/StyleForm.css"
import globe from "../Images/globe.png"

export default class Form extends Component {
  render() {
    return (
      <div class="classs">
            <div class="logo"> 
                <img src={globe}/>
            </div>
<div class="wrapper">
  <div class="contact-form">
    <div class="input-fields">
      <input type="text" class="input" placeholder="Name" />
      <input type="text" class="input" placeholder="Email Address" />
      <input type="text" class="input" placeholder="Phone" />
      <input type="text" class="input" placeholder="Subject" />
    </div>

    <div class="msg">
    <textarea placeholder="Message"></textarea>
    <div class="btn1">
        <i class="fa fa-paper-plane-o fa-2x send" aria-hidden="true"></i>
        <i class="fa fa-paper-plane-o fa-2x send2" aria-hidden="true"></i>
        <a href="../Homepage" ><p>send</p></a>
    </div>
    </div>
  </div>
</div>

      </div>
    )
  }
}


