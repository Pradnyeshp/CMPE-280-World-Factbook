import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import Population from './components/Population';
import Area from "./components/Area";
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import Form from './components/Form';
import HomePage from './components/HomePage';
import Profile from "./components/Profile";

class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path = '/' component = {HomePage}/>
            <Route exact path = '/population' component = {Population}/>
            <Route exact path = '/area' component = {Area}/>
            <Route path = '/getcountry/:country' component = {CountryDetails} />
            <Route path = '/countrylist' component = {CountryList} />
            <Route exact path = '/Homepage' component = {Home} />
            <Route exact path = '/Form' component = {Form} />
            <Route exact path = '/userprofile' component = {Profile} />

        </Switch>
    );
  }
}

export default App;
