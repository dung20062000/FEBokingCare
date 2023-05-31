import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";

import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
        };
    }
    async componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleShowDetailInfo = () => {
        this.setState({
            isShowDetailInfo: !this.state.isShowDetailInfo,
        });
    }

    render() {
        let { isShowDetailInfo } = this.state;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="add-title">Dia chi kham</div>
                    <div className="name-clinic">Teen phong kham</div>
                    <div className="address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo === false && 
                        <div className="price-title">GIÁ KHÁM: 300.000đ.
                            <span className="more-info" onClick={() => this.handleShowDetailInfo()}> Xem chi tiet</span>
                        
                        </div>
                    }
                    {
                        isShowDetailInfo ===true && 
                        <>  
                            <div className="price-title-second">Giá khám:</div>

                            <div className="price-info">
                                
                                <div className="price-detail-info">
                                    <span className="left">Gia Kham</span>
                                    <span className="right">250.000</span>
                                </div>
                                <p> Được ưu tiên khám trước khi đật khám qua
                                    BookingCare. Giá khám cho người nước ngoài là 30 USD
                                </p> 
                                <div className="pay-method">
                                    Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                            </div>

                            <div className="close-info" onClick={() => this.handleShowDetailInfo()}>
                                An bang gia
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
