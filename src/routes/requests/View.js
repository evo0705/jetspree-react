import React from 'react';
import { loadRequest } from '../../data/requests.js';

class ItemDetails extends React.Component {
	constructor(props){
		console.log(props)
		super(props)
		this.state = {
			
		};
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps.data.Item)
		if(this.props !== nextProps){
			this.setState({
				name: nextProps.data.Item.Name, id: nextProps.data.Item.Id, price: nextProps.data.Item.OfferPrice, CurrencyCode: nextProps.data.Item.CurrencyCode, 
				ItemURL: nextProps.data.Item.ItemURL, User: nextProps.data.Item.UserProfile.DisplayName, ShippingMethod: nextProps.data.Item.ShippingMethod.Name,
				Country: nextProps.data.Item.Country.Name
			});
		}
	}

	render() {   	
		return (
			<div>
			<img src={'https://www.jetspree.com/images/requests/' + this.state.id + '/' + this.state.ItemURL} alt={this.state.name} />
			<h1>{this.state.name}</h1>
			{this.state.id}
			<p>{this.state.CurrencyCode} <span>{this.state.price}</span></p>
			<p>{this.state.User}</p>
			<p>{this.state.ShippingMethod}</p>
			<p>{this.state.Country}</p>
			</div>
			)
	}

}


class RequestView extends React.Component {
	constructor(props){
		console.log(props)
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

export default RequestView;