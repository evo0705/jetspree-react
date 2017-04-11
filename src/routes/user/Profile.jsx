import React from "react";
import {getAuthUser} from "../../data/account";

class ProfileLayout extends React.Component {
    render() {
        return (
            <div className="itemsListWrap">
                <div className="overflowFixBeta">
                    <div className="container">
                        <div className="table">
                            <div className="leftSide">
                                Category here
                            </div>
                            <div className="contentWrap tableCell full vatop">
                                <div className="content colWrap productList">
                                    <Profile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            token: this.props.token,
            userName: '',
            userEmail: '',
            userId: '',
        };
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo() {
        if (this.state.token)
            getAuthUser(this.state.token).then((data) => {
                this.setState({userEmail: data.result.email, userName: data.result.email, userId: data.result.id});
            })
    }


    initData() {
        if (this.props.match) {
            let param = {
                id: this.props.match.params.Id
            };
            // TODO
        } else {

        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    render() { console.log(this.state)
        return (
            <div>
                hello {this.state.userName}
            </div>
        )
    }
}


export default Profile;