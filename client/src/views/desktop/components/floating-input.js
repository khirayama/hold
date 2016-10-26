import React, {PropTypes} from 'react';

export default function FloatingInput(props) {
  const props_ = Object.assign({}, props);
  delete props_.addedClassName;
  delete props_.label;

  return (
    <span className={`floating-input ${props.addedClassName}`}>
      <input {...props_}/>
      <label>{props.label}</label>
    </span>
  );
}

FloatingInput.propTypes = {
  label: PropTypes.string.isRequired,
  addedClassName: PropTypes.string,
};
