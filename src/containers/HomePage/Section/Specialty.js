import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import {getAllSpecialtyService} from "../../../services/userService"
// Import css files



class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService()
        console.log('check res: ', res)
        if(res && res.errCode === 0 ){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    render() {
        let {dataSpecialty} = this.state
        return (
            <div className="section-content section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title"><FormattedMessage id="homepage.specialty"/></span>
                        <button className="section-btn"><FormattedMessage id="homepage.more-info"/></button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        {
                           dataSpecialty && dataSpecialty.length> 0 &&
                            dataSpecialty.map((item, index) => {
                                return(
                                    <div className="section-item" key={index}>
                                        <div className="section-item-container"> 
                                            <div 
                                                className="bg-img"
                                                style={{backgroundImage: `url(${item.image})`}}
                                            
                                            ></div>
                                            <div className="section-item-text">{item.name}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                        
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
