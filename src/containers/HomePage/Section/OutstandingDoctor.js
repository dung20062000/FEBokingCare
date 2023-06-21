import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
// Import css files



class OutstandingDoctor extends Component {
    // history = useHistory()
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
            console.log(
                "check chuyen khoa arrDoctors",
                this.props.topDoctorsRedux
            );
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = (doctor) =>{
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
        
    }
    render() {
        let {language} = this.props
        let arrDoctors = this.state.arrDoctors
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        return (
            <div className="section-content section-OutstandingDoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title"><FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className="section-btn"><FormattedMessage id="homepage.more-info" /></button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>

                        {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                            let imageBase64 = ''
                            if(item.image){
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                
                            }
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                            
                            return(
                                <div className="section-doctor" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                <div className="section-doctor-border">
                                    <div className="img-doctor"
                                        style={{backgroundImage: `url(${imageBase64})`}}
                                    ></div>
                                    <div className="section-item-text-doctor">
                                        <div className="doctor-name">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        {/* <span>Khoa nào đó 1</span> */}
                                    </div>
                                </div>
                            </div>
                            )
                        })}
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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
