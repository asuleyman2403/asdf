import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './OrdersAdded.scss';
import sadImg from '../../../../assets/images/sad.png';
import plusImg from '../../../../assets/images/plus--gray.png';
import OrderTicket from '../ticket/OrderTicket';

class OrdersAdded extends Component {
  render() {
    const { lastAdded } = this.props;

    return (
      <div className="OrdersAdded">
        {lastAdded ? (
          <OrderTicket order={lastAdded} className="added" />
        ) : (
          <div className="OrdersAdded__empty">
            <p className="OrdersAdded__empty-text">
              <img alt="sad" src={sadImg} />У вас совсем нет заказов. Нажмите + чтобы создать новый
              заказ
            </p>
            <Link className="OrdersAdded__add" to="/createorder">
              <img className="OrdersAdded__add__image" alt="add" src={plusImg} />
              <p className="OrdersAdded__add__text">Добавить заказ</p>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lastAdded: state.delivery.last,
  };
}

export default connect(mapStateToProps)(OrdersAdded);
