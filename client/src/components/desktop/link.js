import React, {Component} from 'react';

import {changeHistory} from '../../actions/app-action-creators';

export default function Link(props) {
  const handleClickLink = (event) => {
    event.preventDefault();
    changeHistory(props.href);
  };
  return <a onClick={handleClickLink}>{props.children}</a>;
}

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired,
};
