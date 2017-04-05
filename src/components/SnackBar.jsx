import React from "react";
import SnackBar from "material-ui/Snackbar";

export default class SnackBarMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: ''
        }
    }

    handleRequestClose = () => {
        this.props.close();
    };

    render() {
        return (
            <div>
                <SnackBar open={this.props.open} message={this.props.message} autoHideDuration={4000}
                          onRequestClose={this.handleRequestClose}/>
            </div>
        )
    }
}