import React, { Component } from "react";
import { connect } from "react-redux";
import "./HealthHandBook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files



class HealthHandBook extends Component {
    render() {
        return (
            <div className="section-content section-HealthHandBook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Cẩm Nang</span>
                        <button className="section-btn">Tất cả bài viết</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Cẩm Nang 1</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Cẩm Nang 2</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Cẩm Nang 3</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Cẩm Nang 4</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Cẩm Nang 5</div>
                            </div>
                        </div>
                        <div className="section-item">
                            <div className="section-item-container"> 
                                <div className="bg-img"></div>
                                <div className="section-item-text">Cẩm Nang 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthHandBook);
