import React, {PropTypes} from 'react';

export default function FlatButton(props) {
  return <button {...props} className={`flat-button ${props.addedClassName}`}>{props.children}</button>;
}

FlatButton.propTypes = {
  children: PropTypes.node.isRequired,
  addedClassName: PropTypes.string,
};
