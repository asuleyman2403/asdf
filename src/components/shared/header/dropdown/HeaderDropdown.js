import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './HeaderDropdown.scss';

export default class HeaderDropdown extends Component {
  render() {
    const { list, visible, setWrapperRef } = this.props;

    return (
      <div
        className={`HeaderDropdown ${visible ? 'HeaderDropdown--visible' : ''}`}
        ref={setWrapperRef}
      >
        {list.map((item, index) => {
          if (item.link) {
            return (
              <Link to={item.link} key={index} className="HeaderDropdown__item">
                <span className="HeaderDropdown__item-image">
                  <img src={item.image} alt="DarLink" />
                </span>
                {item.text}
              </Link>
            );
          } else {
            return (
              <div onClick={item.onClick} key={index} className="HeaderDropdown__item">
                <span className="HeaderDropdown__item-image">
                  <img src={item.image} alt="DarLink" />
                </span>
                {item.text}
              </div>
            );
          }
        })}
      </div>
    );
  }
}
