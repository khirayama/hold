import React, {Component} from 'react';

export default function FloatingInput(props) {
  const props_ = Object.assign({}, props, {
    className: "flat-input size__spread",
  });
  return (
    <span className={`floating-input ${props.className}`}>
      <input {...props_}/>
      <label>{props.label}</label>
    </span>
  );
}
