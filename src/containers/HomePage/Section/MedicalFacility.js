import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinicService }  from '../../../services/userService'
import { withRouter } from "react-router";



class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataClinics:[],
        }
    }
    async componentDidMount () {
        let res = await getAllClinicService()
        if(res && res.errCode === 0 ) { 
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
        console.log('check res ',res)
    }

    handleViewDetailClinic = (clinic) => {
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let{dataClinics} = this.state
        return (
            <div className="section-content section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">Cơ Sở Y Tế Nổi Bật</span>
                        <button className="section-btn">Tìm kiếm</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        {dataClinics && dataClinics.length > 0 && dataClinics.map(
                            (item, index) => {
                                return(
                                    <div 
                                        className="section-item" 
                                        key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className="section-item-container"> 
                                            <div 
                                                className="bg-img"
                                                style={{backgroundImage: `url(${item.image})`}}
                                            ></div>
                                            <div className="section-item-text">{item.name}</div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                        
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
