import React, {PropTypes} from 'react';

export default function IconButton(props) {
  return <button {...props} className={`icon-button ${props.className}`}>{props.children}</button>;
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
