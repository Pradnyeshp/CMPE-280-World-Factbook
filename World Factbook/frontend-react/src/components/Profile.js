import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import '../css/graphStyle.css'

class Profile extends Component {


    constructor() {
        super();

        this.state = {
            fname : "",
            lname : "",
            phone : "",
            email : "pradnyesh.patil@sjsu.edu",
            display : false
        } ;

        this.handleChange = this.handleChange.bind(this) ;
        this.handleProfile = this.handleProfile.bind(this) ;
    }

    componentWillMount() {

    }

    handleChange(e) {
        e.preventDefault() ;
        this.setState({
            [e.target.name] : e.target.value
        }) ;
        console.log(this.state) ;
        console.log("Email adress entered") ;
    }

    handleProfile(e){

        let url = "http://localhost:3000" ;
        e.preventDefault() ;
        console.log('submit button clicked');
        // axios.post(url)
        //     .then(response =>{
        //         // console.log(response);
        //     })
    }

    render() {

        let profileImageStyle = {
            width: "250px",
            borderRadius: "50%",
            height: "240px",
            position: "absolute",
            // left: "400px",
            // top: "80px"
        };

        if(this.state.display){
            return (
                <div>
                    <Navbar/>
                    <br/>
                    <div className="container small">
                        <br/>
                        <div>
                            <h3>
                                User Profile
                            </h3>
                        </div>
                        <br/>

                        <div className='container'>
                            <div className='userprofile'>
                                <img className='coverImage' src="http://i63.tinypic.com/160y8eb.jpg"
                                     alt="Image and video hosting by TinyPic"/>
                                <div className='profileImage'>
                                    <img style={profileImageStyle} src="http://i63.tinypic.com/160y8eb.jpg"
                                         alt="User Profile Image"/>
                                </div>
                                <h2 className='userHeading'>
                                    Pradnyesh
                                </h2>

                                <div className='profiledetails'>
                                    <div className='row'>
                                        <div className='container col-5 box1'>
                                            <label className='labels'>
                                                First Name :
                                            </label>
                                            <label className='labels'>
                                                {this.state.fname}
                                            </label>
                                            <br/>
                                            <label className='labels'>
                                                Last Name :
                                            </label>
                                            <label className='labels'>
                                                {this.state.lname}
                                            </label>
                                        </div>
                                        <div className='container col-5 box1'>
                                            <label className='labels'>
                                                Email :
                                            </label>
                                            <label className='labels'>
                                                {this.state.email}
                                            </label>
                                            <br/>
                                            <label className='labels'>
                                                Phone :
                                            </label>
                                            <label className='labels'>
                                                {this.state.phone}
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <Navbar/>
                    <br/>
                    <div className="container small">
                        <br/>
                        <div>
                            <h3>
                                Profile Page
                            </h3>
                        </div>
                        <br/>
                        <form action="">
                            <div className='container-fluid'>
                                <div className="form-group profileEmail">
                                    <label id='emaillabel'>Please enter your email address : </label>
                                    <input style={{width : "40%"}}
                                           className="form-control" name='email' type='text'
                                           placeholder='johndoe@gmail.com'
                                           onChange={this.handleChange} id="email"/>
                                    <br/>
                                    <button type="button" className="btn btn-success" onClick={this.handleProfile}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            )
        }
    }
}

export default Profile;
