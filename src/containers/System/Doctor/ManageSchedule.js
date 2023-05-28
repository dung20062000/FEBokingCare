import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { toast } from 'react-toastify';
import {dateFormat} from "../../../utils/constant"
import {saveBulkScheduleDoctorService} from "../../../services/userService"


import Select from "react-select";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManageSchedule.scss";
import _ from "lodash";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            isSelected: false,
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if(prevProps.allScheduleTimes !== this.props.allScheduleTimes) {

            let data = this.props.allScheduleTimes
            if(data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false
                    return item
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            });
        }
        return result;
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    };
    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0 ) {
            rangeTime = rangeTime.map((item) => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let result = [];
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        if(!currentDate){
            toast.error('Please check invalid date')
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Please check invalid choose doctor')
        }

        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatDate = moment(currentDate).unix()
        let formatDate = new Date(currentDate).getTime()
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if( selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.date = formatDate
                    obj.timeType = schedule.keyMap
                    result.push(obj)
                })
            }else{
                toast.error('Please check invalid date')
                return
            }
            
        }
        let  res = await saveBulkScheduleDoctorService({
            arrSchedule : result,
            doctorId: selectedDoctor.value,
            formatDate: formatDate
        })
        console.log('check result time', result)
        console.log('check saveBulkScheduleDoctorService', res)

    }

    render() {
        let {rangeTime} = this.state;
        let {language} = this.props;
        console.log("check state", rangeTime);
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return(
                                    <button 
                                        className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"  }
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                         {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-12 save-schedule-container">
                        <button
                            type="button" 
                            class="btn btn-primary btn-save-schedule"
                            onClick= {() => this.handleSaveSchedule()}
                            
                        >
                            <FormattedMessage id="manage-schedule.save-info" />
                        </button>
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
        allScheduleTimes: state.admin.allScheduleTimes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
