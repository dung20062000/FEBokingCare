import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader.js";
import Specialty from "./Section/Specialty.js";
import MedicalFacility from "./Section/MedicalFacility.js";
import OutstandingDoctor from "./Section/OutstandingDoctor.js";
import HealthHandBook from "./Section/HealthHandBook.js";
import About from "./Section/About.js";
import HomeFooter from "../HomePage/Footer/HomeFooter.js";
import "./HomePage.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    // handleAfterChange =  (event, slick, currentSlide) => {
    //     console.log('check current slide', currentSlide);
    // }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 740,
                  settings: {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 640 ,
                  settings: {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]
            // apterChange: this.handleAfterChange
        };
        

        return (
            <div>
                <HomeHeader isShowBanner = {true}/>
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <HealthHandBook settings={settings} />
                <About settings={settings} />
                <HomeFooter settings={settings} />

                {/* <div style={{height:'300px'}}></div> */}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
