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
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: '',
            description:'',
            listDoctors: [],
            hasOldData: false
        };
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({ 
            contentMarkdown: text,
            contentHTML: html,
        });
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 ){
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                result.push(obj);
            });

        }
        return result;

    }
    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    //hamf up date laij props 
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
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
                        Thêm Thông Tin Bác Sĩ
                    </div>
                    <div className="more-info">
                        <div className="content-left form-group">
                            <label>Chọn bác sĩ: </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                
                            />
                        </div>
                        <div className="content-right form-group">
                            <label>Thông tin giới thiệu: </label>
                            <textarea
                                onChange={(event) => this.handleOnchangeDescription(event)}
                                value={this.state.description}
                                className="form-control"
                                rows="4"></textarea>
                        </div>
                    </div>
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
                        {hasOldData === true ? <spam>Lưu thông tin</spam> : <span>Tạo thông tin</span>}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
