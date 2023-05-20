import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import {getAllCodeService} from "../../../services/userService"
import { LANGUAGES, CRUD_ACTION } from "../../../utils";
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],  
            roleArray: [],  
            positionArray: [],
            previewImageUrl: '',
            isOpen: false,


            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
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
            let arrGender = this.props.genderRedux
            this.setState({
                genderArray: this.props.genderRedux,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '' 
            })
        }

        if(prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArray: this.props.positionRedux,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '' 
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArray: this.props.roleRedux,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '' 
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrRole = this.props.roleRedux
            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '' ,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '' ,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '' ,
                avatar: '',
                action: CRUD_ACTION.CREATE,

            })
        }

    }
    
    handleOnchange = (event) => {
        let data = event.target.files
        let file = data[0]
        if(file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageUrl: objectUrl,
                avatar: file,
            })
        }
    };
    openPreviewImage = () => {
        if(!this.state.previewImageUrl) return;
        this.setState({
            isOpen: true
        })
    };


    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email',
            'password', 
            'firstName', 
            'lastName', 
            'phoneNumber', 
            'address', ]
            for(let i = 0; i < arrCheck.length; i++) {
                if(!this.state[arrCheck[i]]){
                    isValid = false
                    alert('check missing input ' + arrCheck[i])
                    break;
                }
            }
            return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if(isValid === false) return;
        let {action} = this.state;

        if(action === CRUD_ACTION.CREATE){
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            })
        }
        if(action === CRUD_ACTION.EDIT ){
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                // avatar: this.state.avatar
            })
        }



        
    }

    handleOnchangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        // email:'',
        // password:'',
        // firstName:'',
        // lastName:'',
        // phoneNumber:'',
        // address:'',
        // gender: '',
        // position: '',
        // role: '',
        // avatar: '',
    }
    handEditUserFromParent = (user) => {
        console.log('check handle edit user from parent', user)
        this.setState({
            email: user.email,
            password:'hardcode',
            firstName:user.firstName,
            lastName:user.lastName,
            phoneNumber:user.phoneNumber,
            address:user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
        })
    }
    render() {
        let genders = this.state.genderArray
        let positions = this.state.positionArray
        let roles = this.state.roleArray
        let isGetGender = this.props.isLoadingGender
        let language = this.props.language

        let {email,
            password, 
            firstName, 
            lastName, 
            phoneNumber, 
            address, 
            gender, 
            position, 
            role, 
            avatar} = this.state 



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
                                <input 
                                    value={email} 
                                    onChange={(event) => {this.handleOnchangeInput(event, 'email')}} 
                                    className="form-control" 
                                    id="email" 
                                    name="email" 
                                    type="text" 
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false } ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="password" ><FormattedMessage id="manager-user.password"/>:</label>
                                <input 
                                    value={password} 
                                    onChange={(event) => {this.handleOnchangeInput(event, 'password')}} 
                                    className="form-control" id="password" name="password" type="passWord"
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false }
                                    ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="firstName" ><FormattedMessage id="manager-user.firstName"/>:</label>
                                <input value={firstName} onChange={(event) => {this.handleOnchangeInput(event, 'firstName')}} className="form-control" id="firstName" name="firstName" type="text" ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label htmlFor="lastName" ><FormattedMessage id="manager-user.lastName"/>:</label>
                                <input value={lastName} onChange={(event) => {this.handleOnchangeInput(event, 'lastName')}} className="form-control" id="lastName" name="lastName" type="text" ></input>
                            </div>
                            <div className="col-3 mt-4">
                                <label htmlFor="phone" ><FormattedMessage id="manager-user.phoneNumber"/>: </label>
                                <input value={phoneNumber} onChange={(event) => {this.handleOnchangeInput(event, 'phoneNumber')}} className="form-control" id="phone" name="phone" type="text" ></input>
                            </div>
                            <div className="col-9 mt-4">
                                <label htmlFor="address" ><FormattedMessage id="manager-user.address"/>: </label>
                                <input value={address} onChange={(event) => {this.handleOnchangeInput(event, 'address')}} className="form-control" id="address" name="address" type="text" ></input>
                            </div>
                            <div className="col-4 mt-4">
                                <label ><FormattedMessage id="manager-user.gender"/>: </label>
                                <select value={gender} className="form-select" onChange={(event) => {this.handleOnchangeInput(event, 'gender')}}> 
                                    {genders && genders.length > 0 && genders.map((item, index) =>{
                                        return (
                                            <option key={index} selected value={item.key}>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-4 mt-4">
                                <label ><FormattedMessage id="manager-user.position"/>: </label>
                                <select value={position} className="form-select" onChange={(event) => {this.handleOnchangeInput(event, 'position')}}>
                                    {positions && positions.length > 0 && positions.map((item, index) =>{
                                        return (
                                            <option key={index} selected value={item.key}>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-4 mt-4">
                                <label ><FormattedMessage id="manager-user.role"/>: </label>
                                <select value={role} className="form-select" onChange={(event) => {this.handleOnchangeInput(event, 'role')}}>
                                    {roles && roles.length > 0 && roles.map((item, index) =>{
                                        return (
                                            <option key={index} selected value={item.key}>
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
                                <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-info" : "btn btn-primary"}
                                onClick={() => this.handleSaveUser()}
                                
                                >
                                   { this.state.action === CRUD_ACTION.EDIT ? 
                                   <FormattedMessage id="manager-user.editUser"/> : <FormattedMessage id="manager-user.save"/>
                                
                                }
                                    
                                </button>
                            </div>
                            <div className="col-12 mt-5 mb-5">
                                <TableManageUser 
                                    handEditUserFromParent= {this.handEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                            
                            
                        </div>
                    </div>
                </div>

                

                {/* //review ảnh */}
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
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),

       //processLogout: () => dispatch(actions.processLogout()),
        //fire action của redux (có tên là changeLanguageApp)
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
