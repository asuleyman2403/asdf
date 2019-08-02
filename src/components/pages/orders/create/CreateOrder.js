import React, { Component } from 'react';
import { Formik } from 'formik';
import BackButton from '../../../shared/buttons/back/BackButton';
import Input from '../../../shared/inputs/input/Input';
import DropdownInput from '../../../shared/inputs/dropdown/DropdownInput';

import { connect } from 'react-redux';
import { addTrackNumber } from '../../../../services/delivery';
import { openFlash, hideFlash } from '../../../../store/actions/flash.actions';
import { addDelivery } from '../../../../store/actions/delivery.actions';

import './CreateOrder.scss';
import mainImg from '../../../../assets/images/create-order.png';
import plusImg from '../../../../assets/images/plus.png';
import acceptedImg from '../../../../assets/images/accepted.png';
import deleteImg from '../../../../assets/images/trash.png';

const categoryOptions = [
  {
    text: 'Category',
    value: 'CATEGORY',
  },
];
class CreateOrder extends Component {
  state = {
    loading: false,
    formError: '',
  };

  handleSubmit = values => {
    addTrackNumber(values)
      .then(response => {
        // console.log(response);
        this.props.openFlash('Заказ добавлен', 'Успех!', 'Закрыть', this.onSuccess);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onSuccess = () => {
    this.props.hideFlash();
    this.props.history.push('/orders/added');
  };

  validateForm = values => {
    const errors = {};

    return errors;
  };

  addDeclaration = (setFieldValue, values) => {
    const declarations = values.declarations;
    declarations.push({
      name: '',
      price: '',
      quantity: '',
      link: '',
      category: '',
    });

    setFieldValue('declarations', declarations);
  };

  deleteDeclaration = (setFieldValue, values, index) => {
    let declarations = values.declarations;
    declarations = declarations.splice(index, 1);
    setFieldValue('declarations', declarations);
  };

  renderForm = ({
    handleSubmit,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    setFieldValue,
    values,
  }) => (
    <form className="CreateOrder__form" onSubmit={handleSubmit}>
      <h1 className="page-title text--center">Создать заказ</h1>
      <p className="subtitle CreateOrder__subtitle">
        Для регистрации нового заказа заполните поля ниже
      </p>

      <div className="CreateOrder__item">
        <h3 className="CreateOrder__item__title">1. Номер трекинга</h3>
        <Input
          type="text"
          name="trackNumber"
          label="Введите номер"
          onChange={handleChange}
          onBlur={() => setFieldTouched('trackNumber')}
          touched={touched.trackNumber}
          error={errors.trackNumber}
          wrapperType="full"
        />
      </div>

      <div className="CreateOrder__item">
        <h3 className="CreateOrder__item__title">2. Декларация</h3>
        {values.declarations.map((declaration, index) => (
          <div className="CreateOrder__declaration" key={index}>
            <img
              onClick={() => this.deleteDeclaration(setFieldValue, values, index)}
              src={deleteImg}
              alt="delete"
              className="CreateOrder__declaration__delete"
            />
            <div className="CreateOrder__button-group">
              <Input
                className="CreateOrder__input"
                type="text"
                name={`declarations.${index}.name`}
                label="Наименование товара"
                onChange={handleChange}
                onBlur={() => setFieldTouched(`declarations.${index}.name`)}
                touched={
                  touched.declarations &&
                  touched.declarations.index &&
                  touched.declarations.index.name
                }
                error={
                  errors.declarations && errors.declarations.index && errors.declarations.index.name
                }
              />
              <div className="CreateOrder__price-group">
                <Input
                  className="CreateOrder__input--price"
                  type="text"
                  name={`declarations.${index}.price`}
                  label="Цена"
                  dropdownList={['$', '₸', '€', '₽']}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched(`declarations.${index}.price`)}
                  touched={
                    touched.declarations &&
                    touched.declarations.index &&
                    touched.declarations.index.price
                  }
                  error={
                    errors.declarations &&
                    errors.declarations.index &&
                    errors.declarations.index.price
                  }
                />
              </div>
              <Input
                className="CreateOrder__input--small"
                type="text"
                name={`declarations.${index}.quantity`}
                label="Кол-во"
                onChange={handleChange}
                onBlur={() => setFieldTouched(`declarations.${index}.quantity`)}
                touched={
                  touched.declarations &&
                  touched.declarations.index &&
                  touched.declarations.index.quantity
                }
                error={
                  errors.declarations &&
                  errors.declarations.index &&
                  errors.declarations.index.quantity
                }
              />
            </div>
            <Input
              type="text"
              name={`declarations.${index}.link`}
              label="Ссылка на товар"
              onChange={handleChange}
              wrapperType="full"
              onBlur={() => setFieldTouched(`declarations.${index}.link`)}
              touched={
                touched.declarations &&
                touched.declarations.index &&
                touched.declarations.index.link
              }
              error={
                errors.declarations && errors.declarations.index && errors.declarations.index.link
              }
            />
            <DropdownInput
              className="CreateOrder__dropdown"
              label="Категория"
              name={`declarations.${index}.category`}
              wrapperType="full"
              setFieldValue={setFieldValue}
              options={categoryOptions}
              value={values.declarations.index && values.declarations.index.category}
              onBlur={() => setFieldTouched(`declarations.${index}.category`)}
              touched={
                touched.declarations &&
                touched.declarations.index &&
                touched.declarations.index.category
              }
              error={
                errors.declarations &&
                errors.declarations.index &&
                errors.declarations.index.category
              }
            />
          </div>
        ))}
        <button
          onClick={() => this.addDeclaration(setFieldValue, values)}
          type="button"
          className="button button--link CreateOrder__button--link"
        >
          + Добавить позицию
        </button>
      </div>

      <div className="CreateOrder__item">
        <h3 className="CreateOrder__item__title">3. Получатель</h3>
        <div className="CreateOrder__recipient">
          <div className="recipient__name">
            Бейсембаева Жадыра Мараткызы
            <div className="recipient__status">
              <img src={acceptedImg} alt="accepted" />
              Статус получателя подтвержден.
            </div>
          </div>
          <button type="button" className="button button--empty button--success">
            Изменить
          </button>
          <Input className="" type="hidden" name="recipientId" />
        </div>
      </div>

      <div className="button-group">
        <button type="button" className="button button--empty">
          Отменить
        </button>
        <button type="submit" className="button button--withicon">
          Добавить заказ <img src={plusImg} alt="add" />
        </button>
      </div>
    </form>
  );

  render() {
    return (
      <>
        <BackButton goBack={this.props.history.goBack} />
        <div className="CreateOrder">
          <img className="CreateOrder__main-image" src={mainImg} alt="create order" />
          <Formik
            onSubmit={values => this.handleSubmit(values)}
            render={this.renderForm}
            validate={this.validateForm}
            initialValues={{
              trackNumber: '',
              recipientId: 'recipientId',
              declarations: [
                {
                  name: '',
                  price: '',
                  quantity: '',
                  link: '',
                  category: '',
                },
              ],
            }}
          />
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { openFlash, addDelivery, hideFlash },
)(CreateOrder);
