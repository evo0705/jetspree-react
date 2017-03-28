import React, { Component } from 'react';
import injectTapEventPlugin from '../node_modules/react-tap-event-plugin';
//import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from '../node_modules/material-ui/FlatButton';

import logo from './logo.svg';
import './App.css';
import '../node_modules/react-select/dist/react-select.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Landing from './routes/Landing.js';
import BrowseCountries from './routes/requests/Countries.js';
import ItemsList from './routes/requests/List.js';
import RequestView from './routes/requests/View.js';

import ProductsList from './routes/products/Products.js';
import ProductView from './routes/products/View.js';
import SignUp from './routes/SignUp.js';
import Login from './routes/Login.js';



injectTapEventPlugin();

const yuTheme = getMuiTheme({
fontFamily: 'inherit',
});

class App extends Component {  
  
  render() {
    return (
		<Router>
		 <MuiThemeProvider muiTheme={yuTheme}>
		  <div className="App">
			{/*<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to React123</h2>
			</div>*/}
			<div className="header">
			 <div className="overflowFixBeta">
			<div className="container">
			<img src={logo} className="App-logo" alt="logo" />
			  <FlatButton label="Home"  containerElement={<Link to="/"/>} />
			  <FlatButton label="Countries"  containerElement={<Link to="/countries"/>} />		
			  <FlatButton label="Requests"  containerElement={<Link to="/items"/>} />
			  <FlatButton label="Products"  containerElement={<Link to="/products"/>} />
			  <FlatButton label="Sign Up"  containerElement={<Link to="/signup"/>} />
			  <FlatButton label="Login"  containerElement={<Link to="/login"/>} />

			</div>
			</div>
			</div>
			<Route exact path="/" component={Landing}/>
			<Route path="/signup" component={SignUp}/>
			<Route path="/login" component={Login}/>
			<Route path="/countries" component={BrowseCountries}/>
			<Route path="/items" component={ItemsList} />
          	<Route exact path='/items/:Id' component={RequestView}/>

			<Route path="/products" component={ProductsList} />
          	<Route exact path='/products/:Id' component={ProductView}/>


		  </div>
		    </MuiThemeProvider>
		</Router>
    );
  }
}

export default App;
