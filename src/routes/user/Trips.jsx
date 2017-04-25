import React from "react";
import {getAuthUser} from "../../data/account";
import Token from "../../helper/Token";
import {Link} from "react-router-dom";
import {getTrips} from "../../data/traveller"
import "./Profile.css"
import moment from 'moment'


class UserTrips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: {},
        };
    }

    componentDidMount() {
        getTrips().then((data) => {
            this.setState({trips: data.result});
        })
    }

    render() {
        let current = moment();
        let currentDate = moment().format("DD MMM YYYY");
        if (this.state.trips.length > 0) {

            let passTripData = this.state.trips.filter((obj) => {
                return moment(obj.travel_date).isBefore(current) && moment(obj.return_date).isBefore(current)
            });
            let onTripData = this.state.trips.filter((obj) => {

                return moment(obj.travel_date).isBefore(current) && moment(obj.return_date).isAfter(current)
            });
            let activeTripData = this.state.trips.filter((obj) => {
                return moment(obj.travel_date).isAfter(current)
            });

            let passTrip = passTripData.map((obj, i) => {
                const travelDate = moment(obj.travel_date).format("DD MMM YYYY");
                const returnDate = moment(obj.return_date).format("DD MMM YYYY");
                return (
                    <div className="colMd6 col" key={obj.id}>
                        <div className="contentWrap">
                            <div className="mgBottom10 border">
                                <Link to={{pathname: `/trips/${obj.id}`, state: {modal: true}}}>
                                    <div className="bgWhite relative">
                                        {/*<div className="imgWrapBox">
                                         <img src={"https://www.jetspree.com/images/country/pic-" + obj.travel_country_code + ".jpg"}
                                         alt={obj.travel_country_code}/>
                                         </div>*/}
                                        <div className="tripInfo table full">
                                            <div className="tripHead tableCell vaMiddle full">
                                                <div className="travelCountry">
                                                    <h5 className="colorSec">{obj.travel_country_code}
                                                        <span className="colorBlack">Tokyo, Japan</span>
                                                    </h5>
                                                    <p className="tripDate tripReturn colorSec">{travelDate}</p>
                                                </div>
                                                <i className="iconfont icon-feiji1 colorSec iconMiddle"></i>
                                                <div className="returnCountry">
                                                    <h5 className="colorSec">{obj.return_country_code}
                                                        <span className="colorBlack">Kuala Lumpur, Malaysia</span>
                                                    </h5>
                                                    <p className="tripDate tripReturn colorSec">{returnDate}</p>
                                                </div>
                                            </div>
                                            <div className="tripDetail">
                                                <div className="detail"><i className="iconfont icon-roundcheckfill"></i>Fullfilled<span>3/3</span></div>
                                                <div className="detail"><i className="iconfont icon-vipcard"></i>Reimbursed<span>RM1300</span>
                                                </div>
                                                <div className="detail"><i className="iconfont icon-emoji"></i>Earned<span>RM300</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });


            let onTrip = onTripData.map((obj, i) => {
                let passDate;
                const travelDate = moment(obj.travel_date).format("DD MMM YYYY");
                const returnDate = moment(obj.return_date).format("DD MMM YYYY");
                //console.log(moment().diff(moment(obj.return_date), 'days'));
                if ((moment().diff(moment(obj.return_date), 'days'))) {
                    passDate = moment(obj.return_date).calendar(null,{
                        lastDay : '[Yesterday]',
                        sameDay : '[Today]',
                        nextDay : '[Tomorrow]',
                        lastWeek : '[last] dddd',
                        nextWeek : 'DD MMM YYYY',
                        sameElse : 'L'
                    })
                } else {
                    passDate = moment(obj.return_date).calendar(null,{
                        lastDay : '[Yesterday]',
                        sameDay : '[Today]',
                        nextDay : '[Tomorrow]',
                        lastWeek : '[last] dddd',
                        nextWeek : 'dddd',
                        sameElse : 'L'
                    })
                }

                return (
                    <div className="table full" key={obj.id}>
                        <div className="contentWrap tableCell full vatop">
                            <div className="mgBottom10 border">
                                <Link to={{pathname: `/trips/${obj.id}`, state: {modal: true}}}>
                                    <div className="bgWhite relative">
                                        <div className="tripInfo table full">
                                            <div className="tripHead tableCell vaMiddle full">
                                                <div className="travelCountry">
                                                    <h5 className="colorSec">{obj.travel_country_code}
                                                        <span className="colorBlack">Tokyo, Japan</span>
                                                    </h5>
                                                    <p className="tripDate tripReturn colorSec">{travelDate}</p>
                                                </div>
                                                <i className="iconfont icon-feiji1 colorSec iconMiddle"></i>
                                                <div className="returnCountry">
                                                    <h5 className="colorSec">{obj.return_country_code}
                                                        <span className="colorBlack">Kuala Lumpur, Malaysia</span>
                                                    </h5>
                                                    <p className="tripDate tripReturn colorSec">{passDate}</p>
                                                </div>
                                            </div>
                                            <div className="tripDetail">
                                                <div className="detail table full">
                                                    <div className="tableCell vaMiddle">
                                                        <i className="iconfont icon-roundcheck"></i>Claimed<span>3</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                )
            });

            let activeTrip = activeTripData.map((obj, i) => {
                let goDate;
                const travelDate = moment(obj.travel_date).format("DD MMM YYYY");
                const returnDate = moment(obj.return_date).format("DD MMM YYYY");

                if ((moment().diff(moment(obj.return_date), 'days'))) {
                    goDate = "Travel Soon " + moment(obj.travel_date).fromNow()
                } else {
                    goDate = "Travel at " + moment(obj.travel_date).calendar()
                }

                return (
                    <div className="table full" key={obj.id}>
                        <div className="leftSide">
                            <div className="claimedRequest">
                                <img
                                    src="https://a0.muscache.com/im/pictures/90aef051-f5b7-471a-b4f2-fbb3f5e5fb89.jpg?aki_policy=profile_x_medium"/>
                                <img
                                    src="http://i.imgur.com/tI5jq2c.jpg"/>
                                <img
                                    src="http://i.imgur.com/37w80TG.jpg"/>
                            </div>
                        </div>
                        <div className="contentWrap tableCell full vatop">
                            <div className="mgBottom10 border">
                                <Link to={{pathname: `/trips/${obj.id}`, state: {modal: true}}}>
                                    <div className="bgWhite relative">
                                        <div className="tripInfo table full">
                                            <div className="tripHead tableCell vaMiddle full">
                                                <div className="travelCountry">
                                                    <h5 className="colorSec">{obj.travel_country_code}
                                                        <span className="colorBlack">Tokyo, Japan</span>
                                                    </h5>
                                                    <p className="tripDate tripReturn colorSec">{goDate}</p>
                                                </div>
                                                <i className="iconfont icon-feiji1 colorSec iconMiddle"></i>
                                                <div className="returnCountry">
                                                    <h5 className="colorSec">{obj.return_country_code}
                                                        <span className="colorBlack">Kuala Lumpur, Malaysia</span>
                                                    </h5>
                                                    <p className="tripDate tripReturn colorSec">Return {returnDate}</p>
                                                </div>
                                            </div>
                                            <div className="tripDetail">
                                                <div className="detail table full">
                                                    <div className="tableCell vaMiddle">
                                                        <i className="iconfont icon-roundcheck"></i>Claimed<span>3</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });

            let onTripRender;
            let activeTripRender;
            let passTripRender;

            if (passTrip.length > 0) {
                passTripRender =
                    <div>
                        <h2>Past Trip(s)</h2>
                        <div className="colWrap">
                        {passTrip}
                        </div>
                    </div>;
            }
            if (onTrip.length > 0) {
                onTripRender =
                    <div>
                        <h2>Current Trip</h2>
                        {onTrip}
                    </div>
            }
            if (activeTrip.length > 0) {
                activeTripRender =
                    <div>
                        <h2>On Going trip(s)</h2>

                        {activeTrip}
                    </div>

            }

            return (
                <div>
                    {onTripRender}
                    {activeTripRender}
                    {passTripRender}
                </div>
            )
        }
        return null;
    }
}


export default UserTrips;