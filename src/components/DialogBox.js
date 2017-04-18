import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class DialogBox extends React.Component {
	render() {
		const actions = [
			<FlatButton
				label="OK"
				primary={true}
				onTouchTap={this.props.onRequestClose}
			/>
		]
		
		return (
			<Dialog
				title={this.props.title}
				modal={true}
				actions={this.props.actions || actions}
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
			>
				{this.props.errorMessage}
			</Dialog>
		)
	}
}

DialogBox.defaultProps = {
	title: "Default Title",
	open: false
}

export default DialogBox;