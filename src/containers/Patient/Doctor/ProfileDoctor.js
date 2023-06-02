import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import  {getProfileDoctorByIdService} from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from 'react-number-format';
import _ from "lodash";
import moment from "moment";


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProFile:{}
        };
    }
    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProFile: data
        })
    }

    getInfoDoctor = async (id) => {
        let results = {}
        if(id) {
            let res = await getProfileDoctorByIdService(id)
            if(res && res.errCode === 0) {
                results = res.data
            }
        }
        return results;

    }
     async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if(this.props.doctorId !== prevProps.doctorId){
            // this.getInfoDoctor(this.props.doctorId)
        }
    }
    
    renderTimeBooking= (dataTime) => {
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let time =  language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ? 
                moment.unix( +dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            
            :   moment.unix( +dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return(
                <>
                    <div>   
                        {time} - {date}
                        <div>Mien phi dat lich</div>
                    </div>
                </>
            )
        }
        return <></>

    }


    render() {
        let {dataProFile, } = this.state
        let {language, isShowDescriptionDoctor, dataTime} = this.props
        console.log('check props', this.props)
        let nameVi = '', nameEn = '';
        if(dataProFile && dataProFile.positionData){
            nameVi = `${dataProFile.positionData.valueVi}, ${dataProFile.lastName} ${dataProFile.firstName}`
            nameEn = `${dataProFile.positionData.valueEn}, ${dataProFile.firstName} ${dataProFile.lastName}`
        }
        console.log('check state', this.state)
        return (
            <div className="profile-doctor">
                <div className="intro-doctor">
                    <div className="content-left"
                        style={{backgroundImage: `url(${dataProFile && dataProFile.image ? dataProFile.image : '' })`}}>
                        
                    </div>

                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}  
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ?
                                <>
                                    { dataProFile && dataProFile.Markdown && dataProFile.Markdown.description &&
                                        <span>
                                            {dataProFile.Markdown.description}
                                        </span>
                                    }
                                </>
                                : 
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className="price">
                    <span> gia kham: </span>
                    { dataProFile &&  dataProFile.Doctor_Info && language === LANGUAGES.VI ?
                        <NumericFormat 
                            value={dataProFile.Doctor_Info.priceTypeData.valueVi } 
                            displayType={"text"} 
                            thousandSeparator={true} 
                            suffix={'VND'}
                        />
                        : ''
                        
                    }

                    { dataProFile &&  dataProFile.Doctor_Info && language === LANGUAGES.EN ?
                         
                        <NumericFormat 
                            value={dataProFile.Doctor_Info.priceTypeData.valueEn} 
                            displayType={"text"} 
                            thousandSeparator={true} 
                            suffix={'$'}
                        />
                        : ''
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
