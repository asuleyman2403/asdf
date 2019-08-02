import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './OrdersAside.scss';
import addedImg from '../../../../assets/images/desk.png';
import onStorageImg from '../../../../assets/images/home.png';
import onWayImg from '../../../../assets/images/plane.png';
import readyImg from '../../../../assets/images/bucket.png';
import onDeliveryImg from '../../../../assets/images/map.png';
import deliveredImg from '../../../../assets/images/done.png';

const statuses = [
  {
    name: 'added',
    title: 'Добавлено',
    img: addedImg,
  },
  {
    name: 'onstorage',
    title: 'На складе',
    img: onStorageImg,
  },
  {
    name: 'onway',
    title: 'В пути',
    img: onWayImg,
  },
  {
    name: 'ready',
    title: 'Готовы к выдаче',
    img: readyImg,
  },
  {
    name: 'ondelivery',
    title: 'На доставке',
    img: onDeliveryImg,
  },
  {
    name: 'delivered',
    title: 'Доставлено',
    img: deliveredImg,
  },
];

export default class OrdersAside extends Component {
  constructor(props) {
    super(props);
    const page = window.location.pathname.split('/')[2];

    this.state = {
      active: page,
    };
  }

  changeActiveStatus = name => {
    this.setState({ active: name });
  };

  render() {
    return (
      <div className="OrdersAside">
        {statuses.map(status => (
          <Link
            key={status.name}
            to={`/orders/${status.name}`}
            className={`OrdersAside__status OrdersAside__status--${status.name} ${
              this.state.active === status.name ? 'OrdersAside__status--active' : ''
            }`}
            onClick={() => this.changeActiveStatus(status.name)}
          >
            <div
              className={`OrdersAside__status__image OrdersAside__status__image--${status.name}`}
            >
              {/* <div class="OrdersAside__status__info">3</div> */}
              <img src={status.img} alt="added" />
            </div>
            <p className={`OrdersAside__status__text OrdersAside__status__text--${status.name}`}>
              {status.title}
            </p>
          </Link>
        ))}
      </div>
    );
  }
}
