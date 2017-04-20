import React from "react";
import {Link, Redirect} from "react-router-dom";
//import { postSignup } from '../data/account';
import Formsy from "formsy-react";
//import MyInput from './../components/Input';
import "./SignUp.css";
import FormsyText from "formsy-material-ui/lib/FormsyText";
import FlatButton from "material-ui/FlatButton";
import {getAuthUser, postLogin} from "../data/account";
import SnackBar from "../components/SnackBar";
import {DropdownMenu} from "react-bootstrap-dropdown-menu";
import MenuItem from 'material-ui/MenuItem';
import Loading from '../components/ProgressBar'
import ProgressButton from 'react-progress-button'
import "../../node_modules/react-progress-button/react-progress-button.css"

const styles = {
    textfield: {
        width: '100%'
    },
    floatingLabelFocusStyle: {},
    underlineStyle: {},
    errorStyle: {
        lineHeight: '20px',
        bottom: -2
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            message: '',
            snackBar: {open: false, message: ''},
            redirectToHome: false,
            loading: false,
            buttonState: ''
        };
        this.submit = this.submit.bind(this);
        this.showSnackBar = this.showSnackBar.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    enableButton = () => {
        this.setState({
            canSubmit: true
        });
    };
    disableButton = () => {
        this.setState({
            canSubmit: false
        });
    };

    showSnackBar(message) {
        this.setState({snackBar: {open: true, message: message}});
    }

    closeSnackBar() {
        this.setState({snackBar: {open: false, message: ''}});
    }

    submit(param) {
		this.setState({buttonState: 'loading'});
        let updateToken = this.props.updateToken;
        let showSnackBar = this.props.showSnackBar;
        postLogin(param).then((response) => {
			//this.setState({buttonState: 'success'})
            if (response.data.success === false) {
                // TODO:display errors to user
				this.setState({buttonState: 'error'});
                this.showSnackBar(response.data.message);
            } else if (response.data.token) {
				this.setState({buttonState: 'success',redirectToHome: true})
                showSnackBar('You\'ve logged in successfully.');
                updateToken(response.data.token);
            } else {
				// this.setState({buttonState: 'error'});
            }

        }, (error) => {
            // TODO:error handling
        });
    }

    loadfacebook = () => {
        return window.location.href = process.env.REACT_APP_JETSPREE_API_URL + '/login/facebook';
    };

    render() {
        
        // if (this.state.loading === true) {
        //     return <Loading />
        // }
        
		if (this.state.redirectToHome) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="accountForm stayCenter mgTop40">
                <h1>Login</h1>
                <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
                    <ul>
                        <li>
                            <FormsyText value="" name="email" hintText="" floatingLabelText="Email"
                                        validations="isEmail" validationError="This is not a valid email"
                                        style={styles.textfield} errorStyle={styles.errorStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/>
                        </li>
                        <li>
                            <FormsyText value="" name="password" type="password" hintText=""
                                        floatingLabelText="Password" validationError="At least 6 character"
                                        style={styles.textfield} errorStyle={styles.errorStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/>
                        </li>
                    </ul>
                    <div className="floatWrap">
                        <div className="pullRight">
                            
                            {/*<FlatButton type="submit" label="Login" disabled={!this.state.canSubmit} className="bgPri"/>*/}
                            {/*<FlatButton onTouchTap={this.handleTouchTap} label="Snackbar" />*/}
                            
                            {this.state.canSubmit ? (
                                <ProgressButton state={this.state.buttonState}>
                                    Submit
                                </ProgressButton>
                            ) : (
                                <ProgressButton state='disabled'>
                                    Submit
                                </ProgressButton>
                            )}
                            
                        </div>
                        <div className="pullRight" style={{marginRight: '10px'}}>
                            <FlatButton type="button" label="Facebook" className="bgPri" onClick={this.loadfacebook}/>
                        </div>
                    </div>
                </Formsy.Form>
                <SnackBar open={this.state.snackBar.open} message={this.state.snackBar.message}
                          close={this.closeSnackBar}/>
                <div className="mgTop60 taCenter">Not member yet? <Link to="/signup">Sign Up</Link></div>
            </div>
        );
    }
}

export class LoginNavbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.token === '')
            return (
                <span>
                    <FlatButton label="Sign Up" containerElement={<Link to="/signup"/>}/>
                    <FlatButton label="Login" containerElement={<Link to="/login"/>}/>
                </span>
            );
        else return false;
    };
}


export class GetUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            userName: '',
            userEmail: '',
            userId: '',
            dropdownOpen: false
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);
    }

    getUserInfo() {
        if (this.state.token)
            getAuthUser(this.state.token).then((data) => {
                this.setState({userEmail: data.result.email, userName: data.result.email, userId: data.result.id});
            })
    }

    logout() {
        this.setState({token: '', userEmail: '', userName: '', userId: ''});
        this.props.updateToken('');
        this.props.showSnackBar('You\'ve logged out successfully.');
        localStorage.removeItem("token");
    }

    componentDidMount() {
        this.getUserInfo()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.setState({
                token: nextProps.token,
                updated: false
            });
        }
    }

    componentDidUpdate() {
        if (!this.state.updated) {
            this.getUserInfo();
            this.setState({updated: true});
        }
    }

    render() {
        if (this.state.token !== '') {
            return (
                <div className="userNav">
                    <DropdownMenu userName={this.state.userName} position="left" triggerType="icon" trigger="glyphicon userIcon iconfont icon-my">
                        <div><Link to="/profile">My Profile</Link></div>
                        <div><Link to="/profile/requests">My Requests</Link></div>
                        <div><Link to="/profile/trips">My Trips</Link></div>
                        <MenuItem text="Logout" onClick={this.logout}/>
                    </DropdownMenu>
                </div>
            )
        }
        else
            return false;
    }
}


export default Login;