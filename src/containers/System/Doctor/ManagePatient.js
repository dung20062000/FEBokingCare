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
import { getAllPatientForDoctorService, PostSendRemedyService } from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        };
    }

    async componentDidMount() {

        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formatedDate = new Date(currentDate).getTime();

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
            async() => {

               await this.getDataPatient();
            }
        );
    };
    handleBtnConfirm = (item) =>{
        let data = {
            doctorId : item.doctorId,
            patientId : item.patientId,
            email: item.patientData.email,
            timeType : item.timeType,
            patientName : item.patientData.firstName
        }
        
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    closeRemedyModal = () => {
        this.setState({ 
            isOpenRemedyModal: false ,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChild) => {
        let {dataModal} = this.state
        this.setState({
            isShowLoading: true
        })

        let res = await PostSendRemedyService({
            // ...dataChild
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if(res && res.errCode === 0 ){
            this.setState({
                isShowLoading: false
            })
            toast.success('send remedy successfully ')
            this.closeRemedyModal()
            await this.getDataPatient()
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('send remedy failed')
        }



    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let {language} =this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading send Email...'
                >
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
                                            let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                            let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi :item.patientData.genderData.valueEn
                                            
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button 
                                                            className="btn-confirm btn btn-success"
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >
                                                            <FormattedMessage id="admin.manage-patients.confirm"/>
                                                        </button>

                                                    </td>
                                                </tr>
                                            );
                                        })
                                        : 
                                        <tr>
                                            <td colSpan="6" style={{textAlign: "center"}}>No data</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
                </LoadingOverlay>
            </>
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
