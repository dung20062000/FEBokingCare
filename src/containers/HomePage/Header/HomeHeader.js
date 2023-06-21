import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../../assets/images/logo/logo_bookingcare.svg"
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../../src/utils/"
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
     constructor(props) {
        super(props);
        this.state={
            isShowBtnMenu: false,
        }
     }
    changeLanguage = (language) => { 
        this.props.changeLanguageAppRedux(language)
        //fire redux event
        
    }
    returnToHome = () => {
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    goToLogin = () => {
        if(this.props.history){
            this.props.history.push(`/login`)
        }
    }
    handleShowBtnMenu= ()=>{
        this.setState({
            isShowBtnMenu: !this.state.isShowBtnMenu
        })
    }

    render() {
        let language = this.props.language;
        // console.log('check user info', this.props.userInfo);
        return (
            <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">

                    <div className="left-content">
                        <i className="fas fa-bars icon-bar" onClick={() =>this.handleShowBtnMenu()}></i>
                        <img className="header-logo" src={logo} onClick={() => this.returnToHome()} ></img>
                    </div>

                    <div className="center-content">
                        <div className="child-content">
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

                        <div className="btn-login">
                        <i className="fas fa-sign-in-alt icon-login" onClick={() => this.goToLogin()} ></i>
                        </div>

                        
                    </div>
                </div>
            </div>
            {this.state.isShowBtnMenu === true &&
            <div className="menu-btn-container">
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.page"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.hand_book"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.connect_for"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.health"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.package"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.Recruitment"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.patient"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.doctor"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.role"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.connect"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.questions"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.use"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.support"/></div>
                <div className="menu-btn-item"><FormattedMessage id="home-header.sub-menu.Regulations"/></div>
            </div>}
            {this.props.isShowBanner === true &&
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
            }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //fire acction của redux (có tên là changeLanguageApp)
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
