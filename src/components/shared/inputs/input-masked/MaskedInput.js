import React from 'react';
import ReactMaskedInput from 'react-text-mask';

const phoneMask = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export default function MaskedInput({
  mask,
  maskType,
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
}) {
  let inputMask = '';

  if (mask) {
    inputMask = mask;
  } else {
    if (maskType && maskType === 'phone') {
      inputMask = phoneMask;
    }
  }

  return (
    <div className={`input__wrapper ${wrapperType ? `input__wrapper--${wrapperType}` : ''}`}>
      <label className="input__label">{label}</label>
      <ReactMaskedInput
        className={`input ${className} ${touched && error ? 'input--error' : ''}`}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        mask={inputMask}
      />
      {touched && error && <p className="input__error">{error}</p>}
    </div>
  );
}
