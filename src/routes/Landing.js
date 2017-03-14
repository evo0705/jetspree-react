import React from 'react';

import Select from 'react-select';
import { loadCountries, loadSubCategories } from '../data/common.js';
import { loadRequests } from '../data/requests.js';

class Landing extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
		  requests: '',
		  name: 'cake',
		  category: 'snacks',
		  countries: [],
		  categories: []
		};
		this.buttonClick = this.buttonClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
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
	
	render(){
		return(
			<div>			
				<label>Name:</label><input type="text" value={this.state.name} onChange={this.inputChange} /><br />
				<label>Category</label><Select name="form-category" searchable={false} clearable={false} value={this.state.category} options={this.state.categories} onChange={this.changeCategory} />
				<input type="button" onClick={() => this.buttonClick(100)} value="Get 100 records" />
				<input type="button" onClick={() => this.buttonClick(1000)} value="Get 1000 records!" />
				<pre>{this.state.requests}</pre>
			</div>
		);
	}
}
export default Landing;