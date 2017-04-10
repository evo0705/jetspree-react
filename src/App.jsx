import React, {Component} from "react";
import injectTapEventPlugin from "../node_modules/react-tap-event-plugin";
//import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from "../node_modules/material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FlatButton from "material-ui/FlatButton";

import logo from "./logo.svg";
import "../public/fonts/iconfont.css"
import "./App.css";
import "../node_modules/react-select/dist/react-select.min.css";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import BrowseCountries from "./routes/requests/Countries.js";
import ItemsList from "./routes/requests/List.jsx";
import RequestView from "./routes/requests/View.jsx";

import ProductsList from "./routes/products/Products.jsx";
import ProductView from "./routes/products/View.jsx";
import SignUp from "./routes/SignUp.jsx";
import Login, {GetUserInfo, LoginNavbar} from "./routes/Login.jsx";
import Request from "./routes/PostRequest";
import Trip from "./routes/PostTrip";
import createBrowserHistory from "history/createBrowserHistory";
import SnackBar from "./components/SnackBar";
import Utils from "./helper/Utils";

injectTapEventPlugin();

const yuTheme = getMuiTheme({
    fontFamily: 'inherit',
});

const history = createBrowserHistory();


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            snackBar: {open: false, message: ''},
            id: '',
            postRequestName: ''
        };
        // get token from cookie and set into state
        this.updateToken = this.updateToken.bind(this);
        this.showSnackBar = this.showSnackBar.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.passId = this.passId.bind(this);
        this.passValue = this.passValue.bind(this);
    }

    componentWillMount() {
        var token = Utils.getCookie("token");
        if (token !== "") {
            this.setState({token: token});
        }
    }

    passId(id){
        console.log(id);
        this.setState({id: id});
    }

    passValue(postRequestName){
        console.log(postRequestName)
        this.setState({postRequestName: postRequestName});
    }

    updateToken(token) {
        this.setState({token: token});
        Utils.setCookie("token", token, 30);
    }

    showSnackBar(message) {
        this.setState({snackBar: {open: true, message: message}});
    }

    closeSnackBar() {
        this.setState({snackBar: {open: false, message: ''}});
    }

    render() {
        console.log(this.state.postRequestName)
        return (
            <Router history={history}>
                <MuiThemeProvider muiTheme={yuTheme}>
                    <div className="App">

                        <div className="header">
                            <div className="overflowFixBeta">
                                <div className="container">
                                    <img src={logo} className="App-logo" alt="logo"/>
                                    <FlatButton label="Home" containerElement={<Link to="/"/>}/>
                                    <FlatButton label="Countries" containerElement={<Link to="/countries"/>}/>
                                    <FlatButton label="Requests" containerElement={<Link to="/request"/>}/>
                                    <FlatButton label="Trip" containerElement={<Link to="/trip"/>}/>
                                    <FlatButton label="Products" containerElement={<Link to="/products"/>}/>
                                    <LoginNavbar token={this.state.token}/>
                                    <GetUserInfo token={this.state.token} updateToken={this.updateToken}
                                                 showSnackBar={this.showSnackBar}/>
                                </div>
                            </div>
                        </div>
                        <Route exact path="/" component={() => (
                            <Landing passId={this.passId} passValue={this.passValue} />)}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={() => (
                            <Login updateToken={this.updateToken} showSnackBar={this.showSnackBar}/>)}/>
                        <Route path="/countries" component={BrowseCountries}/>
                        <Route path="/items" component={ItemsList}/>
                        <Route exact path='/items/:Id' component={RequestView}/>
                        <Route path="/trip" component={Trip}/>
                        <Route path="/products" component={ProductsList}/>
                        <Route exact path='/products/:Id' component={ProductView}/>
                        <Route path="/request" component={() => (
                            <Request receiveId={this.state.id} receiveRequestName={this.state.postRequestName} />)} />
                        <SnackBar open={this.state.snackBar.open} message={this.state.snackBar.message}
                                  close={this.closeSnackBar}/>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
