import React, { Component } from 'react'
import "../css/StyleForm.css"
import globe from "../Images/globe.png"
import swal from "sweetalert" ;

export default class Form extends Component {

    constructor(props){
        super(props);
        this.state = {

        }

    }

    handleRegister(e) {
        e.preventDefault();
        swal("Registered Successfully",'','success')
            .then((response)=>{
                window.location.href = 'http://localhost:3000/Homepage';
            });


    }

    render() {

    return (
      <div class="classs">
            <div class="logo"> 
                <img src={globe}/>
            </div>
        <div class="wrapper">
            <div className='container small'>
                <h3 className='registerHeader'>Register for the Updates</h3>
                <br/>
                <div className="contact-form">

                    <br/>
                    <div className="input-fields">
                        <input type="text" className="input" placeholder="First Name"/>
                        <input type="text" className="input" placeholder="Last Name"/>
                        <input type="text" className="input" placeholder="Email Address"/>
                        <input type="text" className="input" placeholder="Phone"/>
                    </div>

                    <div className="msg">
                        {/*<textarea placeholder="Message"></textarea>*/}
                        <div className="btn1" onClick={this.handleRegister}>
                            <i className="fa fa-paper-plane-o fa-2x send" aria-hidden="true"></i>
                            <i className="fa fa-paper-plane-o fa-2x send2" aria-hidden="true"></i>
                            <a href="../Homepage" ><p>Register</p></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    )
  }
}


