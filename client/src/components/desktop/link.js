import React from 'react';

import {changeHistory} from '../../actions/app-action-creators';

export default function Link(props) {
  const handleClickLink = event => {
    event.preventDefault();
    changeHistory(props.href);
  };
  return <a className="link" href={props.href} onClick={handleClickLink}>{props.children}</a>;
}

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired,
};
