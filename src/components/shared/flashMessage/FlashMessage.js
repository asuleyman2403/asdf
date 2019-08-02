import React from 'react';

import { connect } from 'react-redux';

import './FlashMessage.scss';
import doneImg from '../../../assets/images/done--big.png';

function FlashMessage({ type, text, onClick, title, buttonText, isOpen }) {
  return (
    <div className={`FlashMessage ${isOpen ? 'FlashMessage--visible' : ''}`}>
      <div className={`FlashMessage__content ${type ? `FlashMessage__content--${type}` : ''}`}>
        <p className="FlashMessage__title">{title}</p>
        <img className="FlashMessage__image" alt="success" src={doneImg} />
        <p className="FlashMessage__text">{text}</p>
        <button
          onClick={onClick}
          className={`button button--empty ${
            type ? `button--${type}` : 'button--success'
          }  FlashMessage__button`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { text, type, onClick, title, buttonText, isOpen } = state.flash;
  return {
    text,
    type,
    onClick,
    title,
    buttonText,
    isOpen,
  };
}

export default connect(mapStateToProps)(FlashMessage);
