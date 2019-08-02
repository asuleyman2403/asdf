import React, { Component } from 'react';
import { Formik } from 'formik';
import Loader from '../../../shared/loader/Loader';
import MaskedInput from '../../../shared/inputs/input-masked/MaskedInput';

import './OtpForm.scss';

let counter = 60;

export default class OtpForm extends Component {
  state = {
    loading: false,
    otpError: '',
    counterText: '01:00',
  };

  componentDidUpdate() {
    if (this.props.otpSent && counter === 60) {
      this.runCounter();
    }
  }

  handleSubmit = values => {
    let { otp } = values;
    otp = otp.replace(/[_\s]/g, '');
    this.setState({ loading: true });

    this.props
      .sendOtp(otp)
      .then(response => {
        this.props.setOtpSuccess(true);
      })
      .catch(error => {
        this.setState({ otpError: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  runCounter = () => {
    const { otpSuccess, setOtpSent } = this.props;

    const interval = setInterval(() => {
      if (!otpSuccess) {
        const minutes = Math.floor(counter / 60).toString();
        const seconds = (counter - minutes * 60).toString();
        const counterText = `${minutes.length > 1 ? minutes : `0${minutes}`}:${
          seconds.length > 1 ? seconds : `0${seconds}`
        }`;
        counter--;

        if (counter < 0) {
          clearInterval(interval);
          if (!otpSuccess) {
            setOtpSent(false);
          }
        } else {
          this.setState({ counterText });
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  renderForm = ({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => (
    <form onSubmit={handleSubmit}>
      <MaskedInput
        className="LoginLayout__input"
        mask={[/\d/, ' ', /\d/, ' ', /\d/, ' ', /\d/]}
        placeholder="_ _ _ _"
        name="otp"
        onChange={handleChange}
        onBlur={() => setFieldTouched('otp')}
        touched={touched.otp}
        error={errors.otp}
        label="Введите СМС код"
      />
      {!this.state.loading && this.state.otpError && (
        <p className="text--error">{this.state.otpError}</p>
      )}
      {this.state.loading && <Loader />}
      <div className="button-group">
        <button type="submit" className="button">
          Send
        </button>
      </div>
    </form>
  );

  validateForm = values => {
    const errors = {};

    if (!values.otp) {
      errors.otp = 'Введите СМС код';
    } else {
      if (values.otp.length < 4) {
        errors.otp = 'Неправильный формат';
      }
    }

    return errors;
  };

  render() {
    const { otpSent, otpSuccess } = this.props;

    return otpSent && !otpSuccess ? (
      <div>
        <p className="OtpForm__counter" >{this.state.counterText}</p>
        <Formik
          onSubmit={values => this.handleSubmit(values)}
          render={this.renderForm}
          validate={this.validateForm}
          initialValues={{
            otp: '',
          }}
        />
      </div>
    ) : null;
  }
}
