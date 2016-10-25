import React from 'react';

export default function FlatInput(props) {
  return <input {...props} className={`flat-input ${props.className}`} />;
}

FlatInput.propTypes = {};
