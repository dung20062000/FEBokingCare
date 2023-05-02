import React, { Component } from "react"; // dùng để khai báo các component
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import  {handleLoginApi}  from "../../services/userService";

import * as actions from "../../store/actions";
// import * as actions from "../store/actions";
import "./Login.scss";

class Login extends Component {
    // dùng để khai báo các stated
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowPassword: false,
            errorMessage: ''
        };
    }


    handleChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin = async() => {
        this.setState({
            errorMessage : ''
        });
        try{
            let data =  await handleLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !== 0 ){
                this.setState({
                    errorMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
            }
        }catch(err){
            if(err.response){
                if(err.response.data){
                    this.setState({
                        errorMessage: err.response.data.message
                    })
                }
            }

        }
    }
    
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    render() {
        //JSX

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="login-content row">
                            <div className="col-12 text-login">Login</div>
                            <div className="col-12 form-group login-input">
                                <label>User Name:</label>
                                <input
                                    value={this.state.username}
                                    onChange={(event) => this.handleChangeUserName(event)}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password:</label>
                                <div className="custom-input-password">
                                <input
                                    value={this.state.password}
                                    onChange={(event) => this.handleChangePassword(event)}
                                    type={this.state.isShowPassword ? 'text' : 'password' }
                                    className="form-control"
                                    placeholder="Enter your password"
                                    
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash' }></i>
                                </span>
                                {/* <i className="fas fa-eye-slash"></i> */}
                                </div>
                            </div>
                            <div className="col-12 " style={{color: 'red'}}>
                                {this.state.errorMessage}
                            </div>
                            <div className="col-12 login-input">
                                <button className="btn-login" onClick={() => {this.handleLogin()}} >Login</button>
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">
                                    Forgot your password ?
                                </span>
                            </div>
                            <div className="col-12 text-center mt-4">
                                <span className="text-other-login">
                                    Or login with:
                                </span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-google-plus-g google-icon"></i>
                                <i className="fab fa-facebook facebook-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//hàm của redux chuyển đổi ngôn ngữ
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

//hàm của redux
const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
