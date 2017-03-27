import React from 'react';
import logo from '../logo.svg';
import Select from 'react-select';
import { Link } from 'react-router-dom';
//import { loadSubCategories } from '../data/common.js';
import { loadItems, loadRequests } from '../data/requests.js';
import { loadTrips, loadRecommendations } from '../data/traveller.js';
import {FormattedDate} from 'react-intl';
import ReactImageFallback from "react-image-fallback";
//import withStyles from '../../node_modules/react-with-styles/lib/withStyles.js';
import './Landing.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import How1 from '../../public/imgs/how1.png';
import How2 from '../../public/imgs/how2.png';
import How3 from '../../public/imgs/how3.png';
import How4 from '../../public/imgs/how4.png';



class ItemsHome extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			items: {},
		};
	}

	componentDidMount() {
		this.initData();
	}

	initData(){
		let paramItems = {
			pagesize: 4
		};
		loadItems(paramItems).then((data) => {
			this.setState({items: data});
		});
	}

	render() {
		if(this.state.items.Items) {
			let itemsNodes = this.state.items.Items.map((obj, i) => {
				return (	
				
					<div className="colMd6 col" key={obj.Item.Id}>
						<Link to={`/items/${obj.Item.Id}`}>
					<div className="bgWhite relative">
					<div className="imgWrap">
						<img src={'https://www.jetspree.com/images/requests/' + obj.Item.Id + '/' + obj.Item.ItemURL} alt="hould be here" />
					</div>
					<div className="productInfo"><h4>{obj.Item.Name}</h4>
					<div className="mgBottom">{obj.Item.CurrencyCode}{obj.Item.OfferPrice}</div>
					<RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
					</div>
					</div>
						</Link>
					</div>
					)
			});

			return (	
		
				<div className="frontPageItemsList">
						{itemsNodes} 
				</div> 
			)
		}
		return null
	}
}


class Recommendations extends React.Component{
	constructor (props) {
		super(props)
		this.state = {
			recommendations: {},
		};
	}

	initData() {
		let paramRecommendations = {
			pagesize: 5,
			uid: this.props.tripsUserUid
		};
		loadRecommendations(paramRecommendations).then((data) => {
			this.setState({recommendations: data});
		});
	}

	render() {
		if(this.state.recommendations.Recommendations) {
			if (this.state.recommendations.Total === 0) {
				return <div className="taCenter table full fullheight"><div className="tableCell vaMiddle">Traveller din't define items to buy during trips</div></div>
			}
			let recommendationsNodes = this.state.recommendations.Recommendations.map((obj, i) => {
				return (
					<div className="col list mgBottom40" key={obj.Id}>
					<div className="table full bgWhite relative">
					<div className="imgWrap">
					<img src={'https://www.jetspree.com/images/recommendations/' + obj.Id + '/' + obj.ItemURL} alt="phone" /></div>
					<div className="productInfo tableCell vatop full"><h4>{obj.Name}</h4>
					<div>{obj.Description}</div>
					<div>{obj.CurrencyCode}{obj.Price}</div>
					<RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
					</div>
					</div>
					</div>
					)
			});

			return (
				<div className="homeRecommendations itemsList bgGrey">
					{recommendationsNodes}
				</div>
				)
		}
		return null
	}

	componentDidMount() {
		this.initData();
	}

}

const styles = {
	dialogRoot: {
		paddingTop: 0
	},
	dialogBody: {
		minHeight: 400,
		background:"#eee",
		paddingTop: 24,
		paddingBottom: 40
	},
	dialogTitle: {
		fontSize: 18,
		padding:"10px 20px",
		background:"#eee"
	}
};

