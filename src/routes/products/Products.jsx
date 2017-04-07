import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import {getRequests} from "../../data/requests.js";
import RaisedButton from "material-ui/RaisedButton";
import ProductView from "./View.jsx";
import Dialog from "material-ui/Dialog";
import "../requests/List.css";

class Products extends React.Component {
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
            pagesize: 20
        };

        getRequests(paramItems).then((data) => {
            this.setState({items: data.result, imageHost: data.image_host});
        });
    }

    render() {
        if (this.state.items.length > 0) {
            let itemsNodes = this.state.items.map((obj, i) => {
                return (
                    <div className="colMd6 col" key={obj.id}>
                        <Link to={{pathname: `/products/${obj.id}`, state: {modal: true}}}>
                            <div className="bgWhite relative">
                                <div className="imgWrap">
                                    <img
                                        src={this.state.imageHost + obj.image_path}
                                        alt="should be here"/>
                                </div>
                                <div className="productInfo"><h4>{obj.name}</h4>
                                    <div className="mgBottom">{obj.price}</div>
                                    <RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            });

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
                                        {itemsNodes}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }
}

const styles = {
    dialogRoot: {
        paddingTop: 0,

    },
    dialogBody: {
        minHeight: 400,
        background: "#eee",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        fontSize: 'inherit'

    },
    dialogTitle: {
        fontSize: 18,
        padding: "10px 20px",
        background: "#eee"
    }
};

const Modal = ({match, history}) => {

    if (match.isExact) {
        var modalOpen = true
    }

    const back = () => {
        var modalOpen = false;
        history.goBack();
    };

    return (

        <Dialog modal={false} open={modalOpen} onRequestClose={back} autoScrollBodyContent={true} className="itemModal"
                bodyStyle={ styles.dialogBody } style={ styles.dialogRoot } titleStyle={ styles.dialogTitle}
                repositionOnUpdate={ false }>
            <ProductView modalId={match.params.Id}/>
            {/*<button type='button' onClick={back}>Close</button>*/}

        </Dialog>

    )
};

class ProductsList extends React.Component {

    // We can pass a location to <Switch/> that will tell it to
    // ignore the router's current location and use the location
    // prop instead.
    //
    // We can also use "location state" to tell the app the user
    // wants to go to `/images/2` in a modal, rather than as the
    // main page, keeping the gallery visible behind it.
    //
    // Normally, `/images/2` wouldn't match the gallery at `/`.
    // So, to get both screens to render, we can save the old
    // location and pass it to Switch, so it will think the location
    // is still `/` even though its `/images/2`.
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
        const {location} = this.props;
        // set previousLocation if props.location is not modal
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }

    render() {
        //console.log('location: ' + JSON.stringify(this.props))
        const {location} = this.props;
        const isModal = !!(
            location.state && location.state.modal && this.previousLocation !== location // not initial render
        );


        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path='/products' component={Products}/>
                </Switch>
                {isModal ? <div className="modalView"><Route path='/products/:Id' component={Modal}/></div> : null}
            </div>
        )
    }
}


export default ProductsList;