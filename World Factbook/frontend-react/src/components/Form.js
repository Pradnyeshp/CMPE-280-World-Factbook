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
            lastname: "",
            phone : ""
        };
        
        this.handleRegister = this.handleRegister.bind(this);
        this.validateFirstNameAndLastName = this.validateFirstNameAndLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
    }

    handleRegister(e) {
        e.preventDefault();
        console.log("Register button clicked");
        console.log(this.state);
        console.log('firstname : ', this.state.firstname.length);
        if(this.state.firstname.length === 0 ||
            this.state.lastname.length === 0 ||
            this.state.email.length === 0 ||
            this.state.phone.length === 0){
                console.log('atleast 1 condidtion statisfied');
                this.setState({
                    errorFlag: false,
                    error: "Please fill all details",
            })
        }
        else {
            swal("Registered Successfully",'','success')
                .then((response)=>{
                    window.location.href = 'http://localhost:3000/Homepage';
                });
        }

    }


    validateFirstNameAndLastName(event) {
        event.preventDefault();
        //console.log(event.target.value);
        let regex = /\d/g;
        let ans = event.target.value.search(regex);
        if(ans >=0) {
            this.setState({
                errorFlag: false,
                error: "Digits are not allowed.",
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
                error: "Invalid email address.",
                [event.target.id]: event.target.value
            })
            
        }
    }

    
    validatePhone(event) {
        event.preventDefault();
        let regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        //console.log(event.target.value.search(regex));
        let ans = event.target.value.search(regex)
        if(ans==0){
        this.setState({
            errorFlag: true,
            error: "",
            [event.target.id]: event.target.value
        })
        } else {
            this.setState({
                errorFlag: false,
                error: "Invalid phone number.",
                [event.target.id]: event.target.value
            })
        }
        // this.setState({
        //     errorFlag: false,
        //     error: "",
        //     [event.target.id]: event.target.value
        // })
        // let ans = event.target.value.search(regex);
        // if(ans !=0){
        //     this.setState({
        //                 errorFlag: true,
        //                 error: "Invalid phone number."
        //             })
        // }
        // if(ans >= 0 || event.target.value === "") {
        //     this.setState({
        //         errorFlag: true,
        //         error: "",
        //         [event.target.id]: event.target.value
        //     })   
        // }
        // else {
        //     this.setState({
        //         errorFlag: false,
        //         error: "Invalid phone number",
        //         [event.target.id]: event.target.value
        //     })  
        // }
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
                        <input type="text" className="error" hidden={this.state.errorFlag} value = {this.state.error}/>
                        <input id = "firstname" type="text" className="input" placeholder="First Name" value={this.state.firstname} onChange={this.validateFirstNameAndLastName}/>
                        <input id = "lastname" type="text" className="input" placeholder="Last Name" value={this.state.lastname} onChange={this.validateFirstNameAndLastName}/>
                        <input id = "email" type="text" className="input" placeholder="Email Address" value={this.state.email} onChange={this.validateEmail}/>
                        <input id ="phone" type="tel" className="input" placeholder="Phone Number" value={this.state.phone} onChange={this.validatePhone}/>
                    </div>

                    <div className="msg">
                        {/*<textarea placeholder="Message"></textarea>*/}
                        <div className="btn1" onClick={this.handleRegister}>
                            <i className="fa fa-paper-plane-o fa-2x send" aria-hidden="true"></i>
                            <i className="fa fa-paper-plane-o fa-2x send2" aria-hidden="true"></i>
                            <button id="registerButton" onClick={this.handleRegister}  >
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


