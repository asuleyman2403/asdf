import React from 'react';

import './Loader.scss';
import loaderImg from '../../../assets/images/loader.png';

export default function Loader() {
  return <img src={loaderImg} alt="loader" className="Loader" />;
}
