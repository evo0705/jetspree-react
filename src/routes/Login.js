import React from 'react';
import { Link } from 'react-router-dom';
//import { postSignup } from '../data/account';
import { Form } from 'formsy-react';
//import MyInput from './../components/Input';
import Axios from "axios";
import Snackbar from 'material-ui/Snackbar';
import './SignUp.css';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FlatButton from 'material-ui/FlatButton';


const styles = {
	textfield: {
		width: '100%'
	},
	floatingLabelFocusStyle: {
 
  	},
	underlineStyle: {

	},
	errorStyle: {
		lineHeight:'20px',
    bottom: -2
  }
};


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
			SnackbarOpen: false
		};
		this.handleTouchTap = this.handleTouchTap.bind(this);
	}

	handleTouchTap = (req) => {
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
		Axios.post('https://jetspree-node-test.herokuapp.com/login/account', {email:data.email, password: data.password})
		.then(response => {
			console.log(response)
			abc.handleTouchTap(response);
		})
		.catch(function (error) {
			console.log(error);
			this.handleTouchTap(error);
		});
		//alert(JSON.stringify(data.email, null, 4));
	}


	render() {
		return (
			<div className="accountForm stayCenter mgTop40">
			<h1>Login</h1>
			<Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
			<ul>
			<li>
			<FormsyText value="" name="email" hintText="" floatingLabelText="Email" validations="isEmail" validationError="This is not a valid email" 
			style={styles.textfield} errorStyle={styles.errorStyle}  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required />
			</li>
			<li>
			<FormsyText value="" name="password" type="password" hintText="" floatingLabelText="Password" validationError="At least 6 character"
			style={styles.textfield} errorStyle={styles.errorStyle}  floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required />
			</li>
			</ul>

			<div className="floatWrap">
				<div className="pullRight">
			<FlatButton type="submit" label="Login"  disabled={!this.state.canSubmit} className="bgPri" />
			<FlatButton onTouchTap={this.handleTouchTap} label="Snackbar" />
				</div>
				</div>
			</Form>
			<Snackbar open={this.state.SnackbarOpen} message="Event added to your calendar" autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
					<div className="mgTop60 taCenter">Not member yet? <Link to="/signup">Sign Up</Link></div>
			</div>
			);
	}
}


export default Login;