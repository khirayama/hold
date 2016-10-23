import React, {Component} from 'react';

export default function FloatingInput(props) {
  return (
    <span className="floating-input">
      <input
        {...props}
        />
      <label>{props.label}</label>
    </span>
  );
}
