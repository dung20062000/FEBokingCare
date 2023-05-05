import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files



class OutstandingDoctor extends Component {
    render() {
        return (
            <div className="section-content section-OutstandingDoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Bác Sĩ Nổi Bật Tuần Qua</span>
                        <button className="section-btn">Tìm kiếm</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className="section-doctor">
                            <div className="section-doctor-border">
                                <div className="img-doctor"></div>
                                <div className="section-item-text-doctor">
                                    <div className="doctor-name">Tên Bác Sĩ 1</div>
                                    <span>Khoa nào đó 1</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-doctor">
                            <div className="section-doctor-border">
                                <div className="img-doctor"></div>
                                <div className="section-item-text-doctor">
                                    <div className="doctor-name">Tên Bác Sĩ 1</div>
                                    <span>Khoa nào đó 1</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-doctor">
                            <div className="section-doctor-border">
                                <div className="img-doctor"></div>
                                <div className="section-item-text-doctor">
                                    <div className="doctor-name">Tên Bác Sĩ 1</div>
                                    <span>Khoa nào đó 1</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-doctor">
                            <div className="section-doctor-border">
                                <div className="img-doctor"></div>
                                <div className="section-item-text-doctor">
                                    <div className="doctor-name">Tên Bác Sĩ 1</div>
                                    <span>Khoa nào đó 1</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-doctor">
                            <div className="section-doctor-border">
                                <div className="img-doctor"></div>
                                <div className="section-item-text-doctor">
                                    <div className="doctor-name">Tên Bác Sĩ 1</div>
                                    <span>Khoa nào đó 1</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-doctor">
                            <div className="section-doctor-border">
                                <div className="img-doctor"></div>
                                <div className="section-item-text-doctor">
                                    <div className="doctor-name">Tên Bác Sĩ 1</div>
                                    <span>Khoa nào đó 1</span>
                                </div>
                            </div>
                        </div>
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
