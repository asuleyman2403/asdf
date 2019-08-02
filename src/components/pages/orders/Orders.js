import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import OrdersAside from './aside/OrdersAside';

import './Orders.scss';
import plusImg from '../../../assets/images/plus.png';
import OrdersAdded from './added/OrdersAdded';

export default class Orders extends Component {
  render() {
    return (
      <div className="Orders">
        <OrdersAside />
        <div className="Orders__content">
          <div className="Orders__header">
            <h1 className="page-title">Заказы</h1>
            <Link to="/createorder">
              <button className="button button--withicon">
                Добавить заказ <img src={plusImg} alt="add" />
              </button>
            </Link>
          </div>
          <Switch>
            <Route path="/orders/added" component={OrdersAdded} />
          </Switch>
        </div>
      </div>
    );
  }
}
