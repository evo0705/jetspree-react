import React from "react";
//import {getAuthUser} from "../../data/account";
//import Token from "../../helper/Token";
//import {Products} from "../../routes/products/List";
import {Link} from "react-router-dom";
import {getRequests} from "../../data/requests";
//import RaisedButton from "material-ui/RaisedButton";
import "./Profile.css"
//import moment from 'moment'

class UserRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
        };
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        let paramItems = {
            pagesize: 4
        };
        getRequests(paramItems).then((data) => {
            this.setState({items: data.result, imageHost: data.image_host});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.items !== nextState.items) {
            return true;
        }
        return false;
    }

    render() {
        if (this.state.items.length > 0) {
            let itemsNodes = this.state.items.map((obj, i) => {
                return (
                    <div className="colMd3 col" key={obj.id}>
                        <Link to={{pathname: `/products/${obj.id}`, state: {modal: true}}}>
                            <div className="bgWhite relative">
                                <div className="imgWrap">
                                    <img src={this.state.imageHost + obj.image_path} alt="should be here"/>
                                </div>
                                <div className="productInfo"><span className="itemPrice">{obj.price}</span><h4 className="itemName">{obj.name}</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            });
            return (

            <div id="userRequests">
                <h3 className="userRequestTitle">{this.state.userName}'s requested</h3>
                    {itemsNodes}
                </div>
            )
        }
        return null
    }
}


export default UserRequests;