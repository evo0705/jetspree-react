import React from 'react';
import { loadRequest } from '../../data/requests.js';
import ReactImageFallback from "react-image-fallback";
import Placeholder from '../../../public/imgs/greyImg.gif';
import RaisedButton from 'material-ui/RaisedButton';
import '../requests/View.css';

class ItemDetails extends React.Component {
	constructor(props){
		//console.log(props)
		super(props)
		this.state = {
			name:'',
			Description: ''
		};
	}

	componentWillReceiveProps(nextProps){
		//console.log(nextProps.data.Item)
		if(this.props !== nextProps){
			this.setState({
				name: nextProps.data.Item.Name, Description: nextProps.data.Item.Description,
				id: nextProps.data.Item.Id, Price: nextProps.data.Item.OfferPrice, CurrencyCode: nextProps.data.Item.CurrencyCode, 
				ItemURL: nextProps.data.Item.ItemURL, User: nextProps.data.Item.UserProfile.DisplayName, ShippingMethod: nextProps.data.Item.ShippingMethod.Name,
				Country: nextProps.data.Item.Country.Name
			});
		}
	}

	render() {   	
		return (
			<div className="itemWrap">
			<div className="itemImgWrap">
			<ReactImageFallback src={'https://www.jetspree.com/images/requests/' + this.state.id + '/' + this.state.ItemURL} alt={this.state.name} 
			fallbackImage={Placeholder} initialImage={Placeholder} />
			</div>
			<div className="itemInfo">
			<h1>{this.state.name}</h1>
			<p>{this.state.Description}</p>
			<div className="mgTop30">
			<p>Id: {this.state.id}</p>
			<p>Pay: {this.state.CurrencyCode} <span>{this.state.Price}</span></p>
			<p>Shopper: {this.state.User}</p>
			<p>Shipping Method: {this.state.ShippingMethod}</p>
			<p>Shop Country: {this.state.Country}</p>
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
	constructor(props){
		//console.log(props)
		super(props)
		this.state = {
			item: '',
		}
	}

	initData() {
		if (this.props.match){
			// standalone page
			let param ={
				id: this.props.match.params.Id
			};
			loadRequest(param).then((data) => {
				this.setState({item: data});
			});
		} else {
			//modal page, load from ViewModal.js > const Modal 
			let param = {
				id: this.props.modalId
			}
			loadRequest(param).then((data) => {
				this.setState({item: data});
			});
		}
	}

	componentWillMount(){
		this.initData();
	}

	render() {
		return (
			<div className="bgGrey">
			<div className="container">
			<ItemDetails data={this.state.item} />
			</div>
			</div>
			)
	}
}

export default ProductView;