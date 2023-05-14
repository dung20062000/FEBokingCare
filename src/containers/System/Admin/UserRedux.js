import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import {getAllCodeService} from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions"
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],  
            roleArray: [],  
            positionArray: [],  
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        //gender
        // try { 
        //     let res = await getAllCodeService('gender')
        //     if(res && res.errCode === 0 ) {
        //         this.setState({
        //             genderArray : res.data
        //         });
        //     }

        // }catch(e) {
        //     console.log(e);
        // }
        //vai trò
        // try { 
        //     let res = await getAllCodeService('role')
        //     if(res && res.errCode === 0 ) {
        //         this.setState({
        //             roleArray : res.data
        //         });
        //     }

        // }catch(e) {
        //     console.log(e);
        // }
        // //chuc danh
        // try { 
        //     let res = await getAllCodeService('position')
        //     if(res && res.errCode === 0 ) {
        //         this.setState({
        //             positionArray : res.data
        //         });
        //     }

        // }catch(e) {
        //     console.log(e);
        // }

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
    }
    render() {
        let genders = this.state.genderArray
        let roles = this.state.roleArray
        let position = this.state.positionArray
        let language = this.props.language
        console.log('check prop genderRedux: ', this.props.genderRedux);
        return (
            <div className="user-redux-container">
                <div className="title">User Redux </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-form"><FormattedMessage id="manager-user.add"/></div>
                            </div>
                            <div className="col-6 mt-4">
                                <label for="email" ><FormattedMessage id="manager-user.email"/>:</label>
                                <input className="form-control" id="email" name="email" type="text" ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label for="password" ><FormattedMessage id="manager-user.email"/>:</label>
                                <input className="form-control" id="password" name="password" type="password " ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label for="firstName" ><FormattedMessage id="manager-user.firstName"/>:</label>
                                <input className="form-control" id="firstName" name="firstName" type="text" ></input>
                            </div>
                            <div className="col-6 mt-4">
                                <label for="lastName" ><FormattedMessage id="manager-user.lastName"/>:</label>
                                <input className="form-control" id="lastName" name="lastName" type="text" ></input>
                            </div>
                            <div className="col-3 mt-4">
                                <label for="phone" ><FormattedMessage id="manager-user.phoneNumber"/>: </label>
                                <input className="form-control" id="phone" name="phone" type="text" ></input>
                            </div>
                            <div className="col-9 mt-4">
                                <label for="address" ><FormattedMessage id="manager-user.address"/>: </label>
                                <input className="form-control" id="address" name="address" type="text" ></input>
                            </div>
                            <div className="col-3 mt-4">
                                <label for="gender" ><FormattedMessage id="manager-user.gender"/>: </label>
                                <select id="inputState" class="form-select">
                                    {genders && genders.length > 0 && genders.map((item, index) =>{
                                        return (
                                            <option key={index} selected>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3 mt-4">
                                <label for="inputState" ><FormattedMessage id="manager-user.position"/>: </label>
                                <select id="inputState" class="form-select">
                                    {position && position.length > 0 && position.map((item, index) =>{
                                        return (
                                            <option key={index} selected>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3 mt-4">
                                <label for="inputState" ><FormattedMessage id="manager-user.role"/>: </label>
                                <select id="inputState" class="form-select">
                                    {roles && roles.length > 0 && roles.map((item, index) =>{
                                        return (
                                            <option key={index} selected>
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3 mt-4">
                                <label for="image" ><FormattedMessage id="manager-user.image"/>: </label>
                                <input className="form-control" id="image" name="image" type="text" ></input>
                            </div>
                            <div className="col-12 mt-5">
                                <button className="btn btn-primary"><FormattedMessage id="manager-user.save"/></button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
       //processLogout: () => dispatch(actions.processLogout()),
        //fire action của redux (có tên là changeLanguageApp)
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
