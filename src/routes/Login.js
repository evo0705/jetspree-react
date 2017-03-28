import React from 'react';
import { Link } from 'react-router-dom';
//import { postSignup } from '../data/account';
import Formsy from 'formsy-react';
//import MyInput from './../components/Input';
import Axios from "axios";
import Snackbar from 'material-ui/Snackbar';
import './SignUp.css';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FlatButton from 'material-ui/FlatButton';
import {loadAuthUser} from '../data/account.js';

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
			SnackbarOpen: false,
			username: null,
			message: '',
			token:''
		};
		this.handleTouchTap = this.handleTouchTap.bind(this);
		this.submit = this.submit.bind(this);
		this.getdata = this.getdata.bind(this);
	}

	handleTouchTap = (req) => {
		this.setState({
			SnackbarOpen: true,
			message: 'Success!'
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


	getdata = () => {
		let param = {
			token: this.state.token
		};
		loadAuthUser(param).then((data) => {
			this.setState({user: data});
		})

	}

	submit(data) {
		Axios.post('https://jetspree-node-test.herokuapp.com/login/account', {email:data.email, password: data.password})
		.then(response => {
			//console.log(response.data.token)
			if (response.data.token) {
				this.setState({token: response.data.token});
				localStorage.setItem("token", response.data.token);
				this.getdata();
			}
			this.handleTouchTap(response);
		})
		.catch(function (error) {
			console.log(error);
		});
		//alert(JSON.stringify(data.email, null, 4));
	}




	render() {
		return (
			<div className="accountForm stayCenter mgTop40">
			<h1>Login</h1>
			<Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
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
			</Formsy.Form>
			<Snackbar open={this.state.SnackbarOpen} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
			<div className="mgTop60 taCenter">Not member yet? <Link to="/signup">Sign Up</Link></div>
			</div>
			);
	}
}

class GetUserAuth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
		};
	}

	render () {


		return (
			alert('wwad')
			)

	}
	
}



export default Login;