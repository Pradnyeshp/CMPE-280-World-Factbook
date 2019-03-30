import React, { Component } from 'react'
import "../css/StyleForm.css"
import globe from "../Images/globe.png"
import swal from "sweetalert" ;
import {Link} from "react-router-dom" ;
import axios from 'axios';

export default class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            errorFlag: true,
            error: "",
            email: "",
            lastname: "",
            phone : "",
            errorEmailFlag: true,
            errorFnFlag: true,
            errorLnFlag: true,
            errorPhFlag: true,
            errorFn: "",
            errorLn: "",
            errorEmail: "",
            errorPh: "",
            errorFnHiddenFlag: "none",
            errorLnHiddenFlag: "none",
            errorPhHiddenFlag: "none",
            errorEmailHiddenFlag: "none",
            generalErrorFlag: "none"
        };
        
        this.handleRegister = this.handleRegister.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.postUsers = this.postUsers.bind(this);
    }

    handleRegister(e) {
        e.preventDefault();
        console.log("Register button clicked");
        console.log(this.state);
        console.log('firstname : ', this.state.firstname.length);
        if(this.state.firstname.length === 0 ||
            this.state.lastname.length === 0 ||
            this.state.email.length === 0 ||
            this.state.phone.length === 0 ||
            this.state.errorEmailFlag ||
            this.state.errorPhFlag ||
            this.state.errorFnFlag ||
            this.state.errorLnFlag ||
            this.state.errorFlag){
                console.log('atleast 1 condidtion statisfied');
                this.setState({
                    errorFlag: true,
                    generalErrorFlag: "block",
                    error: "Fill all valid details",
            });

        }
        else {
            this.setState({
                generalErrorFlag: "none",
                error: "",
                errorFlag: false
            });
            swal("Registered Successfully",'','success')
                .then((response)=>{
                    window.location.href = 'http://localhost:3000/Homepage';
                });
        }

    }



    validateFirstName(event) {
        event.preventDefault();
        //console.log(event.target.value);
        let regex = /[^a-zA-Z]/;
        let ans = event.target.value.search(regex);
        if(ans >=0) {
            this.setState({
                errorFlag: true,
                errorFn: "Please enter valid first name.",
                [event.target.id]: event.target.value,
                errorFnFlag: true,
                errorFnHiddenFlag: "block",
                generalErrorFlag: "block"
            })
            
        } else {
            this.setState({
                errorFlag: false,
                errorFn: "",
                [event.target.id]: event.target.value,
                errorFnFlag: false,
                errorFnHiddenFlag: "none",
                generalErrorFlag: "none"
            })
        }
    }



    validateLastName(event) {
        event.preventDefault();
        //console.log(event.target.value);
        let regex = /[^a-zA-Z]/;
        let ans = event.target.value.search(regex);
        if(ans >=0) {
            this.setState({
                errorFlag: true,
                errorLnHiddenFlag: "block",
                errorLn: "Please enter valid last name.",
                [event.target.id]: event.target.value,
                errorLnFlag: true,
                generalErrorFlag: "block"
            })

        } else {
            this.setState({
                errorFlag: false,
                errorLnHiddenFlag: "none",
                errorLn: "",
                [event.target.id]: event.target.value,
                errorLnFlag: false,
                generalErrorFlag: "none"
            })
        }
    }


    validateEmail(event) {
        event.preventDefault();
        let regex = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+/g;
        let ans = event.target.value.search(regex);
        if(ans >= 0 || event.target.value === "") {
            this.setState({
                errorFlag: false,
                errorEmailHiddenFlag: "none",
                errorEmail: "",
                [event.target.id]: event.target.value,
                errorEmailFlag: false,
                generalErrorFlag: "none"
            })
            
        }
        else {
            this.setState({
                errorFlag: true,
                errorEmailHiddenFlag: "block",
                errorEmail: "Invalid email address.",
                [event.target.id]: event.target.value,
                errorEmailFlag: true,
                generalErrorFlag: "block"
            })
            
        }
    }

    
    validatePhone(event) {
        event.preventDefault();
        let regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        let ans = event.target.value.search(regex);
        if(ans >= 0 || event.target.value === "") {
            this.setState({
                errorFlag: false,
                errorPhFlag: false,
                errorPh: "",
                [event.target.id]: event.target.value,
                errorPhHiddenFlag: "none",
                generalErrorFlag: "none"
            })   
        }
        else {
            this.setState({
                errorFlag: true,
                errorPhFlag: true,
                errorPh: "Invalid phone number",
                [event.target.id]: event.target.value,
                errorPhHiddenFlag: "block",
                generalErrorFlag: "block"
            })  
        }
    }

    postUsers(){
        let url = `http://localhost:3001/postUser`;
        var data = {
            firstName : this.state.firstname ,
            lastName : this.state.lastname,
            emailId : this.state.email,
            number : this.state.phone
        }

        console.log(data)
        axios.post(url, data)
            .then( (response) => {
                
                console.log(response.data())
            })
            localStorage.removeItem("Email")
            localStorage.setItem("Email",data.emailId)
    }
    
    render() {

    return (
      <div className="classs">
            <div className="logo">
                <img src={globe}/>
            </div>
        <div className="wrapper">
            <div className='container small'>
                <h3 className='registerHeader'>Register for the Updates</h3>
                <br/>
                <div className="contact-form">

                    <br/>
                    <div className="input-fields">

                        <input type="text" className="error" style={{display:this.state.errorFnHiddenFlag}}  value = {this.state.errorFn}/>
                        <input type="text" className="error" style={{display:this.state.errorLnHiddenFlag}} value = {this.state.errorLn}/>
                        <input type="text" className="error" style={{display:this.state.errorPhHiddenFlag}} value = {this.state.errorPh}/>
                        <input type="text" className="error" style={{display:this.state.errorEmailHiddenFlag}} value = {this.state.errorEmail}/>
                        <input type="text" className="error" style={{display:this.state.generalErrorFlag}}  value = {this.state.error}/>
                        <input id = "firstname" type="text" className="input" placeholder="First Name" value={this.state.firstname} onChange={this.validateFirstName}/>
                        <input id = "lastname" type="text" className="input" placeholder="Last Name" value={this.state.lastname} onChange={this.validateLastName}/>
                        <input id = "email" type="text" className="input" placeholder="Email Address" value={this.state.email} onChange={this.validateEmail}/>
                        <input id ="phone" type="tel" className="input" placeholder="Phone Number" value={this.state.phone} onChange={this.validatePhone}/>
                    </div>

                    <div className="msg">
                        {/*<textarea placeholder="Message"></textarea>*/}
                        <div className="btn1" onClick={this.handleRegister}>
                            <i className="fa fa-paper-plane-o fa-2x send" aria-hidden="true"></i>
                            <i className="fa fa-paper-plane-o fa-2x send2" aria-hidden="true"></i>
                            <button id="registerButton" to="../HomePage" onClick={this.postUsers} >
                                <p>Register</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    )
  }
}


