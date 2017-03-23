import React from 'react';
import { loadRequest } from '../../data/requests.js';

class requestView extends React.Component {
	constructor(props){
		console.log(props)
		super(props)
		this.state = {
			item: '',
		}
	}

	initData() {
		let param ={
			id: this.props.match.params.Id
		};
		
		loadRequest(param).then((data) => {
			this.setState({item: JSON.stringify(data)});
		});

	}

	componentDidMount(){
		this.initData();
	}

	render() {
		if (this.state.item){
			var wahaha = this.state.item;
		}

		return (
			<div>
			{this.props.children}
			<pre>{wahaha}</pre>	 walao
			</div>
			)
	}

}

export default requestView;