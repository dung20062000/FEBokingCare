import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import {getAllCodeService} from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],  
            roleArray: [],  
            positionArray: [],
            previewImageUrl: '',
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => disUpdate
        //hiện tại(this) và quá khứ(prevProps)
        //[] -> [3]
        //[3] = [3] -> khi giông nhau thì k render lại nữa
        //
        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArray: this.props.genderRedux
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArray: this.props.positionRedux
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArray: this.props.roleRedux
            })
        }

    }
    
    handleOnchange = (event) => {
        let data = event.target.files
        let file = data[0]
        if(file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageUrl: objectUrl
            })
        }
    };
    openPreviewImage = () => {
        if(!this.state.previewImageUrl) return;
        this.setState({
            isOpen: true
        })
    };

    render() {
        let genders = this.state.genderArray
        let positions = this.state.positionArray
        let roles = this.state.roleArray
        let isGetGender = this.props.isLoadingGender
        let language = this.props.language
        console.log('check prop: ', this.state);
        return (
            <div className="user-redux-container">
                <div className="title">User Redux </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-form"><FormattedMessage id="manager-user.add"/></div>
                                <div className="col-12"><div>{isGetGender === true ? 'loading Genders' : '' }</div></div>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="email" ><FormattedMessage id="manager-user.email"/>:</label>
                                <input className="form-control" id="email" name="email" type="text" ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="password" ><FormattedMessage id="manager-user.email"/>:</label>
                                <input className="form-control" id="password" name="password" type="password " ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="firstName" ><FormattedMessage id="manager-user.firstName"/>:</label>
                                <input className="form-control" id="firstName" name="firstName" type="text" ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="lastName" ><FormattedMessage id="manager-user.lastName"/>:</label>
                                <input className="form-control" id="lastName" name="lastName" type="text" ></input>
                            </div>
                            <div className="col-3 mt-4">
                                <label htmlFor="phone" ><FormattedMessage id="manager-user.phoneNumber"/>: </label>
                                <input className="form-control" id="phone" name="phone" type="text" ></input>
                            </div>
                            <div className="col-9 mt-4">
                                <label htmlFor="address" ><FormattedMessage id="manager-user.address"/>: </label>
                                <input className="form-control" id="address" name="address" type="text" ></input>
                            </div>
                            <div className="col-4 mt-4">
                                <label htmlFor="gender" ><FormattedMessage id="manager-user.gender"/>: </label>
                                <select id="inputState" className="form-select">
                                    {genders && genders.length > 0 && genders.map((item, index) =>{
                                        return (
                                            <option key={index} selected>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-4 mt-4">
                                <label htmlFor="inputState" ><FormattedMessage id="manager-user.position"/>: </label>
                                <select id="inputState" className="form-select">
                                    {positions && positions.length > 0 && positions.map((item, index) =>{
                                        return (
                                            <option key={index} selected>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-4 mt-4">
                                <label htmlFor="inputState" ><FormattedMessage id="manager-user.role"/>: </label>
                                <select id="inputState" className="form-select">
                                    {roles && roles.length > 0 && roles.map((item, index) =>{
                                        return (
                                            <option key={index} selected>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-12 mt-4">
                                    <label htmlFor="image" ><FormattedMessage id="manager-user.image"/>: </label>
                                    <div className="preview-image-container col-6">
                                        <input className="form-control" id="image" name="image" type="file" hidden onChange={(event) => this.handleOnchange(event)} ></input>
                                        <label className="label-upload" htmlFor="image">Tải Ảnh <i className="fas fa-upload"></i></label>
                                        <div className="preview-image"
                                            style={{backgroundImage: `url(${this.state.previewImageUrl})`}}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                            </div>
                            <div className="col-12 mt-5">
                                <button className="btn btn-primary"><FormattedMessage id="manager-user.save"/></button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
       //processLogout: () => dispatch(actions.processLogout()),
        //fire action của redux (có tên là changeLanguageApp)
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
