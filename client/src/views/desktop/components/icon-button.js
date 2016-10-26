import React, {PropTypes} from 'react';

export default function IconButton(props) {
  return <button {...props} className={`icon-button ${props.addedClassName}`}>{props.children}</button>;
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  addedClassName: PropTypes.string,
};
