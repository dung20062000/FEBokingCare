import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../../assets/images/logo/logo_bookingcare.svg"
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../../src/utils/"
import { changeLanguageApp } from "../../../store/actions";

class HomeHeader extends Component {

    changeLanguage = (language) => { 
        this.props.changeLanguageAppRedux(language)
        //fire redux event
        
    }





    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">

                    <div className="left-content">
                        <i className="fas fa-bars icon-bar"></i>
                        <img className="header-logo" src={logo} ></img>
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

                        <div className="btn-language" >
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>

                        
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
                            <div className="icon-child" ><i className="fas fa-book"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.general-examination"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-hand-holding-heart"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.medical-tests"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-procedures"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.mental-health"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-meh"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.dental-examination"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-heartbeat"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.succulent-pack"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-user-shield"></i></div>
                            <div className="text-child" ><FormattedMessage id="banner.medical-products"/></div>
                        </div>
                        <div className="option-child" >
                            <div className="icon-child" ><i className="fas fa-stopwatch"></i></div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //fire acction của redux (có tên là changeLanguageApp)
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
