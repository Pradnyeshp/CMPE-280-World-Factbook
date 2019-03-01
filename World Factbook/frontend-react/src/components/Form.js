import React, { Component } from 'react'
import "../css/StyleForm.css"
import globe from "../Images/globe.png"
import swal from "sweetalert" ;

export default class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            errorFlag: true,
            error: "",
            email: "",
            lastname: ""
        }
        
        this.handleRegister = this.handleRegister.bind(this);
        this.validateFirstNameAndLastName = this.validateFirstNameAndLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleRegister(e) {
        e.preventDefault();
        swal("Registered Successfully",'','success')
            .then((response)=>{
                window.location.href = 'http://localhost:3000/Homepage';
            });

    }


    validateFirstNameAndLastName(event) {
        event.preventDefault();
        //console.log(event.target.value);
        let regex = /\d/g;
        let ans = event.target.value.search(regex);
        if(ans >=0) {
            this.setState({
                errorFlag: false,
                error: "Sorry!, Digits are not allowed.",
                [event.target.id]: event.target.value
            })
            
        } else {
            this.setState({
                errorFlag: true,
                error: "",
                [event.target.id]: event.target.value
            })
        }
    }

    validateEmail(event) {
        event.preventDefault();
        let regex = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+/g;
        let ans = event.target.value.search(regex);
        if(ans >= 0 || event.target.value === "") {
            this.setState({
                errorFlag: true,
                error: "",
                [event.target.id]: event.target.value
            })
            
        }
        else {
            this.setState({
                errorFlag: false,
                error: "Sorry! Invalid email address.",
                [event.target.id]: event.target.value
            })
            
        }
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
                        <input type="text" className="error" hidden={this.state.errorFlag} value = {this.state.error}/>
                        <input id = "firstname" type="text" className="input" placeholder="First Name" value={this.state.firstname} onChange={this.validateFirstNameAndLastName}/>
                        <input id = "lastname" type="text" className="input" placeholder="Last Name" value={this.state.lastname} onChange={this.validateFirstNameAndLastName}/>
                        <input id = "email" type="text" className="input" placeholder="Email Address" value={this.state.email} onChange={this.validateEmail}/>
                        
                        <input type="text" className="input" placeholder="Phone"/>
                        <div id="maleDiv">
                            <input id = "male" type="radio"  value="male" /><span> Male</span><br/>
                        </div>

                        <div id="femaleDiv">
                            <input id = "female" type="radio"  value="female" /><span> Female</span><br/>
                        </div>

                        <div id="otherDiv">
                            <input id = "other" type="radio"  value= "other" /><span> Other</span><br/>
                        </div>
                        
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


