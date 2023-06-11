import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES , CommonUtils } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from 'react-toastify';
import moment from "moment";

 


class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            imageBase64:'',

        };
    }
    async componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            });
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleOnchangeImage = async(event) => {
        let data = event.target.files
        let file = data[0]
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            
            this.setState({
                imageBase64: base64
            })
        }
    };
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let {isOpenModal, closeRemedyModal, dataModal} = this.props

        return (
            <Modal 
                isOpen={isOpenModal}  
                className={'booking-modal-container'}
                centered
                size="lg"
            >
                <div className="">
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi Hóa Đơn</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <div className="">
                                    <label>Email bệnh nhân</label>
                                    <input 
                                        className="form-control" type="email" value={this.state.email}
                                        onChange={(event) => this.handleChangeEmail(event)}
                                    
                                    ></input>
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <div className="">
                                    <label>Chọn hóa đơn</label>
                                    <input className="form-control" type="file"
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Gửi
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Thoát
                    </Button>
                    </ModalFooter>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
