import React from "react";
import {Link} from "react-router-dom";
import {getRequest} from "../../data/requests.js";
import ReactImageFallback from "react-image-fallback";
import Placeholder from "../../../public/imgs/greyImg.gif";
import RaisedButton from "material-ui/RaisedButton";
import "../requests/View.css";
import "./View.css";

export class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="itemWrap">
                <div className="itemImgWrap">
                    <ReactImageFallback
                        src={this.props.image_host + this.props.item.image_path}
                        alt={this.props.item.name}
                        fallbackImage={Placeholder} initialImage={Placeholder}/>
                </div>
                <div className="itemInfo">
                    <h1>
                        <Link
                            to={{
                                pathname: `/products/${this.props.item.id}`,
                                state: {modal: false}
                            }}>{this.props.item.name}</Link>
                    </h1>
                    <p className="itemPrice"><span>{this.props.item.price}</span></p>
                    <div className="mgTop30">
                        <p>{this.props.item.description}</p>
                    </div>
                    <div className="floatWrap">
                        <RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
                    </div>
                </div>
            </div>
        )
    }
}

class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: (this.props.item ||
            {
                name: '',
                image_path: ''
            }),
            image_host: (this.props.imageHost || ''),
        }
    }

    initData() {
        if (this.props.match) {
            // standalone page
            getRequest({
                id: this.props.match.params.id
            }).then((data) => {
                this.setState({
                    item: data.result[0],
                    image_host: data.image_host
                });
            });
        } else {
            //modal page, load from ViewModal.js > const Modal
            getRequest({
                id: this.props.item.id
            }).then((data) => {
                this.setState({
                    item: data.result[0],
                    image_host: data.image_host
                });
            });
        }
    }

    componentWillMount() {
        this.initData();
    }

    render() {
        return (
            <div className="bgGrey">
                <div className="container">
                    <ProductDetails item={this.state.item} image_host={this.state.image_host}/>
                </div>
            </div>
        )
    }
}

export default ProductView;