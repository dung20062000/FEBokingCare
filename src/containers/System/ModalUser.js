import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";

import "./ModalUser.scss";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on("EVENT_CREATE_MODAL_USER_DATA", () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            });
        });
    };

    componentDidMount() {}

    //đóng mở modal
    toggle = () => {
        this.props.toggleFormParent();
    };

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidate = () => {
        let isValidate = true;
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
        ];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValidate = false;
                alert("missing parameter : " + arrInput[i]);
                break;
            }
        }
        return isValidate;
    };

    handleAddNewUser = () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            //gọi API tạo modal người dùng
            this.props.createNewUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className="modal-user-container"
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create New User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-container">
                        <div className="modal-user-body">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                onChange={(event) => {
                                    this.handleOnChange(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="modal-user-body">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={(event) => {
                                    this.handleOnChange(event, "password");
                                }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="modal-user-body">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="firstName"
                                onChange={(event) => {
                                    this.handleOnChange(event, "firstName");
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="modal-user-body">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="lastName"
                                onChange={(event) => {
                                    this.handleOnChange(event, "lastName");
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="modal-user-body mx-width-input">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="address"
                                onChange={(event) => {
                                    this.handleOnChange(event, "address");
                                }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleAddNewUser();
                        }}
                        className="px-3"
                    >
                        Save
                    </Button>{" "}
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
