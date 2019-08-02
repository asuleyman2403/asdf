import React, { Component } from 'react';

import './Storage.scss';
import mailImg from '../../../assets/images/mail.png';
import locationImg from '../../../assets/images/location.png';
import storageImg from '../../../assets/images/storage.png';

export default class Storage extends Component {
  render() {
    return (
      <div className="Storage">
        <h1 className="page-title">Мой склад</h1>

        <div className="Storage__content">
          <div className="Storage__info">
            <div className="Storage__info-title">
              <div className="Storage__info-image">
                <img src={mailImg} alt="mail" />
              </div>
              <span className="Storage__info-text">Кому</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Получатель</span>
              <span className="Storage__data-value">Абубакирова Акнур</span>
            </div>

            <div className="Storage__info-title">
              <div className="Storage__info-image">
                <img src={locationImg} alt="mail" />
              </div>
              <span className="Storage__info-text">Адрес</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Адрес 1</span>
              <span className="Storage__data-value">650 El Sueno Road</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Адрес 2</span>
              <span className="Storage__data-value">BH1 9QS</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Город</span>
              <span className="Storage__data-value">Santa Barbara</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Штат</span>
              <span className="Storage__data-value">California</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Индекс</span>
              <span className="Storage__data-value">19703</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Страна</span>
              <span className="Storage__data-value">USA</span>
            </div>
            <div className="Storage__data">
              <span className="Storage__data-name">Номер телефона</span>
              <span className="Storage__data-value">+1 302 4148567</span>
            </div>
          </div>
          
          <div className="Storage__image">
            <img src={storageImg} alt="storage" />
          </div>
        </div>
      </div>
    );
  }
}
