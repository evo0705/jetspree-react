import React from "react";
import Logo from "../public/imgs/logo.png";

const style = {
    logo: {
        maxWidth: 130
    }
}

const Footer = () =>
    <div className="footer bgWhite pd30 mgTop40">
        <div className="container">
            <div className="colWrap">
                <div className="col colMd3">
                    <img src={Logo} style={style.logo} alt="Jetspree Logo"/>
                </div>
                <div className="col colMd3">
                    <h5>Jetspree</h5>
                    <ul>
                        <li>About</li>
                        <li>Policies</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="col colMd3">
                    <h5>Shopper</h5>
                    <ul>
                        <li>Request</li>
                        <li>Refund</li>
                    </ul>
                </div>
                <div className="col colMd3">
                    <h5>Traveller</h5>
                    <ul>
                        <li>Trips</li>
                        <li>Delivery</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="copyRight">@ 2017 Jetspree. All right reserved.</div>
        </div>
    </div>

export default Footer;