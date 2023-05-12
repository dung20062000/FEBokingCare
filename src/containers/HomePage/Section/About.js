import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
import { FormattedMessage } from "react-intl";
import logoVTV from "../../../assets/images/logo/vtv1.png"
// Import css files



class About extends Component {
    render() {
        return (
            <div className="section-content section-About">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Truyền thông nói về BookingCare</span>
                    </div>

                    <div className="section-body section-body-media ">
                        <div className="section-content-left">
                        <iframe
                            width="100%%" 
                            height="320px" 
                            src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>

                        </iframe>
                        </div>
                        <div className="section-content-right">
                        <ul>
                            <li>
                                <a><img className="logo-vtv" src={logoVTV}/></a>
                            </li>
                            <li>
                                <a><img className="logo-vtv" src={logoVTV}/></a>
                            </li>
                            <li>
                                <a><img className="logo-vtv" src={logoVTV}/></a>
                            </li>
                            <li>
                                <a><img className="logo-vtv" src={logoVTV}/></a>
                            </li>
                        </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
