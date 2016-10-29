import React, {PropTypes} from 'react';

export default function FlatInput(props) {
  return <input {...props} className={`flat-input ${props.className}`}/>;
}

FlatInput.propTypes = {
  className: PropTypes.string,
};
