import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import Population from './components/Population';
import Area from "./components/Area";
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';


class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/population' component = {Population}/>
            <Route exact path = '/area' component = {Area}/>
            <Route path = '/getcountry/:country' component = {CountryDetails} />
            <Route path = '/countrylist' component = {CountryList} />
        </Switch>
    );
  }
}

export default App;
