import React, { Component } from 'react';
import PhoneForm from './phone-form/PhoneForm';

import { connect } from 'react-redux';
import { fetchToken, registration } from '../../../store/actions/auth.actions';
import OtpForm from './otp-form/OtpForm';
import PasswordForm from './password-form/PasswordForm';

import logoImg from '../../../assets/images/logo.png';

class Registration extends Component {
  state = {
    otpSent: false,
    otpSuccess: false,
    phone: '',
  };

  sendOtp = otp => {
    let { phone } = this.state;
    let password = `otp:${otp}`;
    let scope = 'register';
    phone = phone.replace(/[_+()-\s]/g, '');

    return this.props.fetchToken(phone, password, scope);
  };

  createProfile = password => {
    let { phone } = this.state;
    phone = phone.replace(/[_+()-\s]/g, '');

    return this.props.registration(phone, password);
  };

  handleOtpSent = phone => {
    this.setState({
      otpSent: true,
      phone,
    });
  };

  savePhone = phone => {
    this.setState({ phone });
  };

  setOtpSent = value => {
    this.setState({ otpSent: value });
  };

  setOtpSuccess = value => {
    this.setState({ otpSuccess: value });
  };

  render() {
    const { otpSent, otpSuccess } = this.state;
    const { history } = this.props;

    return (
      <div className="LoginLayout">
        <div className="LoginLayout__content">
          <img alt="logo" className="LoginLayout__logo" src={logoImg} />
          <h1 className="LoginLayout__title">Регистрация</h1>

          <PhoneForm savePhone={this.savePhone} setOtpSent={this.setOtpSent} otpSent={otpSent} />
          <OtpForm
            otpSent={otpSent}
            otpSuccess={otpSuccess}
            setOtpSent={this.setOtpSent}
            setOtpSuccess={this.setOtpSuccess}
            sendOtp={this.sendOtp}
          />
          <PasswordForm
            otpSent={otpSent}
            otpSuccess={otpSuccess}
            createProfile={this.createProfile}
            history={history}
          />

          <p className="LoginLayout__credits">Все права защищены, 2019</p>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchToken, registration },
)(Registration);
