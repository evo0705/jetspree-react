import React from 'react';
import { loadCountries } from '../../data/common';

class BrowseCountries extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
		  countries: []
		};
	}

	componentWillMount(){
		let scope = this;
		loadCountries().then((data) => { 
			scope.setState({
				countries: data
			});
		});
	}
	
	render(){
		return(
			<div>
				<h2>Browse Countries</h2>
				{JSON.stringify(this.state.countries)}
			</div>
		);
	}
}
export default BrowseCountries;