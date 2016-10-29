import React, {PropTypes} from 'react';

export default function FlatSelect(props) {
  return <select {...props} className={`flat-select ${props.className}`}>{props.children}</select>;
}

FlatSelect.defaultProps = {
  className: '',
};

FlatSelect.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
