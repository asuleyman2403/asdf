import React, { Component } from 'react';

import downImg from '../../../../assets/images/down.png';

class Input extends Component {
  state = {
    activeItemIndex: 0,
    dropdownVisible: false,
  };

  componentDidMount() {
    if (this.props.dropdownList) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setActiveItem = index => {
    this.setState({ activeItemIndex: index });
  };

  toggleDropdown = () => {
    this.setState(state => ({ dropdownVisible: !state.dropdownVisible }));
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ dropdownVisible: false });
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  render() {
    const {
      type,
      className,
      error,
      touched,
      name,
      onChange,
      onBlur,
      label,
      placeholder,
      wrapperType,
      value,
      dropdownList,
    } = this.props;

    const { activeItemIndex, dropdownVisible } = this.state;

    return (
      <div className={`input__wrapper ${wrapperType ? `input__wrapper--${wrapperType}` : ''}`}>
        <label className="input__label">{label}</label>
        <input
          className={`input ${className} ${touched && error ? 'input--error' : ''} ${
            dropdownVisible ? 'input--withdropdown' : ''
          }`}
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
        />
        {dropdownList && (
          <>
            <div onClick={this.toggleDropdown} className="input__dropdown">
              <span>{dropdownList[activeItemIndex]}</span>
              <img className="input__dropdown__down" alt="down" src={downImg} />
              {dropdownVisible && (
                <div className="dropdown-list" ref={this.setWrapperRef}>
                  {dropdownList.map((item, index) => (
                    <span
                      onClick={() => this.setActiveItem(index)}
                      className="dropdown-list__item"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        {touched && error && <p className="input__error">{error}</p>}
      </div>
    );
  }
}

export default Input;
