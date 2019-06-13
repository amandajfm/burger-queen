import React from 'react';
import './Input.css';

function Input(props) {
  return (
    <input className="Input" onChange={props.onChange} value={props.value} placeholder={props.text} />
  );
}

export default Input;