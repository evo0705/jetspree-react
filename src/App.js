import React, { Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import '../node_modules/react-select/dist/react-select.min.css';

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {
		  requests: "",
		  name: "",
		  category: 1,
		  categories: []
		};
		this.buttonClick = this.buttonClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.selectChange = this.selectChange.bind(this);
	}
	
	loadData(pagesize){
		var scope = this;
		Axios.get('https://jetspree-node-test.herokuapp.com/api/requests?name=' + scope.state.name + '&category=' + scope.state.category + '&pagesize=' + pagesize)
		.then(function (response) {
			scope.setState({requests: JSON.stringify(response.data)});
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	initData(){
		var scope = this;
		Axios.get('http://jetspree02.cloudapp.net/api/selections')
		.then(function (response) {
			scope.setState({
				categories: response.data.categories.map(function(obj){ 
					return { label: obj.name, value: obj.id } 
				}) 
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

  componentDidMount() {
    //this.initData();
  }
  
  buttonClick(pagesize){
	this.setState({requests: ""});
	this.loadData(pagesize);
  }
  
  inputChange(event) {
    this.setState({name: event.target.value});
  }
  
  selectChange(val) {
	this.setState({category: val.value});
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React123</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<label>Name:</label><input type="text" value={this.state.name} onChange={this.inputChange} /><br />
		<label></label><Select name="form-field-name" searchable={false} clearable={false} value={this.state.category} options={this.state.categories} onChange={this.selectChange} />
		<input type="button" onClick={() => this.buttonClick(100)} value="Get 100 records" />
		<input type="button" onClick={() => this.buttonClick(1000)} value="Get 1000 records!" />
		<input type="button" onClick={() => this.buttonClick(5000)} value="Get 5000 records!!" />
		<pre>{this.state.requests}</pre>
      </div>
    );
  }
}

export default App;
