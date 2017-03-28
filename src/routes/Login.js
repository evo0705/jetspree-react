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
import {getAuthUser} from '../data/account.js';

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



class SnackbarMsg extends React.Component {
	constructor( {active} ) {
	super();
	this.state = {
		SnackbarOpen: active,
		message: ''
	}
}

	handleRequestClose = () => {
		this.setState({
			SnackbarOpen: false
		});
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.active){
			this.setState({SnackbarOpen: true, message: nextProps.text})
		};
	}

	render() {
		return (
			<div>
			<Snackbar open={this.state.SnackbarOpen} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
			</div>
		)
	}

}

class Form extends React.Component {
	constructor( {initialChecked} ){
		super();
		this.state = {
			canSubmit: false,
			SnackbarOpen: false,
			message: '',
			checked: initialChecked
		}
		this.handleTouchTap = this.handleTouchTap.bind(this);
		this.getToken = this.getToken.bind(this);
		this.submit = this.submit.bind(this);
	}

  handleTouchTap() {
    // const newState = !this.state.checked; // this is toggle
    const newState = true;
    this.setState({ checked: newState }); 
    this.props.callbackParent(newState); // notify parent
  }

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

	getToken() {
		if (localStorage.token){
			let param = {
				token: localStorage.token
			};
			getAuthUser(param).then((data) => {
				//this.setState({userEmail: data.email, userName: data.email});
				//this.props.callbackUser({userEmail: data.email, userName: data.email, userId: data.id}); // notify parent
			})
		
		}
	}

	submit(data) {
		Axios.post('https://jetspree-node-test.herokuapp.com/login/account', {email:data.email, password: data.password})
		.then(response => {
			//console.log(response.data.token)
			if (response.data.token) {
				//this.setState({token: response.data.token});
				localStorage.setItem("token", response.data.token);
				//this.getToken();
			}
			this.handleTouchTap(response);
		})
		.catch(function (error) {
			console.log(error);
		});
		//alert(JSON.stringify(data.email, null, 4));
	}

	render() {
		return(
			<div>
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
			{/*<FlatButton onTouchTap={this.handleTouchTap} label="Snackbar" />*/}
			</div>
			</div>
			</Formsy.Form>
			</div>
			)
	}
}


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false
		};
	}

    onChildChanged(newState) {
      this.setState({ checked: newState })
    }


	render() {console.log(this.state)
		return (
			<div className="accountForm stayCenter mgTop40">
			<h1>Login</h1>
			<GetUserInfo />
			<Form initialChecked={this.state.checked} callbackParent={(newState) => this.onChildChanged(newState)}  />
			<SnackbarMsg active={this.state.checked} text="Successsss" />
			<div className="mgTop60 taCenter">Not member yet? <Link to="/signup">Sign Up</Link></div>
			</div>
		);
	}
}




export class GetUserInfo extends React.Component{
	constructor() {
	super();
	this.state = {
		userName: '',
		userEmail: '',
		userId: ''
	}
}
	getToken() {
		if (localStorage.token){
			let param = {
				token: localStorage.token
			};
			getAuthUser(param).then((data) => {
				this.setState({userEmail: data.email, userName: data.email, userId: data.id});
			})
		}
	}	

logout = () => {
	localStorage.removeItem("token");
	this.setState({userEmail: '', userName: '', userId: ''})
}

componentDidMount() {
	this.getToken()
}


    onUserChanged(userdata) {
    	console.log(userdata)
      this.props.callbackParent(userdata);


    }


	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		if (nextProps){
		this.getToken()
		};
	}


	render() {console.log('run me');
		return (

			<div>Hi, {this.state.userName} 
					<button onClick={this.logout}>loggout</button>
			</div>
			)
	}
}


export default Login;