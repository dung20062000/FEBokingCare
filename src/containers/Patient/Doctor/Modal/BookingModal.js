import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
 


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {
        let id = this.props.doctorId;

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    render() {
        // toggle={toggle}
        let {isOpenModalBooking, closeBookingModal, dataTime} = this.props
        console.log('check props from data time ', dataTime);
        let doctorId = ''
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }
        return (
            <Modal 
                isOpen={isOpenModalBooking}  
                // isOpen={true}  
                className={'booking-modal-container'}
                centered
                size="lg"
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thoong tin dat lich kham benh</span>
                        <span 
                            className="right"
                            onClick={closeBookingModal}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group mt-3">
                                <label>Ho Ten</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label>So dien thoai</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label>email</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label>DIa chii lien he</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-12 form-group mt-3">
                                <label>li do kham</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label>dat cho ai</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group mt-3">
                                <label>gioi tinh</label>
                                <input className="form-control"></input>
                            </div>
                        </div>

                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm btn btn-primary">Xac Nhan</button>
                        <button 
                            className="btn-booking-cancel btn btn-danger"
                            onClick={closeBookingModal}
                        >Huy</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
