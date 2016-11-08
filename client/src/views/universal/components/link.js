import React, {PropTypes} from 'react';

import {changeHistory} from 'actions/app-action-creators';

export default function Link(props) {
  const handleClickLink = event => {
    event.preventDefault();
    changeHistory(props.href);
  };
  return <a className={`link ${props.className}`} href={props.href} onClick={handleClickLink}>{props.children}</a>;
}

Link.defaultProps = {
  className: '',
};

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};
