import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'formsy-react';
import Axios from "axios";
import Snackbar from 'material-ui/Snackbar';
import './SignUp.css';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FlatButton from 'material-ui/FlatButton';


const styles = {
	textfield: {
		width: '100%'
	},
	floatingLabelFocusStyle: {

	},
	underlineStyle: {

	},
	errorStyle: {
		lineHeight:'20px',
		bottom: -2
	}
};


class postRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
			SnackbarOpen: false
		};
		this.handleTouchTap = this.handleTouchTap.bind(this);
		this.submit = this.submit.bind(this);
	}

	handleTouchTap = (req) => {
		this.setState({
			SnackbarOpen: true,
		});
	}

	handleRequestClose = () => {
		this.setState({
			SnackbarOpen: false
		});
	};


	enableButton = () => {
		this.setState({
			canSubmit: true
		});
	}
	disableButton = () => {
		this.setState({
			canSubmit: false
		});
	}

	submit(data) {
		Axios.post('https://serene-meadow-20972.herokuapp.com/items',
			{name:data.name, price: data.price, description: data.description})
			.then(response => {
				console.log(response);
			})
	}

	render() {
		return (
			<div className="accountForm stayCenter mgTop40">
				<h2>Post Request</h2>
				<Form
					onSubmit={this.submit}
					onValid={this.enableButton}
					onInvalid={this.disableButton}
					className="login">
				<ul>
					<li>
						<FormsyText
							value=""
							name="name"
							hintText=""
							floatingLabelText="Name"
							style={styles.textfield}
							errorStyle={styles.errorStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							required />
					</li>
					<li>
						<FormsyText
							value=""
							name="price"
							hintText=""
							floatingLabelText="Price"
							style={styles.textfield}
							errorStyle={styles.errorStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							required />
					</li>
					<li>
						<FormsyText
							value=""
							name="description"
							hintText=""
							floatingLabelText="Description"
							style={styles.textfield}
							errorStyle={styles.errorStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							required />
					</li>
				</ul>
				<div className="floatWrap">
					<div className="pullRight">
						<FlatButton type="submit"
							label="Submit"
							disabled={!this.state.canSubmit}
							className="bgPri"
						/>
					</div>
				</div>
				</Form>
			</div>
		);
	}
}


export default postRequest;