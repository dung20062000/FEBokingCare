import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import {getDetailInfoDoctorService} from "../../../services/userService"


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: '',
            description:'',
            listDoctors: [],
            hasOldData: false,


            //save infoDoctor to table
            listPrice:[],
            listPayment:[],
            listProvinces:[],
            listClinic:[],
            listSpecialty:[],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince : '',
            selectedClinic : '',
            selectedSpecialty : '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
            
        };
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({ 
            contentMarkdown: text,
            contentHTML: html,
        });
    }
    buildDataInputSelect = (inputData, type) => {

        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 ){
            if(type === 'USERS'){
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}` 
                    let labelEn = `${item.firstName} ${item.lastName}`
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.id
                    result.push(obj);
                });
            }
            if(type === "PRICE"){
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}` 
                    let labelEn = `${item.valueEn} USD`
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj);
                });
            }
            if(type === 'PAYMENT' || type === 'PROVINCE'){
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}` 
                    let labelEn = `${item.valueEn} USD`
    
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj);
                });
            }
            if(type === "SPECIALTY"){
                inputData.map((item, index) => {
                    let obj = {};
    
                    obj.label = item.name
                    obj.value = item.id
                    result.push(obj);
                });
            }
            if(type === "CLINIC"){
                inputData.map((item, index) => {
                    let obj = {};
    
                    obj.label = item.name
                    obj.value = item.id
                    result.push(obj);
                });
            }
        }
        return result;

    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequireDoctorInfo()
    }

    //hamf up date laij props 
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo){
            let {resPayment, resPrice, resProvince, resSpecialty, resClinic} = this.props.allRequireDoctorInfo

            let dataSelectPrice = this.buildDataInputSelect(resPrice,"PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty,"SPECIALTY")
            let dataSelectClinic = this.buildDataInputSelect(resClinic,"CLINIC")
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvinces: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            let {resPayment, resPrice, resProvince} = this.props.allRequireDoctorInfo

            let dataSelectPrice = this.buildDataInputSelect(resPrice,"PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            this.setState({
                listDoctors: dataSelect,
                
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvinces: dataSelectProvince,
            })
        }
    }

    handleSaveContentMarkdown = () => {
    let {hasOldData} = this.state

        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince : this.state.selectedProvince.value,

            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ?  this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    };

    handleChangeSelect = async (selectedDoctor, name) => {
        this.setState({ selectedDoctor });
        let {listPayment, listProvinces, listPrice, listSpecialty, listClinic} = this.state

        let res = await getDetailInfoDoctorService(selectedDoctor.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown =  res.data.Markdown

            let addressClinic='', nameClinic='', note ='', paymentId='', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
            
                selectedPayment = '', selectedProvince = '', selectedPrice = '', selectedSpecialty = '', selectedClinic=''


            if(res.data.Doctor_Info){
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;

                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId
                provinceId = res.data.Doctor_Info.provinceId
                specialtyId = res.data.Doctor_Info.specialtyId
                clinicId = res.data.Doctor_Info.clinicId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvinces.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }


            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,

                selectedPayment: selectedPayment,   
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

                nameClinic: '',
                addressClinic: '',
                note: '',

                selectedPayment: '',   
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ""
            })
        }
    };
    handleChangSelectDoctorInfo = async (selectedDoctor, name) =>{
        let stateName =  name.name;
        let stateCopy = {...this.state}
        stateCopy[stateName] = selectedDoctor
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeText = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let {hasOldData } = this.state
        // console.log('check state', this.state)

        return (
            <div>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        <FormattedMessage id="admin.manage-doctor.title"/>
                    </div>
                    <div className="more-info">
                        <div className="content-left form-group">
                            <label><FormattedMessage id="admin.manage-doctor.choose-doctor"/>: </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={'chon bac si'} 
                                name={<FormattedMessage id="admin.manage-doctor.choose-doctor"/>}
                            />
                        </div>
                        <div className="content-right form-group">
                            <label><FormattedMessage id="admin.manage-doctor.info-intro"/>: </label>
                            <textarea
                                onChange={(event) => this.handleOnchangeText(event,'description')}
                                value={this.state.description}
                                className="form-control"
                            >

                            </textarea>
                        </div>
                    </div>

                    <div className="doctor-info-extra row">
                        <div className="col-4 form-group mt-4 ">
                            <label><FormattedMessage id="admin.manage-doctor.price"/> :</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price"/>} 
                                name={"selectedPrice"}
                            />
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label><FormattedMessage id="admin.manage-doctor.payment"/>  :</label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>} 
                                name={"selectedPayment"}
                            />
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label><FormattedMessage id="admin.manage-doctor.province"/> :</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangSelectDoctorInfo}
                                options={this.state.listProvinces}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province"/>} 
                                name={"selectedProvince"}
                            />
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label><FormattedMessage id="admin.manage-doctor.name-clinic"/> :</label>
                            <input className="form-control"
                                onChange={(event) => this.handleOnchangeText(event,'nameClinic')}
                                value={this.state.nameClinic}
                            
                            ></input>
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label><FormattedMessage id="admin.manage-doctor.add-clinic"/> :</label>
                            <input className="form-control"
                                onChange={(event) => this.handleOnchangeText(event,'addressClinic')}
                                value={this.state.addressClinic}
                            ></input>
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label><FormattedMessage id="admin.manage-doctor.note"/> :</label>
                            <input className="form-control"
                                onChange={(event) => this.handleOnchangeText(event,'note')}
                                value={this.state.note}
                            ></input>
                        </div>

                        <div className="col-4 form-group mt-4">
                            <label><FormattedMessage id="admin.manage-doctor.specialty"/></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangSelectDoctorInfo}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>} 
                                name={'selectedSpecialty'}
                            />
                        </div>

                        <div className="col-4 form-group mt-4">
                            <label><FormattedMessage id="admin.manage-doctor.clinic"/></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangSelectDoctorInfo}
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id="admin.manage-doctor.clinic"/>} 
                                name={'selectedClinic'}
                            />
                        </div>
                    </div>
                    {/* markdown editor content doctor */}
                    <div className="manage-doctor-editor">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button
                        className={ hasOldData === true ? "btn-save" : "btn-edit-detail-doctor"}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ? <spam><FormattedMessage id="admin.manage-doctor.save-info"/></spam> : 
                        <span><FormattedMessage id="admin.manage-doctor.create-info"/></span>}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequireDoctorInfo: state.admin.allRequireDoctorInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