class Modal extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			modalOpen: false
		};

	}

	handleClose = () => {
		this.setState({modalOpen: false});
	};

	componentWillReceiveProps(nextProps){
		this.setState({modalOpen: true});	
		this.tripsUserUid = nextProps.userUID;
		this.tripsUserName = nextProps.userName;
		this.tripsUserTripsDate = nextProps.userTripsDate		
	}

	render() {
		const formatTripsDate = this.tripsUserTripsDate;
		/*const actions = [
		<RaisedButton label="Cancel" primary={true} onTouchTap={this.handleClose} />,
		<RaisedButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleClose} />,
		];*/
		let userUID = this.props.userUID;
		if (userUID){
			return (
				<Dialog title={this.tripsUserName + " offer help to buy these products:"} /*actions={actions}*/ modal={false} open={this.state.modalOpen} onRequestClose={this.handleClose} autoScrollBodyContent={true}
				bodyStyle={ styles.dialogBody } style={ styles.dialogRoot } titleStyle={ styles.dialogTitle} repositionOnUpdate={ false }>
					<div className="mgBottom40">
					 Trips at <FormattedDate value={formatTripsDate} day="numeric" month="long" year="numeric" />
					</div>
					<Recommendations tripsUserUid={this.tripsUserUid} />
				</Dialog>	
				)
		}
		return null
	}
}


class Trips extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			trips: []
		};
	}

	handleOpen = (e) => {
		this.userUid = e.UserProfile.UID;
		this.userName = e.UserProfile.DisplayName;
		this.userTripsDate = e.CrtUpdDate;
		this.setState({userUid: e.UserProfile.UID});
	};

	componentDidMount() {
		this.initData();
	}

	initData(){
		let paramTrips = {
			pagesize: 8
		};
		loadTrips(paramTrips).then((data) => {
			var array = data.Trips;
			let filterTraveller = removeDuplicates(array, "Traveller");
			function removeDuplicates(myArr, prop) {
				return myArr.filter((obj, pos, arr) => {
					return arr.map(mapObj =>
						mapObj[prop]).indexOf(obj[prop]) === pos;
				});
			}
			this.setState({trips: filterTraveller});
		});
	}	

	render() {

		if(this.state.trips){
			var tripNodes = this.state.trips.map((obj, i) => {
				//console.log("Trips.render()", obj);
				return (
					<li key={obj.Id} onTouchTap={this.handleOpen.bind(this, obj)}>

					<ReactImageFallback src={'https://www.jetspree.com/api/image/profile/' + obj.UserProfile.UID + '/' + obj.UserProfile.PicURL + '?width=155&height=155&ratio=false'} fallbackImage={logo} initialImage={logo} alt={obj.UserProfile.DisplayName} />
		
						<span className="userName">{obj.UserProfile.DisplayName}</span>
					</li>
				)
			});
			return (
				<div>
				<Modal userUID={this.userUid} userName={this.userName} userTripsDate={this.userTripsDate} />	
				{tripNodes}
				</div>
				)
		}
		return null;
	}
}


class Landing extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			requests: '',
			name: 'cake',
			category: 'snacks',
			countries: [],
			categories: [],
			modalOpen: false,

		};
		this.buttonClick = this.buttonClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
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
			<div className="table fullheight stayCenter">
			<div className="bannerimg"><img src="http://www.freeiconspng.com/uploads/white-iphone-6-png-image-22.png" alt="phone" width="350" />
			<div className="phoneShadow"></div>
			</div>
			<div className="banner-text tableCell vaMiddle full">
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
			<div><p className="colorPri">Post your buy request</p><span>Request any item from around the world.</span></div>
			</div>
			<div className="colMd3 col"><img src={How2} alt="post your request"/>
			<div><p className="colorPri">Traveller offer to help</p><span>Accept traveller's offer and deposit money.</span></div>
			</div>
			<div className="colMd3 col"><img src={How3} alt="post your request"/>
			<div><p className="colorPri">Traveller delivers item</p><span>100% refund if not fullfilled.</span></div>
			</div>
			<div className="colMd3 col"><img src={How4} alt="post your request"/>
			<div><p className="colorPri">Payment release to traveller</p><span>Traveller will be paid after acknowledged by shopper.</span></div>
			</div>
			</div>
			</div>

			</div>

			<div className="bgGrey">


			<div className="container pdWrap">
			<div className="table">
			<aside className="leftSide">
			<h3>Recent Trips<span className="colorGrey small">See what they're going to buy</span></h3>
			<ul className="travelerList">
			
			<Trips />
			</ul>
			</aside>

			<div className="contentWrap tableCell full vatop">

			<div className="floatWrap mgBottom30">
			<h3 className="pullLeft">Popular Requests</h3>
			<div className="pullRight"><span>gadge</span><span>Food</span></div></div>
			<div className="content colWrap productList">
			<ItemsHome />



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