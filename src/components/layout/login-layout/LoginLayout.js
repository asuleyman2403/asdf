import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import Input from '../../shared/inputs/input/Input';
import Loader from '../../shared/loader/Loader';

import { connect } from 'react-redux';
import { fetchToken } from '../../../store/actions/auth.actions';

import './LoginLayout.scss';
import logoImg from '../../../assets/images/logo.png';

class LoginLayout extends Component {
  state = {
    loading: false,
    loginError: '',
  };

  handleSubmit = async values => {
    let { phone, password } = values;
    phone = phone.replace(/[_+()-\s]/g, '');
    password = `pwd:${password.trim()}`;
    this.setState({ loading: true });

    try {
      await this.props.fetchToken(phone, password, 'general');
      this.props.history.push('/orders/added');
    } catch (error) {
      this.setState({ loginError: error.message, loading: false });
    }
  };

  validateForm = values => {
    const errors = {};

    if (!values.phone) {
      errors.phone = 'Введите номер телефона';
    } else {
      let phone = values.phone.replace(/[_+()-\s]/g, '');

      if (phone.length < 11) {
        errors.phone = 'Введите правильный номер';
      }
    }

    if (!values.password) {
      errors.password = 'Введите пароль';
    }

    return errors;
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
      <Input
        className="LoginLayout__input"
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={() => setFieldTouched('password')}
        touched={touched.password}
        error={errors.password}
        placeholder="Пароль"
        label="Пароль"
        wrapperType="full"
      />
      {!this.state.loading && this.state.loginError && (
        <p className="text--error">{this.state.loginError}</p>
      )}
      {this.state.loading && <Loader />}
      <div className="button-group">
        <Link to="/registration">
          <button type="button" className="button button--empty">
            Зарегистрироваться
          </button>
        </Link>
        <button type="submit" className="button">
          Войти
        </button>
      </div>
    </form>
  );

  render() {
    return (
      <div className="LoginLayout">
        <div className="LoginLayout__content">
          <img alt="logo" className="LoginLayout__logo" src={logoImg} />
          <h1 className="LoginLayout__title">Добро пожаловать!</h1>
          <Formik
            onSubmit={values => this.handleSubmit(values)}
            render={this.renderForm}
            validate={this.validateForm}
            initialValues={{
              phone: '',
              password: '',
            }}
          />
          <p className="LoginLayout__credits">Все права защищены, 2019</p>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchToken },
)(LoginLayout);
