import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { FormattedMessage } from "react-intl";
import {postPVerifyBookingAppointment} from "../../services/userService"
import HomeHeader from "../HomePage/Header/HomeHeader";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        };
    }
    async componentDidMount() {
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postPVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            })
            if(res && res.errCode === 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVerify: true, 
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }

        if (this.props.match && this.props.match.params) {

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let {statusVerify, errCode} = this.state;
        console.log('check state', this.state);
        return (
            <>
                <HomeHeader />
                {statusVerify === false ? 
                    <div>
                        loading data
                    </div>
                :
                    <div>
                        {+errCode === 0 ? 
                            <div className="card-container">
                                <div class="card">
                                    <div className="icon-container">
                                        <i class="checkmark-true">✓</i>
                                    </div>
                                    <h1 className="title-true">Success</h1> 
                                    <p className="sub-title-true">We received your request;<br/> we'll be in touch shortly!</p>
                                </div>
                            </div>
                        :
                            <div className="card-container">
                                <div class="card">
                                    <div className="icon-container">
                                    <i class="checkmark-false">X</i>
                                    </div>
                                    <h1 className="title-false">Unsuccess</h1> 
                                    <p className="sub-title-false">Your request has not been fulfilled;<br/>Please try again!</p>
                                </div>
                            </div>
                                
                        }
                    </div>
                }
                {/*  */}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
