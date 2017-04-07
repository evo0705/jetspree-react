import React from "react";
import {Link} from "react-router-dom";
import {getRequest} from "../../data/requests.js";
import ReactImageFallback from "react-image-fallback";
import Placeholder from "../../../public/imgs/greyImg.gif";
import RaisedButton from "material-ui/RaisedButton";
import "../requests/View.css";
import "./View.css";


class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            Description: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            let item = nextProps.data.result[0];
            this.setState({
                name: item.name,
                description: item.description,
                id: item.Id,
                price: item.price,
                imagePath: nextProps.data.image_host + item.image_path
            });
        }
    }

    render() {
        return (
            <div className="itemWrap">
                <div className="itemImgWrap">
                    <ReactImageFallback
                        src={this.state.imagePath}
                        alt={this.state.name}
                        fallbackImage={Placeholder} initialImage={Placeholder}/>
                </div>
                <div className="itemInfo">
                    <h1><Link
                        to={{pathname: `/products/${this.state.id}`, state: {modal: false}}}>{this.state.name}</Link>
                    </h1>
                    <p className="itemPrice"><span>{this.state.price}</span></p>
                    <div className="mgTop30">


                        <p>{this.state.description}</p>
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
            item: '',
        }
    }

    initData() {
        if (this.props.match) {
            // standalone page
            let param = {
                id: this.props.match.params.Id
            };
            getRequest(param).then((data) => {
                this.setState({item: data});
            });
        } else {
            //modal page, load from ViewModal.js > const Modal
            let param = {
                id: this.props.modalId
            };
            getRequest(param).then((data) => {
                this.setState({item: data});
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
                    <ItemDetails data={this.state.item}/>
                </div>
            </div>
        )
    }
}

export default ProductView;