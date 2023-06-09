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
import { getAllPatientForDoctorService } from "../../../services/userService";
import moment from "moment";

class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
        };
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate);
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctorService({
            doctorId: user.id,
            date: formatedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            () => {
                let { user } = this.props;
                let { currentDate } = this.state;

                let formatedDate = new Date(currentDate).getTime();
                this.getDataPatient(user, formatedDate);
            }
        );
    };
    handleBtnConfirm = () =>{

    }
    handleBtnRemedy = () =>{

    }
    render() {
        let { dataPatient } = this.state;
        return (
            <div className="manage-patient-container">
                <div className="title"><FormattedMessage id="admin.manage-patients.title"/></div>
                <div className="manage-patient-body row">
                    <div className="col-6 form-group mt-4">
                        <label><FormattedMessage id="admin.manage-patients.date"/></label>
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
                                    <th scope="col"><FormattedMessage id="admin.manage-patients.number"/></th>
                                    <th scope="col"><FormattedMessage id="admin.manage-patients.time"/></th>
                                    <th scope="col"><FormattedMessage id="admin.manage-patients.name"/></th>
                                    <th scope="col"><FormattedMessage id="admin.manage-patients.address"/></th>
                                    <th scope="col"><FormattedMessage id="admin.manage-patients.gender"/></th>
                                    <th scope="col"><FormattedMessage id="admin.manage-patients.action"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPatient &&
                                    dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button 
                                                        className="btn-confirm btn btn-success"
                                                        onClick={() => this.handleBtnConfirm()}
                                                    >
                                                        <FormattedMessage id="admin.manage-patients.confirm"/>
                                                    </button>
                                                    <button 
                                                        className="btn-remedy btn btn-info mx-3"
                                                        onClick={() => this.handleBtnRemedy()}
                                                    >
                                                        <FormattedMessage id="admin.manage-patients.remedy"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    : 
                                    <tr>
                                        no data
                                    </tr>
                                }
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
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
