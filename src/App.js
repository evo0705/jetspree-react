import React, { Component } from 'react';
import injectTapEventPlugin from '../node_modules/react-tap-event-plugin';
//import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';

import logo from './logo.svg';
import './App.css';
import '../node_modules/react-select/dist/react-select.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Landing from './routes/Landing.js';
import BrowseCountries from './routes/requests/Countries.js';

injectTapEventPlugin();

class App extends Component {  
  
  render() {
    return (
		<Router>
		 <MuiThemeProvider>
		  <div className="App">
			{/*<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to React123</h2>
			</div>*/}
			<div className="container">
			<img src={logo} className="App-logo" alt="logo" />
			  <FlatButton label="Home"  containerElement={<Link to="/"/>} />
			  <FlatButton label="Countries"  containerElement={<Link to="/countries"/>} />
	
			</div>

			<Route exact path="/" component={Landing}/>
			<Route path="/countries" component={BrowseCountries}/>
		  </div>
		    </MuiThemeProvider>
		</Router>
    );
  }
}

export default App;
