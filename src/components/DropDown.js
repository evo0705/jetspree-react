import React from 'react';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import MenuItem from 'material-ui/MenuItem';

class DropDown extends React.Component {
	render() {
		if(this.props.countries) {
			var displayCountry = this.props.countries.map((options, i) => {
				return <MenuItem key={i} value={options.code} primaryText={options.name} />
			});
			
			return (
				<div>
					<FormsySelect
						name={this.props.name}
						floatingLabelText={this.props.floatingLabelText}
					>
						{displayCountry}
					</FormsySelect>
				</div>
			)
		}
		else if(this.props.currencies) {
			var displayCurrency = this.props.currencies.map((options, i) => {
				return <MenuItem key={i} value={options.code} primaryText={options.name} />
			});
			
			return (
				<div>
					<FormsySelect
						name={this.props.name}
						floatingLabelText={this.props.floatingLabelText}
					>
						{displayCurrency}
					</FormsySelect>
				</div>
			)
		}
		else if(this.props.cities) {
			var displayCities = this.props.cities.map((options, i) => {
				return <MenuItem key={i} value={options.name} primaryText={options.name} />
			});
			
			return (
				<div>
					<FormsySelect
						name={this.props.name}
						floatingLabelText={this.props.floatingLabelText}
						onChange={this.props.onCityChange}
					>
						{displayCities}
					</FormsySelect>
				</div>
			)
		}
		else if(this.props.state) {
			var displayState = this.props.state.map((options, i) => {
				return <MenuItem key={i} value={options.name} primaryText={options.name} />
			});
			
			return (
				<div>
					<FormsySelect
						name={this.props.name}
						floatingLabelText={this.props.floatingLabelText}
					>
						{displayState}
					</FormsySelect>
				</div>
			)
		}
		else {
			return null
		}
	}
}

export default DropDown;