import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Loader from '../../../shared/loader/Loader';
import Input from '../../../shared/inputs/input/Input';

import { generateOtp } from '../../../../services/auth';

export default class PhoneForm extends Component {
  state = {
    loading: false,
    otpError: '',
  };

  handleSubmit = values => {
    const { savePhone, setOtpSent } = this.props;
    let { phone } = values;
    let otpFor = 'register';
    phone = phone.replace(/[_+()-\s]/g, '');

    this.setState({ loading: true });

    generateOtp(phone, 0, 0, otpFor)
      .then(() => {
        savePhone(phone);
        setOtpSent(true);
      })
      .catch(error => {
        if (error.response) {
          this.setState({ otpError: error.response.data.message });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  renderForm = ({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => (
    <form className="form LoginLayout__form" onSubmit={handleSubmit}>
      <Input
        className="LoginLayout__input"
        placeholder="Номер телефона"
        name="phone"
        onChange={handleChange}
        onBlur={() => setFieldTouched('phone')}
        touched={touched.phone}
        error={errors.phone}
        label="Номер телефона"
        wrapperType="full"
      />
      {!this.state.loading && this.state.otpError && (
        <p className="text--error">{this.state.otpError}</p>
      )}
      {this.state.loading && <Loader />}
      <div className="button-group">
        <Link to="/login">
          <button type="button" className="button button--empty">
            Логин
          </button>
        </Link>
        <button type="submit" className="button">
          Получить смс
        </button>
      </div>
    </form>
  );

  validateForm = values => {
    const errors = {};

    if (!values.phone) {
      errors.phone = 'Введите номер телефона';
    } else {
      let phone = values.phone.replace(/[_+()-\s]/g, '');

      if (phone.length < 11) {
        errors.phone = 'Неправильный формат';
      }
    }

    return errors;
  };

  render() {
    const { otpSent } = this.props;

    return !otpSent ? (
      <Formik
        onSubmit={values => this.handleSubmit(values)}
        render={this.renderForm}
        validate={this.validateForm}
        initialValues={{
          phone: '',
        }}
      />
    ) : null;
  }
}
