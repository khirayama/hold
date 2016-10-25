import React from 'react';

export default function FloatingButton(props) {
  return <button {...props} className={`floating-button ${props.className}`}>{props.children}</button>;
}

FloatingButton.propTypes = {
  children: React.PropTypes.node.isRequired,
};
