import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";


const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: '',
            description:'',
            listDoctors: []
        };
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({ 
            contentMarkdown: text,
            contentHTML: html,
        });
        console.log("handleEditorChange", html, text);
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
        console.log('check state', this.state)
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
        })
    };

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnchangeDescription = (event) => {

        this.setState({
            description: event.target.value
        })
    }

    render() {
        console.log('check state doctors', this.state)
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
                                onChange={this.handleChange}
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
                        />
                    </div>
                    <button
                        className="btn-save"
                        onClick={() => this.handleSaveContentMarkdown()}
                        
                    >
                        Lưu Thông Tin
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
