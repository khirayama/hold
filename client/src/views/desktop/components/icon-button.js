import React from 'react';

export default function IconButton(props) {
  return <button className="icon-button" {...props}>{props.children}</button>;
}

IconButton.propTypes = {
  children: React.PropTypes.node.isRequired,
};
