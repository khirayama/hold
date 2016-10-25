import React from 'react';

export default function FlatSelect(props) {
  return <select {...props} className={`flat-select ${props.className}`}>{props.children}</select>;
}

FlatSelect.propTypes = {
  children: React.PropTypes.node.isRequired,
};
