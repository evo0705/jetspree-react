import React from "react";
import {Link} from "react-router-dom";
//import { postSignup } from '../data/account';
import Formsy from "formsy-react";
//import MyInput from './../components/Input';
import Axios from "axios";
import Snackbar from "material-ui/Snackbar";
import "./SignUp.css";
import FormsyText from "formsy-material-ui/lib/FormsyText";
import FlatButton from "material-ui/FlatButton";
import {getAuthUser} from "../data/account.js";

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


class SnackbarMsg extends React.Component {
    constructor({active}) {
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
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            this.setState({SnackbarOpen: true, message: nextProps.text})
        }
    }

    render() {
        return (
            <div>
                <Snackbar open={this.state.SnackbarOpen} message={this.state.message} autoHideDuration={4000}
                          onRequestClose={this.handleRequestClose}/>
            </div>
        )
    }
}

class Form extends React.Component {
    constructor(props, {initialChecked}) {
        super(props);
        this.state = {
            canSubmit: false,
            SnackbarOpen: false,
            message: '',
            checked: initialChecked
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleTouchTap() {
        // const newState = !this.state.checked; // this is toggle
        const newState = true;
        //this.setState({checked: newState});
        this.props.callbackParent(newState); // notify parent
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

    submit(data) {
        let updateToken = this.props.updateToken;
        Axios.post('https://jetspree-node-test.herokuapp.com/login/account', {
            email: data.email,
            password: data.password
        })
            .then(response => {
                if (response.data.token) {
                    updateToken(response.data.token);
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
            <div>
                <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}
                             className="login">
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
                            <FlatButton type="submit" label="Login" disabled={!this.state.canSubmit} className="bgPri"/>
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
        //this.setState({checked: newState})
    }

    render() {
        return (
            <div className="accountForm stayCenter mgTop40">
                <h1>Login</h1>
                <Form updateToken={this.props.updateToken} initialChecked={this.state.checked}
                      callbackParent={(newState) => this.onChildChanged(newState)}/>
                <SnackbarMsg active={this.state.checked} text="Successsss"/>
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
            userId: ''
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.logout = this.logout.bind(this);
    }

    getUserInfo() {
        if (this.state.token)
            getAuthUser(this.state.token).then((data) => {
                this.setState({userEmail: data.email, userName: data.email, userId: data.id});
            })
    }

    logout() {
        this.setState({token: '', userEmail: '', userName: '', userId: ''});
        this.props.updateToken('');
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
        if (this.state.token !== '')
            return (
                <div>Hi, {this.state.userName}
                    <button onClick={this.logout}>logout</button>
                </div>
            );
        else
            return false;
    }
}


export default Login;