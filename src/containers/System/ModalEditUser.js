import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import lodash from "lodash"; // sử lí mảng và obj dễ dàng hopwn js thuần 

import "./ModalEditUser.scss";
import _ from "lodash";
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
    }

    componentDidMount() {
        let user = this.props.currentUser // === let {currentUser} = this.props
        if(user && !_.isEmpty(user)){ //isEmpty là hàm của lodash 
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

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

    handleSaveUser = () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            //gọi API edit người dùng
            this.props.userEdit(this.state);
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
                    Edit a user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-container">
                        <div className="modal-user-body">
                            <label for="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                disabled
                                placeholder="Email"
                                onChange={(event) => {
                                    this.handleOnChange(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="modal-user-body">
                            <label for="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                disabled
                                placeholder="Password"
                                onChange={(event) => {
                                    this.handleOnChange(event, "password");
                                }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="modal-user-body">
                            <label for="firstName">First Name:</label>
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
                            <label for="lastName">Last Name:</label>
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
                            <label for="address">Address:</label>
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
                            this.handleSaveUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
