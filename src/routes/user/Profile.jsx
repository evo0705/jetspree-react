import React from "react";
import {getAuthUser} from "../../data/account";
import Token from "../../helper/Token";
import {Products} from "../../routes/products/List";
import {Route, Link} from "react-router-dom";
import {getRequests} from "../../data/requests";
import {getTrips} from "../../data/traveller"
import RaisedButton from "material-ui/RaisedButton";
import "./Profile.css"
import moment from 'moment';
import UserAbout from "./About";
import UserRequests from "./Requests"
import UserTrips from "./Trips"



class ProfileLayout extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="itemsListWrap profileWrap">
                <div className="overflowFixBeta">
                    <div className="container">
                        <div className="table full">
                            <div className="leftSide">
                                <img src="https://a0.muscache.com/im/pictures/90aef051-f5b7-471a-b4f2-fbb3f5e5fb89.jpg?aki_policy=profile_x_medium"/>
                                <div className="userSwitch">
                                    <p><Link to="/profile">About</Link></p>
                                    <p><Link to="/profile/requests">Requests</Link></p>
                                    <p><Link to="/profile/trips">Trips</Link></p>
                                </div>
                            </div>
                            <div className="contentWrap tableCell full vatop">
                                <div className="content colWrap productList">

                                    <Route exact path="/profile" component={() => (
                                        <UserAbout token={this.props.token}/>)}
                                    />

                                    <Route path="/profile/requests" component={UserRequests}/>
                                    <Route path="/profile/trips" component={UserTrips}/>
                                </div>
                            </div>
                        </div>
                        <div className="mgTop20">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProfileLayout;