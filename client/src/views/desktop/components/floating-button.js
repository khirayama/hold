import React, {PropTypes} from 'react';

export default function FloatingButton(props) {
  return <button {...props} className={`floating-button ${props.className}`}>{props.children}</button>;
}

FloatingButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
