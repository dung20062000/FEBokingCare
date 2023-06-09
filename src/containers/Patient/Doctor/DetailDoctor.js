import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Footer/HomeFooter";
import {getDetailInfoDoctorService} from "../../../services/userService"
import DoctorSchedule from "./DoctorSchedule"
import DoctorExtraInfo from "./DoctorExtraInfo";
import './DetailDoctor.scss'
import { LANGUAGES } from "../../../utils";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Comment from "../SocialPlugin/Comment";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor:{},
            currentDoctorId: -1
        };
    }
    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInfoDoctorService(id)
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data,
                })
            }else{
                
            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }   
    render() {
        let {detailDoctor} = this.state
        let {language} = this.props
        let nameVi = '', nameEn = '';
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ? "https://developers.facebook.com": window.location.href;

        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className="doctor-detail-container">
                    <div className="intro-doctor-container">
                        <div className="intro-doctor">
                            <div className="content-left"
                                style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : '' })`}}>
                                
                            </div>

                            <div className="content-right">
                                <div className="up">
                                    {language === LANGUAGES.VI ? nameVi : nameEn}  
                                </div>
                                <div className="down">
                                    { detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                        <span>
                                            {detailDoctor.Markdown.description}
                                        </span>
                                    }
                                    <div className="like-share-plugin">
                                        <LikeAndShare
                                            dataHref={currentURL}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="schedule-doctor-container">
                        <div className="schedule-doctor">
                            <div className="content-left">
                                <DoctorSchedule
                                    doctorIdFromParent={this.state.currentDoctorId}
                                />
                            </div>
                            <div className="content-right">
                                <DoctorExtraInfo
                                    doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="detail-info-doctor-container">
                        <div className="detail-info-doctor">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}>
                                    
                                </div>
                            }
                        </div>
                    </div>

                    <div className="comment-doctor">
                        <Comment
                            dataHref={currentURL}
                            width= {"100%"}
                        />
                    </div>
                </div>

                <HomeFooter/>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
