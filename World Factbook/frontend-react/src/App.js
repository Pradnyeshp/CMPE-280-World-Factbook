import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import PopulationGrowthGraph from './components/PopulationGrowthGraph';
import Area from "./components/Area";
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import Form from './components/Form';
import HomePage from './components/HomePage';
import Profile from "./components/Profile";
import PopulationInsights from "./components/PopulationInsights";
import MoreEnergyInsights from './components/MoreEnergyInsights';

class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path = '/' component = {HomePage}/>
            <Route exact path = '/population' component = {PopulationGrowthGraph}/>
            <Route exact path = '/area' component = {Area}/>
            <Route path = '/getcountry/:country' component = {CountryDetails} />
            <Route path = '/countrylist' component = {CountryList} />
            <Route exact path = '/dashboard/:country' component = {Home} />
            <Route exact path = '/Form' component = {Form} />
            <Route exact path = '/userprofile' component = {Profile} />
            <Route exact path = '/PopulationInsights' component = {PopulationInsights} />
            <Route path = '/dashboard/country-specific/more-energy-insights' component = {MoreEnergyInsights}/>
        </Switch>
    );
  }
}

export default App;
