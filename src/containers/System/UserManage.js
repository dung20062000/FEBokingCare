import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers, createNewUserService } from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }
    async componentDidMount() {
        await this.getAllUserReact()
    }
    
    getAllUserReact = async( ) => {
        // khi muốn gán giá trị cho 1 biến state nào đó
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggledUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    createNewUser = async(data) =>{
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0 ) {
                alert(response.errMessage);
            }else{
                await this.getAllUserReact();
                this.setState({
                    isOpenModalUser: false,
                });
            }
            
        }catch(err){
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
                    createNewUser = {this.createNewUser}
                />
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
                                                <button className="btn-edit">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete">
                                                    <i class="fas fa-trash"></i>
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
