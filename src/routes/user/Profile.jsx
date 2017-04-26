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
            <div className="profileWrap">
                <div className="overflowFixBeta">
                    <div className="container">
                        <div className="userBasic mgTop60 mgBottom60 ">
                                <div className="userPhoto">
                                    <img src="https://a0.muscache.com/im/pictures/90aef051-f5b7-471a-b4f2-fbb3f5e5fb89.jpg?aki_policy=profile_x_medium"/>
                                </div>
                                <div>
                                    <UserAbout token={this.props.token} />
                                    <div className="table full">
                                        <div className="tableCell vaMiddle">
                                        <p >Hello, welcome to my space</p>
                                        <p>From Malaysia</p>
                                        </div>
                                        <div className="userSwitch pullRight squareInfo">
                                            <p className="col bgWhite"><Link to="/profile/requests"><span className="colorPri">11</span>Requests</Link></p>
                                            <p className="col bgWhite"><Link to="/profile/trips"><span className="colorPri">2</span>Trips</Link></p>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className="table full">

                            <div className="contentWrap tableCell full vatop">
                                <div className="content colWrap">
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