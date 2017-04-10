import React from "react";
import {Form} from "formsy-react";
import {postRequests} from "../data/requests";
import "./SignUp.css";
import DropZone from "react-dropzone";
import Modal from "react-modal";
import FormsyText from "formsy-material-ui/lib/FormsyText";
import FlatButton from "material-ui/FlatButton";

const styles = {
    textfield: {
        width: '100%'
    },
    floatingLabelFocusStyle: {},
    underlineStyle: {},
    errorStyle: {
        lineHeight: '20px',
        bottom: -2
    }
};

const customStlye = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(33, 28, 28, 0.74902)',
        zIndex: 100
    },
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        width: '500px',
        height: '300px',

    }
};

class postRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            modalIsOpen: false,
            imageFiles: [],
            prefill: {
                name: ''
            }
        };

        //ModalBox
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        //Submit
        this.submit = this.submit.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

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

    componentWillMount() {
        if (this.props.location.state)
        this.setState({
            prefill: this.props.location.state
        })
    }

    reset() {
        this.setState({
            prefill: {}
        })
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log(acceptedFiles);
        console.log(rejectedFiles);
        var file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({
                imageFiles: event.target.result
            })
        };
        reader.readAsDataURL(file);
    };


    submit(data) {
        data.image = this.state.imageFiles;
        postRequests(data)
            .then(response => {
                this.openModal();
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
                    <div> Success!</div>
                </Modal>
                <h2>Post Request</h2>
                <Form
                    onSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    className="login">
                    <ul>
                        <li>
                            <FormsyText
                                value={this.state.prefill.name}
                                name="name"
                                hintText=""
                                floatingLabelText="Name"
                                style={styles.textfield}
                                errorStyle={styles.errorStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                required/>
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
                                required/>
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
                                required/>
                        </li>
                        <li>
                            <DropZone
                                onDrop={this.onDrop}
                                accept="image/*"
                                multiple={true}
                            >
                                <div>
                                    Drag and Drop image files
                                    <img src={this.state.imageFiles}/>
                                </div>
                            </DropZone>
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