import React, {PropTypes} from 'react';

export default function NotFound() {
  const key = '_not-found-page';

  return <div key={key}>404</div>;
}

NotFound.propTypes = {
  state: PropTypes.object.isRequired,
};
