import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./HomeFooter.scss";
import logo from "../../../assets/images/logo/logo_bookingcare.svg"
import license from "../../../assets/images/logo/bo-cong-thuong.svg"
// Import css files



class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-content-left">
                            <div>
                                <a><img className="footer-logo" src={logo}/></a>
                            </div>
                            
                            <div className="address-left">
                                <h4>Công ty Cổ phần Công nghệ BookingCare</h4>
                                <p>
                                <i className="fas fa-map-marker-alt"></i>
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                                </p>
                                <p>
                                    <i className="fas fa-check-circle"></i>
                                    ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                                </p>
                                <p>
                                    <span><img className="footer-logo-license" src={license}/></span>
                                    <span><a href="#"><img className="footer-logo-license" src={license}/></a></span>
                                </p>
                            </div>
                        </div>
                        <div className="footer-content-center">
                            <ul>
                                <li>
                                    <a href="#">Liên hệ hợp tác</a>
                                </li>
                                <li>
                                    <a href="#">Sức khỏe doanh nghiệp</a>
                                </li>
                                <li>
                                    <a href="#">Gói chuyển đổi số doanh nghiệp</a>
                                </li>
                                <li>
                                    <a href="#">Tuyển dụng</a>
                                </li>
                                <li>
                                    <a href="#">Câu hỏi thường gặp</a>
                                </li>
                                <li>
                                    <a href="#">Điều khoản sử dụng</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách Bảo mật</a>
                                </li>
                                <li>
                                    <a href="#">Quy trình hỗ trợ giải quyết khiếu nại</a>
                                </li>
                                <li>
                                    <a href="#">Quy chế hoạt động</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-content-right">
                            <div className="content-right-department">
                                <h4>Trụ sở tại Hà Nội</h4>
                                <p>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                            </div>
                            <div className="content-right-department">
                                <h4>Văn phòng tại TP Hồ Chí Minh</h4>
                                <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                            </div>
                            <div className="content-right-department">
                                <h4>Hỗ trợ khách hàng</h4>
                                <p>support@bookingcare.vn (7h - 18h)</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-app">
                        <p>
                            <i className="fas fa-mobile"></i>
                            <span> Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: </span>
                            <span> <a href="#"> Android</a></span> - 
                            <span> <a href="#">iPhone/iPad</a></span> - 
                            <span> <a href="#">Khác</a></span>
                        </p>
                    </div>
                </div>

                <div className="footer-end">
                    <p> &copy; Bùi Tiến Dũng  2023: <a target="_blank" href="https://www.facebook.com/profile.php?id=100009209111884">More information</a></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
