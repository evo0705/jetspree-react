import React from 'react';

import Select from 'react-select';
import { loadSubCategories, loadItems } from '../data/common.js';
import { loadRequests } from '../data/requests.js';
import { loadTrips } from '../data/traveller.js';
//import withStyles from '../../node_modules/react-with-styles/lib/withStyles.js';
import './Landing.css';
import RaisedButton from 'material-ui/RaisedButton';
import How1 from '../../public/imgs/how1.png';
import How2 from '../../public/imgs/how2.png';
import How3 from '../../public/imgs/how3.png';
import How4 from '../../public/imgs/how4.png';


class Landing extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
		  requests: '',
		  name: 'cake',
		  category: 'snacks',
		  countries: [],
		  categories: [],
		  items: [],
		  trips: []
		};
		this.buttonClick = this.buttonClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.renderItems = this.renderItems.bind(this);
	}
	
	loadData(pagesize){
		var scope = this;		
		let param = {
			name: scope.state.name,
			category: scope.state.category,
			pagesize: pagesize
		};
		loadRequests(param).then((data) => {
			scope.setState({requests: JSON.stringify(data)});
		});
	}
	
	initData(){
		var scope = this;
		loadSubCategories().then((data) => { 
			scope.setState({
				categories: data.map(function(obj){
					return { label: obj.name, value: obj._id } 
				})
			});
		});

	}

	loadItemsData(pagesize){
		var scope = this;		
		let param = {
			pagesize: 4
		};
		loadItems(param).then((data) => {
			scope.setState({items: data});
		});
	}

	loadTripsData(pagesize){
		var scope = this;		
		let param = {
			pagesize: 5
		};
		loadTrips(param).then((data) => {
			scope.setState({trips: data});
		});
	}

	componentDidMount() {
		this.initData();
		this.loadItemsData();
		this.loadTripsData();
	}

	renderItems() {
		if(this.state.items.Items)
		return this.state.items.Items.map((obj, i) => {
			return (
				<div className="colMd6 col" key={obj.Item.Id}>
					<div className="bgWhite">
						<div className="imgWrap"><img src={'https://www.jetspree.com/images/requests/' + obj.Item.Id + '/' + obj.Item.ItemURL} alt="phone" /></div>
						<div className="productInfo"><h4>{obj.Item.Name}</h4>
							<div className="mgBottom">{obj.Item.CurrencyCode}{obj.Item.OfferPrice}</div>
							<RaisedButton label="Buy" primary={true} className="pullRight"/>
						</div>
					</div>
				</div>
			)
		});
	}

	renderTrips() {
		if(this.state.trips.Trips)
		return this.state.trips.Trips.map((obj, i) => {
			return (
				<li key={obj.Id}>
						<img src={'https://www.jetspree.com/api/image/profile/' + obj.UserProfile.UID + '/' + obj.UserProfile.PicURL + '?width=155&height=155&ratio=false'} alt="{obj.UserProfile.DisplayName}" />
						<span className="userName">{obj.UserProfile.DisplayName}</span>
				</li>
			)
		});
	}	  
	buttonClick(pagesize){
		this.setState({requests: ""});
		this.loadData(pagesize);
	}
	 
	inputChange(event) {
		this.setState({name: event.target.value});
	}
	  
	changeCategory(val) {
		this.setState({category: val.value});
	}
	
	render(){


	

		return(
			<div className="Landing-page">	
			<div id="banner" className="grad-blue">
				<div className="container banner">
				<div className="table fullheight staycenter">
				<div className="bannerimg"><img src="http://www.freeiconspng.com/uploads/white-iphone-6-png-image-22.png" alt="phone" width="350" />
				<div className="phoneShadow"></div>
				</div>
				<div className="banner-text table-cell vaMiddle full">
					<h1>Welcome to Jetspree.</h1>
					<p>Use Jetspree to shop overseas products. A trusted traveler can bring them to you anywhere in the world using our international p2p delivery platform.</p>
					<div className="askuser">Please tell us who you are</div>
			    		<RaisedButton label="I am Shopper" primary={true} className="btnShopper btnBig" style={{ height: '45px',}}  />
			    		<RaisedButton label="I am Traveller" secondary={true} className="btnTraveller btnBig" style={{ height: '45px',}} />
					</div>
				</div>
				</div>

				<div className="howItWork taCenter">
				<div className="container">
				<h2>How Jetspree Work?</h2>
				<div className="colMd3 col"><img src={How1} alt="post your request"/>
					<div><p className="colorSp">Post your request</p><span>Request to buy any item from around the world.</span></div>
				</div>
				<div className="colMd3 col"><img src={How2} alt="post your request"/>
					<div><p className="colorSp">Traveller offer to help</p><span>Accept traveller's offer and deposit money.</span></div>
				</div>
				<div className="colMd3 col"><img src={How3} alt="post your request"/>
					<div><p className="colorSp">Traveller delivers item</p><span>100% refund if not fullfilled.</span></div>
				</div>
				<div className="colMd3 col"><img src={How4} alt="post your request"/>
					<div><p className="colorSp">Payment release to traveller</p><span>Traveller will be paid after acknowledged by shopper.</span></div>
				</div>
				</div>
				</div>

			</div>

			<div className="bgGrey">


			<div className="container pdWrap">
			<div className="table">
			<aside className="leftSide">
				<h3>Top Traveller</h3>
				<ul className="travelerList">
				{this.renderTrips()}
				</ul>
			</aside>

			<div className="contentWrap table-cell full vatop">
		
			<div className="floatWrap mgBottom">
				<h3 className="pullLeft">Popular Requests</h3>
				<div className="pullRight"><span>gadge</span><span>Food</span></div></div>
					<div className="content colWrap productList">
						{this.renderItems()}



						<label>Name:</label><input type="text" value={this.state.name} onChange={this.inputChange} /><br />
				<label>Category</label><Select name="form-category" searchable={false} clearable={false} value={this.state.category} options={this.state.categories} onChange={this.changeCategory} />
				<input type="button" onClick={() => this.buttonClick(100)} value="Get 100 records" />
				<input type="button" onClick={() => this.buttonClick(1000)} value="Get 1000 records!" />
				<pre>{this.state.requests}</pre>
				</div>
			</div>
</div>
</div>
</div>				
			</div>

		);
	}
}
export default Landing;

//export default  withStyles(homeStyle)(Landing);