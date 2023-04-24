import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../../assets/images/logo/logo_bookingcare.svg"
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">

                    <div className="left-content">
                        <i className="fas fa-bars icon-bar"></i>
                        <img className="header-logo" src={logo} ></img>
                        {/* <div className="header-logo" ></div> */}
                    </div>

                    <div className="center-content">
                        <div className="child-content" >
                            <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                            <div className="subs-title"><FormattedMessage id="home-header.search-doctor"/></div>
                        </div>
                        <div className="child-content" >
                            <div><b><FormattedMessage id="home-header.health-facility"/></b></div>
                            <div className="subs-title"><FormattedMessage id="home-header.Choose-hospital-clinic"/></div>
                        </div>
                        <div className="child-content" >
                            <div><b><FormattedMessage id="home-header.choose-doctor"/></b></div>
                            <div className="subs-title"><FormattedMessage id="home-header.doctor"/></div>
                        </div>
                        <div className="child-content" >
                            <div><b><FormattedMessage id="home-header.medical-checkup-package"/></b></div>
                            <div className="subs-title"><FormattedMessage id="home-header.health-check"/></div>
                        </div>
                    </div>

                    <div className="right-content">
                        <div className="support" >
                            <i className="fas fa-question-circle"></i>
                            <span><FormattedMessage id="home-header.support"/></span>
                        </div>

                        <select id="flag" name="language" class="btn btn-language" >
                                <option value="VN">VN</option>
                                <option value="EN"> EN</option>
                        </select>
                        
                    </div>
                </div>
            </div>
            <div className="home-header-banner" >
                <div className="content-up" >
                <div className="title1" ><FormattedMessage id="banner.title1"/></div>
                    <div className="title2" ><FormattedMessage id="banner.title2"/></div>
                    <div className="search" >
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm gói phẫu thuật" />
                    </div>
                </div>
                <div className="content-down" >
                    <div className="options" >
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-hospital-alt"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.speciality"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-mobile"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.remote-examination"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-book"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.general-examination"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-hand-holding-heart"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.medical-tests"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-procedures"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.mental-health"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-meh"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.dental-examination"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-heartbeat"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.succulent-pack"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-user-shield"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.medical-products"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i class="fas fa-stopwatch"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.health-test"/></div>
                        </div>
                    </div>
                </div>

                    <div className="options" ></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
