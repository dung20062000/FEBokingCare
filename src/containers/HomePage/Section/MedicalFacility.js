import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";


class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-content section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Cơ Sở Y Tế Nổi Bật</span>
                        <button className="section-btn">Tìm kiếm</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Bệnh viện Hữu nghị Việt Đức 1</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Bệnh viện Hữu nghị Việt Đức 2</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Bệnh viện Hữu nghị Việt Đức 3</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Bệnh viện Hữu nghị Việt Đức 4</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Bệnh viện Hữu nghị Việt Đức 5</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Bệnh viện Hữu nghị Việt Đức 6</div>
                            </div>
                        </div>
                    </Slider>
                    </div>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
