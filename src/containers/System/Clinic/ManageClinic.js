import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CommonUtils } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import "react-markdown-editor-lite/lib/index.css";
import { toast } from 'react-toastify';
import {createNewClinic} from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            address: '',
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
    handleSaveClinic = async() => {
        let result = await createNewClinic(this.state)
        if(result && result.errCode === 0 ){
            toast.success('created new clinic successfully')
            this.setState({
                name:'',
                address:'',
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
                <div className="title">Quan li Phòng khám</div>

                <div className="add-new-specialty row mt-5 mb-4">
                    <div className="col-6 form-group mt-4">
                        <label> Ten Phòng khám</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.name}
                            onChange={(e) => this.handleChangeInput(e, 'name')}
                            
                        ></input>
                    </div>
                    <div className="col-6 form-group mt-4">
                        <label> Anh phòng khám :</label>
                        <br/><input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                            
                        ></input>
                    </div>
                    <div className="col-6 form-group mt-4">
                        <label> Địa phòng khám :</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.address}
                            onChange={(e) => this.handleChangeInput(e, 'address')}
                            
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
                        onClick={() => this.handleSaveClinic()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
