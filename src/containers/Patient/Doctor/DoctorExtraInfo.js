import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from "react-intl";


import { LANGUAGES } from "../../../utils";
import { getExtraInfoDoctorByIdService } from "../../../services/userService";
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},

        };
    }
    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent)
            if(res && res.errCode === 0 ) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }
    handleShowDetailInfo = () => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo,
        });
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let {language } = this.props
        console.log('check state extraInfo', extraInfo)
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="add-title"><FormattedMessage id="detail-doctors.extra-info-doctor.add-text"/></div>
                    <div className="name-clinic">{ extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</div>
                    <div className="address">{ extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
                </div>
                <div className="content-down">

                    {isShowDetailInfo === false && 
                        <div className="price-title"><FormattedMessage id="detail-doctors.extra-info-doctor.price-text"/>:   
                            <span className="price-number">
                                { extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                    <NumericFormat 
                                        value={extraInfo.priceTypeData.valueVi} 
                                        displayType={"text"} 
                                        thousandSeparator={true} 
                                        suffix={'VND'}
                                    />
                                }
                                { extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                    <NumericFormat 
                                        value={extraInfo.priceTypeData.valueEn} 
                                        displayType={"text"} 
                                        thousandSeparator={true} 
                                        suffix={'$'}
                                    />
                                }
                            </span>
                            <span className="more-info" onClick={() => this.handleShowDetailInfo()}><FormattedMessage id="detail-doctors.extra-info-doctor.detail-info"/></span>
                        
                        </div>
                    }
                    {
                        isShowDetailInfo ===true && 
                        <>  
                            <div className="price-title-second"><FormattedMessage id="detail-doctors.extra-info-doctor.price-text"/>:</div>

                            <div className="price-info">
                                
                                <div className="price-detail-info">
                                    <span className="left"><FormattedMessage id="detail-doctors.extra-info-doctor.price-text"/></span>
                                    <span className="right">
                                        { extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                            <NumericFormat 
                                                value={extraInfo.priceTypeData.valueVi} 
                                                displayType={"text"} 
                                                thousandSeparator={true} 
                                                suffix={'VND'}
                                            />
                                        }
                                        { extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                            <NumericFormat 
                                                value={extraInfo.priceTypeData.valueEn} 
                                                displayType={"text"} 
                                                thousandSeparator={true} 
                                                suffix={'$'}
                                            />
                                        }

                                    </span>
                                </div>
                                <p> { extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </p> 
                                <div className="pay-method">
                                    <FormattedMessage id="detail-doctors.extra-info-doctor.pay-method"/>

                                    { extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI ? extraInfo.paymentTypeData.valueVi : ''}
                                    { extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN ? extraInfo.paymentTypeData.valueEn : ''}
                                </div>
                            </div>

                            <div className="close-info" onClick={() => this.handleShowDetailInfo()}>
                                <FormattedMessage id="detail-doctors.extra-info-doctor.close-info"/>
                            </div>
                        </>
                    }
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
