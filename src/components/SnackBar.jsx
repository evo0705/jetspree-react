import React from "react";
import Snackbar from "material-ui/Snackbar";

export default class SnackbarMsg extends React.Component {
    constructor({active}) {
        console.log(active)
        super();
        this.state = {
            SnackbarOpen: active,
            message: ''
        }
    }

    handleRequestClose = () => {
        this.setState({
            SnackbarOpen: false
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            this.setState({SnackbarOpen: true, message: nextProps.text})
        }
        console.log(nextProps)
    }

    render() {
        console.log('render Snackbar')
        return (
            <div>
                <Snackbar open={this.state.SnackbarOpen} message={this.state.message} autoHideDuration={4000}
                          onRequestClose={this.handleRequestClose}/>
            </div>
        )
    }
}