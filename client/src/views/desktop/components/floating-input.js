import React, {PropTypes} from 'react';

export default function FloatingInput(props) {
  const props_ = Object.assign({}, props);
  delete props_.label;

  return (
    <span className={`floating-input ${props.className}`}>
      <input {...props_}/>
      <label>{props.label}</label>
    </span>
  );
}

FloatingInput.defaultProps = {
  className: '',
};

FloatingInput.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};
