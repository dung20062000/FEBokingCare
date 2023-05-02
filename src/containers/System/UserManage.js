import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService
} from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }
    async componentDidMount() {
        await this.getAllUserReact();
    }

    getAllUserReact = async () => {
        // khi muốn gán giá trị cho 1 biến state nào đó
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };
    //đóng modal add new user
    toggledUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    //đóng modal edit user
    toggledUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserReact();
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit("EVENT_CREATE_MODAL_USER_DATA", { id: "your id" });
            }
        } catch (err) {
            console.log(err);
        }
    };
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserReact();
            } else {
                alert(response.errMessage);
            }
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };
    doEditUser = async (user) => {
        try{
            let response = await editUserService(user)
            if(response && response.errCode === 0 ) {
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getAllUserReact()
            }else{
                alert(response.errMessage);
            }
        }catch (err) {
            console.log(err);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggledUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFormParent={this.toggledUserEditModal}
                        currentUser={this.state.userEdit}
                        userEdit={this.doEditUser}
                        // createNewUser={this.createNewUser}
                    />
                )}
                <div className="title text-center">Manage User</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus icon-plus"></i>
                        Add New Users
                    </button>
                </div>
                <div className="users-table">
                    <table className="table table-hover table-bordered mt-4 mx-1">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        this.handleEditUser(
                                                            item
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {
                                                        this.handleDeleteUser(
                                                            item
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
