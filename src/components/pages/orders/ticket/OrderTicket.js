import React, { Component } from 'react';

import './OrderTicket.scss';
import editImg from '../../../../assets/images/pen.png';
import deleteImg from '../../../../assets/images/trash.png';
import downImg from '../../../../assets/images/down.png';

class OrderTicket extends Component {
  render() {
    const { className, order } = this.props;
    return (
      <div className="OrderTicket">
        <div className={`OrderTicket__header OrderTicket__header--${className} `}>
          <span className="OrderTicket__header__text">
            <b>Ваш заказ в пути</b>
          </span>
          <span className="OrderTicket__header__text">
            Ориентировочное время прибытия: на склад <b>5-10 раб. дней</b>
          </span>
        </div>

        <div className="OrderTicket__row">
          <div />
          <div className="button-group OrderTicket__actions">
            <button className="button button--link button--iconed">
              <img src={editImg} alt="edit" />
              Изменить
            </button>
            <button className="button button--link button--iconed button--danger">
              <img src={deleteImg} alt="edit" />
              Удалить
            </button>
          </div>
        </div>
        <div className="OrderTicket__row OrderTicket__data">
        <div className="OrderTicket__info">
            <span className="OrderTicket__info__title">Название</span>
            <span className="OrderTicket__info__value">{order.trackNumber}</span>
          </div>
          <div className="OrderTicket__info">
            <span className="OrderTicket__info__title">Количество</span>
            <span className="OrderTicket__info__value">1</span>
          </div>
          <div className="OrderTicket__info">
            <span className="OrderTicket__info__title">Цена</span>
            <span className="OrderTicket__info__value">34.95 $</span>
          </div>
          <div className="OrderTicket__info">
            <span className="OrderTicket__info__title">Создано</span>
            <span className="OrderTicket__info__value">05.07.19</span>
          </div>
          <div className="OrderTicket__info">
            <span className="OrderTicket__info__title">Получатель</span>
            <span className="OrderTicket__info__value">Ж. Бейсембаева</span>
          </div>
        </div>
        <div className="OrderTicket__row OrderTicket__actions">
          <button className="button button--link button--iconed">
            <img src={downImg} alt="more" />
            Подробнее
          </button>
        </div>
      </div>
    );
  }
}

export default OrderTicket;
