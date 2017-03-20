import React, { Component } from 'react';
import injectTapEventPlugin from '../node_modules/react-tap-event-plugin';
//import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';
import Dialog from '../node_modules/material-ui/Dialog';
import logo from './logo.svg';
import './App.css';
import '../node_modules/react-select/dist/react-select.min.css';
<<<<<<< HEAD
import { loadCountries, loadSubCategories } from './data/common.js';
import { loadRequests } from './data/requests.js';
import Home from './home/Home.js';

=======
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Landing from './routes/Landing.js';
import BrowseCountries from './routes/requests/Countries.js';
>>>>>>> 9c9d9896f58bc91510b2606be93d13d3d2595311

injectTapEventPlugin();

class App extends Component {  
  
renderHome() {
	return <Home />
}

  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React123</h2>
        </div>

{renderHome()}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<label>Name:</label><input type="text" value={this.state.name} onChange={this.inputChange} /><br />
		<label>Country</label><Select name="form-country" searchable={false} clearable={false} value={this.state.country} options={this.state.countries} onChange={this.changeCountry} />
		<label>Category</label><Select name="form-category" searchable={false} clearable={false} value={this.state.category} options={this.state.categories} onChange={this.changeCategory} />
		<input type="button" onClick={() => this.buttonClick(100)} value="Get 100 records" />
		<input type="button" onClick={() => this.buttonClick(1000)} value="Get 1000 records!" />
		<pre>{this.state.requests}</pre>
      </div>
=======
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
>>>>>>> 9c9d9896f58bc91510b2606be93d13d3d2595311
    );
  }
}

export default App;
