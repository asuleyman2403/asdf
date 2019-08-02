import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeaderDropdown from './dropdown/HeaderDropdown';

import { connect } from 'react-redux';
import { logout } from '../../../store/actions/auth.actions';

import './Header.scss';
import logoImg from '../../../assets/images/logo.png';
import bellImg from '../../../assets/images/bell.png';
import verificationImg from '../../../assets/images/verification.png';
import historyImg from '../../../assets/images/hourglass.png';
import settingsImg from '../../../assets/images/settings.png';
import logoutImg from '../../../assets/images/logout.png';

class Header extends Component {
  state = {
    dropdownVisible: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleLogout = () => {
    this.props.logout();
    window.location.reload();
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ dropdownVisible: false });
    }
  };

  toggleDropdown = () => {
    this.setState(state => ({ dropdownVisible: !state.dropdownVisible }));
  };

  userDropdown = [
    {
      text: 'Верификация',
      image: verificationImg,
      link: '/verification',
    },
    {
      text: 'История заказов',
      image: historyImg,
      link: '/history',
    },
    {
      text: 'Настройки',
      image: settingsImg,
      link: '/settings',
    },
    {
      text: 'Выйти',
      image: logoutImg,
      onClick: this.handleLogout,
    },
  ];

  navLinks = [
    {
      link: '/orders/added',
      text: 'Заказы',
    },
    {
      link: '/storage',
      text: 'Мой склад',
    },
    {
      link: '/payment',
      text: 'Оплата',
    },
    {
      link: '/recipients',
      text: 'Получатели',
    },
  ];

  render() {
    return (
      <header className="Header">
        <div className="Header__content">
          <Link to="/">
            <img alt="logo" className="Header__logo" src={logoImg} />
          </Link>
          <nav className="Header__nav">
            {this.navLinks.map((navLink, index) => (
              <NavLink key={index} to={navLink.link} className="Header__nav__link">
                {navLink.text}
              </NavLink>
            ))}
          </nav>
          <div className="Header__user">
            <div className="Header__notification">
              <img alt="notification" src={bellImg} className="Header__notification-image" />
            </div>
            <div className="Header__profile" onClick={this.toggleDropdown}>
              DL
              <HeaderDropdown
                list={this.userDropdown}
                visible={this.state.dropdownVisible}
                setWrapperRef={this.setWrapperRef}
              />
            </div>
            {/* <div onClick={this.handleLogout} className="Header__logout">
              Выйти <img className="Header__logout__image" src={logoutImg} alt="logout" />
            </div> */}
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  null,
  { logout },
)(Header);
