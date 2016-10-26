import React from 'react';

export default function FloatingInput(props) {
  const props_ = Object.assign({}, props);

  // omit className
  delete props_.className;

  return (
    <span className={`floating-input ${props.className}`}>
      <input {...props_}/>
      <label>{props.label}</label>
    </span>
  );
}

FloatingInput.propTypes = {
  label: React.PropTypes.string.isRequired,
};
