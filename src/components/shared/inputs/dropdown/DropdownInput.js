import React, { Component } from 'react';

import downImg from '../../../../assets/images/down.png';
import './DropdownInput.scss';

class DropdownInput extends Component {
  state = {
    isListOpen: false,
    selectedOption: {},
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    const { value, options } = this.props;
    if (value) {
      let selectedOption = options.filter(option => option.value === value)[0];
      this.setState({ selectedOption });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  toggleList = () => {
    this.setState(state => ({ isListOpen: !state.isListOpen }));
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isListOpen: false });
    }
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleOptionSelect = value => {
    const { setFieldValue, name, onBlur, options } = this.props;
    setFieldValue(name, value);
    onBlur();
    this.toggleList();

    let selectedOption = options.filter(option => option.value === value)[0];
    this.setState({ selectedOption });
  };

  render() {
    const { error, touched, name, label, wrapperType, options, wrapperClass } = this.props;

    const { isListOpen, selectedOption } = this.state;

    return (
      <div
        className={`input__wrapper ${
          wrapperType ? `input__wrapper--${wrapperType}` : ''
        } Dropdown ${wrapperClass}`}
        ref={this.setWrapperRef}
      >
        <label className="input__label">{label}</label>
        <div
          className={`Dropdown__value ${isListOpen ? 'Dropdown__value--open' : ''}`}
          onClick={this.toggleList}
        >
          {selectedOption.text} <img className="Dropdown__down-image" src={downImg} alt="down" />
        </div>
        {isListOpen && options && (
          <div className="Dropdown__options">
            {options.map(option => (
              <div
                className="Dropdown__option"
                key={option.value}
                onClick={() => this.handleOptionSelect(option.value)}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
        <input type="hidden" name={name} />
        {touched && error && <p className="input__error">{error}</p>}
      </div>
    );
  }
}

export default DropdownInput;
