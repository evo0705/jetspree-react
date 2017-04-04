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

    updateToken(token) {
        this.setState({token: token});
        localStorage.setItem("token", token);
    }

    render() {

        return (

            <Router history={history}>
                <MuiThemeProvider muiTheme={yuTheme}>

                    <div className="App">
                        {/*<div className="App-header">
                         <img src={logo} className="App-logo" alt="logo" />
                         <h2>Welcome to React123</h2>
                         </div>*/}
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
