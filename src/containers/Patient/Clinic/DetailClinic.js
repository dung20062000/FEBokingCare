import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Footer/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {getDetailClinicByIdService, getAllCodeService} from "../../../services/userService"
import _ from "lodash" // sử lí mảng và obj dễ dàng hopwn js thuần
import { LANGUAGES } from "../../../utils";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Comment from "../SocialPlugin/Comment";



class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        };
    }
    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDetailClinicByIdService({
                id: id,
                location: 'ALL'
            })

            if(res && res.errCode === 0){
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId : arrDoctorId,
                })
            }else{
                
            }

        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }



    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://developers.facebook.com": window.location.href
        // console.log('check state aaaaaa', this.state)
        let {language} = this.props
        return (
            <div className="detail-clinic-content">
                <HomeHeader/>
                <div className="clinic-description">
                    <div className="clinic-description-background">
                        <div className="clinic-description-body">
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                &&
                                <>
                                    <div className="clinic-body-name">{dataDetailClinic.name}
                                    </div>
                                    <div className="like-share-clinic">
                                        <LikeAndShare
                                            dataHref={currentURL}
                                        />
                                    </div>
                                    <div className="clinic-description-detail-body" dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}>
                                                
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="detail-clinic-container">
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
                                                isShowLinkDetail= {true}
                                                isShowPrice= {false}
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
                    <div className="comment-doctor">
                        <Comment
                            dataHref={currentURL}
                            width= {"100%"}
                        />
                    </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
