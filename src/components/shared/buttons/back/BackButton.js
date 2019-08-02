import React from 'react';

import './BackButton.scss';
import backImg from '../../../../assets/images/back.png';

export default function BackButton({ goBack }) {
  return (
    <button onClick={goBack} className="BackButton">
      <img className="BackButton__image" src={backImg} alt="back" />
      Вернуться
    </button>
  );
}
