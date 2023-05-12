import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import {getAllCodeService} from "../../../services/userService"
import { LANGUAGES } from "../../../utils";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],  
        };
    }

    async componentDidMount() {
        try { 
            let res = await getAllCodeService('gender')
            if(res && res.errCode === 0 ) {
                this.setState({
                    genderArray : res.data
                });
            }

        }catch(e) {
            console.log(e);
        }
    }

    render() {
        let genders = this.state.genderArray
        let language = this.props.language
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
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3 mt-4">
                                <label for="inputState" ><FormattedMessage id="manager-user.role"/>: </label>
                                <select id="inputState" class="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
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
        language: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
