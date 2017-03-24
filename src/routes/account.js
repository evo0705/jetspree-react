import React from 'react';
//import { postSignup } from '../data/account';
import { Form } from 'formsy-react';
import MyInput from './../components/Input';
import Axios from "axios";
import Snackbar from 'material-ui/Snackbar';

class signUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
			SnackbarOpen: false
		};
		this.handleTouchTap = this.handleTouchTap.bind(this);
	}

	handleTouchTap = (req) => {
		alert('call');
		this.setState({
			SnackbarOpen: true,
		});
	};

	handleRequestClose = () => {
		this.setState({
			SnackbarOpen: false
		});
	};


	enableButton = () => {
		this.setState({
			canSubmit: true
		});
	}
	disableButton = () => {
		this.setState({
			canSubmit: false
		});
	}

	submit(data) {
		var abc = this;
		Axios.post('https://jetspree-node-test.herokuapp.com/login/signup', {email:data.email, password: data.password})
		.then(response => {
			console.log(response)
			abc.handleTouchTap(response);
		} )
		.catch(function (error) {
			console.log(error);
			this.handleTouchTap(error);
		});
		//alert(JSON.stringify(data.email, null, 4));
	}


	render() {
		return (
			<div>
			<Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
			<MyInput value="" name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
			<MyInput value="" name="password" title="Password" type="password" required />
			<button type="submit" disabled={!this.state.canSubmit}>Submit</button>
			</Form>
			<button
			onTouchTap={this.handleTouchTap}
			label="Add to my calendar"
			>asdsd</button>
			<Snackbar
			open={this.state.SnackbarOpen}
			message="Event added to your calendar"
			autoHideDuration={4000}
			onRequestClose={this.handleRequestClose}
			/>
			</div>
			);
	}
}



export default signUp;