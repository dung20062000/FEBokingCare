import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        };
    }
    async componentDidMount() {
        // khi muốn gán giá trị cho 1 biến state nào đó
        let response = await getAllUsers('ALL')
        if(response && response.errCode === 0 ){
            this.setState({
                arrUsers: response.users
            });
            console.log('check user 2: ', this.state.arrUsers)
        }
        console.log('get data', response);
    }

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title text-center">Manage User</div>
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
                                {
                                    arrUsers && arrUsers.map((item , index) => {
                                        return (
                                            <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" ><i class="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" ><i class="fas fa-trash"></i></button>
                                                
                                            </td>
                                            </tr>
                                        )
                                    })
                                }
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
