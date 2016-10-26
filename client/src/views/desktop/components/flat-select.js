import React, {PropTypes} from 'react';

export default function FlatSelect(props) {
  const props_ = Object.assign({}, props);
  delete props_.addedClassName;

  return <select {...props_} className={`flat-select ${props.addedClassName}`}>{props.children}</select>;
}

FlatSelect.propTypes = {
  children: PropTypes.node.isRequired,
  addedClassName: PropTypes.string,
};
