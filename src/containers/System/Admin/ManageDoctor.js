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
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince : '',
            nameClinic: '',
            addressClinic: '',
            node: '',
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
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === "USERS" ? `${item.firstName} ${item.lastName}` : item.valueEn

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                result.push(obj);
            });

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
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo){
            let {resPayment, resPrice, resProvince} = this.props.allRequireDoctorInfo

            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
            console.log('check duw lieuej res ', dataSelectPrice, dataSelectPayment, dataSelectProvince)

            this.setState({
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
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res = await getDetailInfoDoctorService(selectedDoctor.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown =  res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnchangeDescription = (event) => {

        this.setState({
            description: event.target.value
        })
    }

    render() {
        let {hasOldData} = this.state
        console.log('check state changed', this.state)
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
                            />
                        </div>
                        <div className="content-right form-group">
                            <label><FormattedMessage id="admin.manage-doctor.info-intro"/>: </label>
                            <textarea
                                onChange={(event) => this.handleOnchangeDescription(event)}
                                value={this.state.description}
                                className="form-control"
                            >

                            </textarea>
                        </div>
                    </div>

                    <div className="doctor-info-extra row">
                        <div className="col-4 form-group mt-4 ">
                            <label>Gia Kham :</label>
                            <Select
                                // value={this.state.selectedDoctor}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                                placeholder={'Gia Kham'} 
                            />
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label>Phuong thuc thanh toan :</label>
                            <Select
                                // value={this.state.selectedDoctor}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                                placeholder={'Phuong thuc thanh toan'} 
                            />
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label>chon tinhr thanh :</label>
                            <Select
                                // value={this.state.selectedDoctor}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvinces}
                                placeholder={'chon tinh thanh'} 
                            />
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label>ten phong kham :</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label>dia chi phong kham :</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="col-4 form-group mt-4 ">
                            <label>note :</label>
                            <input className="form-control"></input>
                        </div>
                    </div>
                    {/* markdown editor content doctor */}
                    <div className="manage-doctor-editor">
                        <MdEditor
                            style={{ height: "500px" }}
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
