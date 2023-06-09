import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import "./ManagePatient.scss";
import _ from "lodash";

class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: new Date()
        };
    }

    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    };
    render() {
        return (
            <div className="manage-patient-container">
                <div className="title">Quan ly lich hen kham benh</div>
                <div className="manage-patient-body row">
                    <div className="col-6 form-group mt-4">
                        <label>Chon ngay </label>
                        <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                
                        />
                    </div>
                    <div className="col-12">
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
                                <tr>
                                    <td>12331231123</td>
                                    <td>12331231123</td>
                                    <td>12331231123</td>
                                    <td>12331231123</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTimes: state.admin.allScheduleTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
