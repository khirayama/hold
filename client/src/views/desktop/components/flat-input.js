import React, {PropTypes} from 'react';

export default function FlatInput(props) {
  const props_ = Object.assign({}, props);
  delete props_.addedClassName;

  return <input {...props_} className={`flat-input ${props.addedClassName}`}/>;
}

FlatInput.propTypes = {
  addedClassName: PropTypes.string,
};
