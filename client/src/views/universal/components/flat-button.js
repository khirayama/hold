import React, {PropTypes} from 'react';

export default function FlatButton(props) {
  return <button {...props} className={`flat-button ${props.className}`}>{props.children}</button>;
}

FlatButton.defaultProps = {
  className: '',
};

FlatButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
