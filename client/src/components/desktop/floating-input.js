import React from 'react';

export default function FloatingInput(props) {
  const props_ = Object.assign({}, props);

  // omit properties
  delete props_.addedClassName;
  delete props_.label;

  return (
    <span className={`floating-input ${props.addedClassName}`}>
      <input className="flat-input size__spread" {...props_}/>
      <label>{props.label}</label>
    </span>
  );
}

FloatingInput.propTypes = {
  addedClassName: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
};
