import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CommonUtils } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import "react-markdown-editor-lite/lib/index.css";
import { toast } from 'react-toastify';
import {createNewSpecialty} from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }
    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({ 
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    }
    
    handleOnchangeImage = async(event) => {
        let data = event.target.files
        let file = data[0]
        if(file) {
            let base64 = await CommonUtils.getBase64(file)

            this.setState({
                imageBase64: base64,

            })
        }
    };
    handleSaveSpecialty = async() => {
        let result = await createNewSpecialty(this.state)
        if(result && result.errCode === 0 ){
            toast.success('created new Specialty successfully')
            this.setState({
                name:'',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else{
            toast.error('error creating new Specialty')
            console.log('check state: ' , result)
        }
    }
    render() {

        return (
            <div className="manage-specialty-container">
                <div className="title">Quan li chuyen khoa</div>

                <div className="add-new-specialty row mt-5 mb-4">
                    <div className="col-6 form-group">
                        <label> Ten chuyen khoa</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.name}
                            onChange={(e) => this.handleChangeInput(e, 'name')}
                            
                        ></input>
                    </div>
                    <div className="col-6 form-group">
                        <label> Anh chuyen khoa :</label>
                        <br/><input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                            
                        ></input>
                    </div>
                </div>
                <div>
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div>
                    <button 
                        className="btn btn-primary mt-3"
                        onClick={() => this.handleSaveSpecialty()}
                    >Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
