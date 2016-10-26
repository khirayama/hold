import React, {PropTypes} from 'react';

export default function FloatingButton(props) {
  const props_ = Object.assign({}, props);
  delete props_.addedClassName;

  return <button {...props_} className={`floating-button ${props.addedClassName}`}>{props.children}</button>;
}

FloatingButton.propTypes = {
  children: PropTypes.node.isRequired,
  addedClassName: PropTypes.string,
};
