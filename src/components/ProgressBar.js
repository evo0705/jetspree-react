import React from "react";
import CircularProgress from "material-ui/CircularProgress";

class ProgressBar extends React.Component {
    render() {
        let NumericSize = parseInt(this.props.size, 10);
        let NumericThick = parseInt(this.props.thickness, 10);

        return (
            // You can customimze your style here and use it on anywhere u like
            <div style={{textAlign: 'center'}}>
                <CircularProgress size={NumericSize} thickness={NumericThick}/>
            </div>
        )
    }
}

ProgressBar.defaultProps = {
	size: 80,
	thickness: 5
}

export default ProgressBar