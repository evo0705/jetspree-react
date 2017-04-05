import React, {Component} from "react";
import injectTapEventPlugin from "../node_modules/react-tap-event-plugin";
//import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from "../node_modules/material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FlatButton from "../node_modules/material-ui/FlatButton";

import logo from "./logo.svg";
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
import createBrowserHistory from "history/createBrowserHistory";

injectTapEventPlugin();

const yuTheme = getMuiTheme({
    fontFamily: 'inherit',
});

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
        // get token from cookie and set into state
        this.updateToken = this.updateToken.bind(this);
    }

getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

    updateToken(token) {
        this.setCookie("token", token, 30);
        this.setState({token: token});
    }

componentWillMount(){
 var token=this.getCookie("token");
       if (token !== "") {
           this.setState({token: token});
       } 
       return null
 console.log(token)
}
    render() {

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
                                    <FlatButton label="Products" containerElement={<Link to="/products"/>}/>
                                    <LoginNavbar token={this.state.token}/>
                                    <GetUserInfo token={this.state.token} updateToken={this.updateToken}/>
                                </div>
                            </div>
                        </div>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={() => (<Login updateToken={this.updateToken}/>)}/>
                        <Route path="/countries" component={BrowseCountries}/>
                        <Route path="/items" component={ItemsList}/>
                        <Route exact path='/items/:Id' component={RequestView}/>

                        <Route path="/products" component={ProductsList}/>
                        <Route exact path='/products/:Id' component={ProductView}/>
                        <Route path="/request" component={Request}/>

                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
