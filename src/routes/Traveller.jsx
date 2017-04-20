import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import {Form} from "formsy-react";
import moment from 'moment';

class TravellerPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tripReturnDate : ''
		}
	}
	
	handleChangeTravelDate = (event, date) => {
		this.setState({
			tripReturnDate: date
		});
	};
	
	submit = (data) => {
		console.log(data);
	}
	
	render() {
		return (
			<div>
				<Form
					onSubmit={this.submit} >
					<input type="text" style={{"width": "100%"}} />
					<DatePicker
						autoOk={true}
						onChange={this.handleChangeTravelDate}
						floatingLabelText="Return Date"
					/>
					<button type="submit"> Earn </button>
				</Form>
			</div>
		)
	}
}

export default TravellerPage
