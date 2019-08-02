import React, { Component } from 'react';
import { Formik } from 'formik';
import Loader from '../../../shared/loader/Loader';
import Input from '../../../shared/inputs/input/Input';

class PasswordForm extends Component {
  state = {
    loading: false,
    passwordError: '',
  };

  handleSubmit = values => {
    let { password } = values;
    this.setState({ loading: true });

    this.props
      .createProfile(password)
      .then(response => {
        this.props.history.push('/orders/added');
      })
      .catch(error => {
        this.setState({ loading: false, passwordError: error.message });
      });
  };

  renderForm = ({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => (
    <form className="form LoginLayout__form" onSubmit={handleSubmit}>
      <Input
        className="LoginLayout__input"
        name="password"
        onChange={handleChange}
        onBlur={() => setFieldTouched('password')}
        touched={touched.password}
        error={errors.password}
        type="password"
        label="Придумайте пароль"
        placeholder="Введите пароль"
        wrapperType="full"
      />
      <Input
        className="LoginLayout__input"
        name="passwordCopy"
        onChange={handleChange}
        onBlur={() => setFieldTouched('passwordCopy')}
        touched={touched.passwordCopy}
        error={errors.passwordCopy}
        type="password"
        label="Повторите пароль"
        placeholder="Введите пароль"
        wrapperType="full"
      />
      {!this.state.loading && this.state.passwordError && (
        <p className="text--error">{this.state.passwordError}</p>
      )}
      {this.state.loading && <Loader />}
      <button type="submit" className="button">
        Send
      </button>
    </form>
  );

  validateForm = values => {
    const errors = {};

    if (!values.password) {
      errors.password = 'Введите пароль';
    }

    if (values.password && values.password.length < 6) {
      errors.password = 'Не меньше 6 символов';
    }

    if (!values.passwordCopy) {
      errors.passwordCopy = 'Повторите пароль';
    }

    if (values.password !== values.passwordCopy) {
      errors.passwordCopy = 'Пароли не совпадают';
    }

    return errors;
  };

  render() {
    const { otpSuccess, otpSent } = this.props;
    return otpSuccess && otpSent ? (
      <Formik
        onSubmit={values => this.handleSubmit(values)}
        render={this.renderForm}
        validate={this.validateForm}
        initialValues={{
          password: '',
          passwordCopy: '',
        }}
      />
    ) : null;
  }
}

export default PasswordForm;
