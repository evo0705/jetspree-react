import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/react-select/dist/react-select.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './routes/Landing.js';
import BrowseCountries from './routes/requests/Countries.js';

class App extends Component {  
  
  render() {
    return (
		<Router>
		  <div className="App">
			<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to React123</h2>
			</div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/countries">Browse by Countries</Link></li>
			</ul>
			
			<Route exact path="/" component={Landing}/>
			<Route path="/countries" component={BrowseCountries}/>
		  </div>
		</Router>
    );
  }
}

export default App;
