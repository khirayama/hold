import React from 'react';

export default function FlatButton(props) {
  return <button className="flat-button" {...props}>{props.children}</button>;
}

FlatButton.propTypes = {
  children: React.PropTypes.node.isRequired,
};
