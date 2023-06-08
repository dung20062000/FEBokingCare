import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions"
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import {postPatientBookingAppointment} from "../../../../services/userService"
import { toast } from 'react-toastify';
import moment from "moment";

 


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',

        };
    }
    async componentDidMount() {
        // let id = this.props.doctorId;
        this.props.getGender()
    }
    buildDataGender = (data) => {
        let result = []
        let language = this.props.language
        if(data &&  data.length > 0) { 
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap
                result.push(obj)
            })

        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })

        }
        if(this.props.dataTime !== prevProps.dataTime) {
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                // console.log('checking data Time ', this.props.dataTime)
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = { ...this.state}
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender : selectedOption
        });
    }

    buildTimeBooking= (dataTime) => {
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let time =  language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ? 
                moment.unix( +dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            
            :   moment.unix( +dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return <></>

    }
    buildDoctorName = (dataTime) => {
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let name =  language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} ` 
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `

            return name
        }
        return <></>
    }


    handleConfirmBooking = async() => {
        let date = new Date(this.state.birthday).getTime()
        // !data.email || !data.doctorId || !data.timeType || !data.date){
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName

        })
        if(res && res.errCode === 0 ){
            toast.success('Booking a new appointment successfully')
            this.props.closeBookingModal()
        }else{
            toast.error('Booking a new appointment failed')
        }
        console.log('checking bookings ', this.state)
    }

    render() {
        let {isOpenModalBooking, closeBookingModal, dataTime} = this.props
        let doctorId = ''

        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }
        // console.log('checking data time ', dataTime)

        return (
            <Modal 
                isOpen={isOpenModalBooking}  
                // isOpen={true}  
                className={'booking-modal-container'}
                centered
                size="lg"
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"><FormattedMessage id="detail-doctors.booking-modal.title"/></span>
                        <span 
                            className="right"
                            onClick={closeBookingModal}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail= {false}
                                isShowPrice= {true}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.name"/></label>
                                <input 
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                >
                                    
                                </input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.phone"/></label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                >
                                
                                </input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.email"/></label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                ></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.address"/></label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                ></input>
                            </div>
                            <div className="col-12 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.reason"/></label>
                                <input className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                ></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.birthday"/></label>
                                    <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}
                            />
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label><FormattedMessage id="detail-doctors.booking-modal.gender"/></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="booking-modal-footer">
                        <button 
                            className="btn-booking-confirm btn btn-primary"
                            onClick={() => this.handleConfirmBooking()}
                        
                        ><FormattedMessage id="detail-doctors.booking-modal.confirm"/></button>
                        <button 
                            className="btn-booking-cancel btn btn-danger"
                            onClick={closeBookingModal}
                        ><FormattedMessage id="detail-doctors.booking-modal.cancel"/></button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
