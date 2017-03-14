import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import '../node_modules/react-select/dist/react-select.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { loadCountries, loadSubCategories } from './data/common.js';
import { loadRequests } from './data/requests.js';

import BrowseCountries from './routes/requests/Countries.js';

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {
		  requests: '',
		  name: 'cake',
		  category: 'snacks',
		  country: 'my',
		  countries: [],
		  categories: []
		};
		this.buttonClick = this.buttonClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.changeCountry = this.changeCountry.bind(this);
	}
	
	loadData(pagesize){
		var scope = this;		
		let param = {
			name: scope.state.name,
			category: scope.state.category,
			pagesize: pagesize
		};
		loadRequests(param).then((data) => {
			scope.setState({requests: JSON.stringify(data)});
		});
	}
	
	initData(){
		var scope = this;
		
		loadCountries().then((data) => { 
			scope.setState({
				countries: data.map(function(obj){ 
					return { label: obj.name, value: obj._id } 
				})
			});
		});
		loadSubCategories().then((data) => { 
			scope.setState({
				categories: data.map(function(obj){
					return { label: obj.name, value: obj._id } 
				})
			});
		});
	}

  componentDidMount() {
    this.initData();
  }
  
  buttonClick(pagesize){
	this.setState({requests: ""});
	this.loadData(pagesize);
  }
  
  inputChange(event) {
    this.setState({name: event.target.value});
  }
  
  changeCategory(val) {
	this.setState({category: val.value});
  }
  
  changeCountry(val) {
	this.setState({country: val.value});
  }
  
  
  
  render() {
    return (
		<Router>
		  <div className="App">
			<div className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h2>Welcome to React123</h2>
			</div>
			
			<Link to="/countries">Browse by Countries</Link>
			<Route path="/countries" component={BrowseCountries}/>
			
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
		</Router>
    );
  }
}

export default App;
