import React from 'react';

import Select from 'react-select';
import { loadSubCategories, loadItems } from '../data/common.js';
import { loadRequests } from '../data/requests.js';
//import withStyles from '../../node_modules/react-with-styles/lib/withStyles.js';
import './Landing.css';
import RaisedButton from 'material-ui/RaisedButton';


class Landing extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
		  requests: '',
		  name: 'cake',
		  category: 'snacks',
		  countries: [],
		  categories: [],
		  items: []
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

		loadItems().then((data) => { 
			scope.setState({
				items: data
			});
		});
	}

	renderItems() {
		if(this.state.items.Items)
		return this.state.items.Items.map((obj, i) => {
			return (
					<div className="colMd2 col" key={obj.Item.Id}>
						<div className="bgWhite">
							<div className="imgWrap"><img src={'https://jetspree02.cloudapp.net/images/requests/' + obj.Item.Id + '/' + obj.Item.ItemURL} alt="phone" /></div>
							<div className="productInfo"><h4>{obj.Item.Name}</h4>
								<div className="mgBottom">{obj.Item.CurrencyCode}{obj.Item.OfferPrice}</div>
								<RaisedButton label="Buy" primary={true} className="pullRight"/>
							</div>
						</div>
					</div>
			)
		});
	}




	componentDidMount() {
		this.initData();
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
				<div className="banner-text table-cell vamiddle full">
					<h1>Welcome to Jetspree.</h1>
					<p>Use Jetspree to shop overseas products. A trusted traveler can bring them to you anywhere in the world using our international p2p delivery platform.</p>
					<div className="askuser">Please tell us who you are</div>
			    		<RaisedButton label="I am Shopper" primary={true} className="btnShopper btnBig" style={{ height: '45px',}}  />
			    		<RaisedButton label="I am Traveller" secondary={true} className="btnTraveller btnBig" style={{ height: '45px',}} />
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
				<li><img src="http://www.azquotes.com/public/pictures/authors/c2/8f/c28f12d9202f3ebcef573109c1e4ac48/5486618214676_fan_bingbing.jpg" alt="phone" />Yuho</li>
				<li><img src="http://asianpopnews.com/wp/wp-content/uploads/2015/08/Fanbingbing.jpg" alt="phone" />Samuel</li>
				<li><img src="http://www.azquotes.com/public/pictures/authors/c2/8f/c28f12d9202f3ebcef573109c1e4ac48/5486618214676_fan_bingbing.jpg" alt="phone" />Jasinu</li>
				<li><img src="http://asianpopnews.com/wp/wp-content/uploads/2015/08/Fanbingbing.jpg" alt="phone" />Chen</li>
				<li><img src="http://asianpopnews.com/wp/wp-content/uploads/2015/08/Fanbingbing.jpg" alt="phone" />Alex</li>
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