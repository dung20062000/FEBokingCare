import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Footer/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";



class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [58, 59, 57]
        };
    }
    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    render() {
        let { arrDoctorId } = this.state;
        return (
            <div className="detail-specialty-content">
                <HomeHeader/>
                <div className="detail-specialty-container">
                    <div className="specialty-description">

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
