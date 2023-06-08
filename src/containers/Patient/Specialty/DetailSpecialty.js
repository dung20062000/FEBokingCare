import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Footer/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {getDetailSpecialtyByIdService, getAllCodeService} from "../../../services/userService"
import _ from "lodash" // sử lí mảng và obj dễ dàng hopwn js thuần
import { LANGUAGES } from "../../../utils";



class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvinces: [],
        };
    }
    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyByIdService({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE')
            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId : arrDoctorId,
                    listProvinces:  resProvince.data
                })
            }else{
                
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleChangSelect = (event) => {
        console.log('check onchange', event.target.value)
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvinces } = this.state;
        // console.log('check state aaaaaa', this.state)
        let {language} = this.props
        return (
            <div className="detail-specialty-content">
                <HomeHeader/>
                <div className="specialty-description">
                    <div className="specialty-description-background">
                        <div className="specialty-description-body">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                &&  <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}>
                                            
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="detail-specialty-container">
                    <div className="search-doctor">
                        <select
                            onChange={(event) => this.handleChangSelect(event) }
                            className="btn-search-doctor"
                        >
                            {
                                listProvinces && listProvinces.length > 0 && listProvinces.map(
                                    (item, index) => {
                                        return(
                                            <option 
                                                key={index}
                                                value={item.keyMap}
                                                
                                            >
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>

                    {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return(
                                <div className="each-doctor" key={index}>
                                    <div className="each-doctor-content-left">
                                        <div className="each-doctor-profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="each-doctor-content-right">
                                        <div className="each-doctor-doctor-schedule">
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                    
                                                />
                                            </div>
                                            <div className="each-doctor-doctor-extraInfo">
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                
                </div>
                <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
