import React, { Component } from "react";
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import {getScheduleDoctorByDateService} from "../../../services/userService"
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        };
    }
    async componentDidMount () {
        let { language } = this.props;
        this.setArrDays(language)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    setArrDays =  (language) => {
        let arrDate = []   
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if(language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                obj.label = this.capitalizeFirstLetter(labelVi)
            }else{
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(obj)
        }

        this.setState({
            allDays: arrDate
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            this.setArrDays(this.props.language)
        }
    }   

    handleOnChangeSelect = async (event) => {

        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDateService(doctorId, date)


            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }


        }
    }
 
    
    render() {
        let {allDays, allAvailableTime} = this.state
        let{language} = this.props
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) =>{
                            return <option key={index} value={item.value}> {item.label}</option>
                        })}
                    </select>
                </div>
                <div className="all-available-time">
                        <div className="text-calender">
                            <span> <i className="fas fa-calendar-alt"></i><FormattedMessage id="detail-doctors.schedule.calendar"/></span>
                        </div>
                        <div className="time-container">
                            {allAvailableTime && allAvailableTime.length > 0 ? 
                                allAvailableTime.map((item, index) =>{
                                    // let timeTypeData
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : 
                                    item.timeTypeData.valueEn;
                                    return(
                                        <button key={index} className="time-item">{timeDisplay}</button>
                                    )
                            })
                            : <div className="time-warning" ><FormattedMessage id="detail-doctors.schedule.info-warning"/></div>
                        
                        }

                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
