import React from "react";
import Axios from "axios";
import Modal from "react-modal";
import {Form} from "formsy-react";
import FormsySelect from "formsy-material-ui/lib/FormsySelect";
import FlatButton from "material-ui/FlatButton";
import "./SignUp.css";
import "./SignUp.css";
import moment from "moment";
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import cookie from 'react-cookie';
import DropDown from '../components/DropDown';
import {loadCountries} from '../data/hardcoded-data';


const customStlye = {
	overlay : {
		position          : 'fixed',
		top               : 0,
		left              : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : 'rgba(33, 28, 28, 0.74902)',
		zIndex           : 100
	},
	content : {
		position                   : 'absolute',
		top                        : '40px',
		left                       : '40px',
		right                      : '40px',
		bottom                     : '40px',
		border                     : '1px solid #ccc',
		background                 : '#fff',
		overflow                   : 'auto',
		WebkitOverflowScrolling    : 'touch',
		borderRadius               : '4px',
		outline                    : 'none',
		padding                    : '20px',
		width                      : '500px',
		height                     : '300px',
		
	}
};

class postTrip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
			modalIsOpen: false,
			autoOk: true,
			countries: [],
			
			//DatePicker
            ReturnDate: "",
            TravelDate: ""
        };
		
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	loadCountries() {
		Axios({
			method: 'get',
            url: process.env.REACT_APP_JETSPREE_API_URL + '/countries'
		}).then(resp => {
			this.setState({
				countries: resp.data.result
			});
		}).catch(error => {
			console.log(error);
		})
	}
	
	openModal = () => {
		this.setState({
			modalIsOpen: true
		})
    };
	
	closeModal = () => {
		this.setState({
			modalIsOpen: false
		})
    };
	
	enableButton = () => {
		this.setState({
			canSubmit: true
		});
	};
	
	
	disableButton = () => {
		this.setState({
			canSubmit: false
		});
	};

	handleChangeReturnDate = (date) => {
		this.setState({
			ReturnDate: date
		})
    };

    handleChangeTravelDate = (date) => {
        this.setState({
            TravelDate: date
        })
    };
	
	
	disabledDate = (date) => {
		return date < moment.now();
    };
	
	submit(data) {
		Axios({
			method: 'post',
            url: process.env.REACT_APP_JETSPREE_API_URL + '/auth/trips',
            headers: {'x-access-token': cookie.load('token')},
			data: {
				travelCountryCode: data.travelCountry,
				returnCountryCode: data.returnCountry,
				travelDate: moment(this.state.TravelDate).utc().format(),
				returnDate: moment(this.state.ReturnDate).utc().format()
			}
		}).then(resp => {
			this.openModal();
		}).catch(error => {
			console.log(error);
		})
	}
	
	render() {
		return (
			<div className="accountForm stayCenter mgTop40">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStlye}
					contentLabel="Success!"
				>
					<div> Success! </div>
				</Modal>
				<h2>Post Trip</h2>
				<Form
					onSubmit={this.submit}
					onValid={this.enableButton}
					onInvalid={this.disableButton}
					className="login">
					<ul>
						<li>
							<DropDown
								name="travelCountry"
								floatingLabelText="Travel country"
								countries={loadCountries()} />
						</li>
						<li>
							<DropDown
								name="returnCountry"
								floatingLabelText="Return Country"
								countries={loadCountries()} />
						</li>
						<li>
							<DatePicker
								autoOk={this.state.autoOk}
								onChange={this.handleChangeReturnDate}
								floatingLabelText="Return Date"
								shouldDisableDate={this.disabledDate}
							/>
						</li>
						<li>
							<DatePicker
								autoOk={this.state.autoOk}
								onChange={this.handleChangeTravelDate}
								floatingLabelText="Return Date"
								shouldDisableDate={this.disabledDate}
							/>
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
		)
	}
}

export default postTrip;