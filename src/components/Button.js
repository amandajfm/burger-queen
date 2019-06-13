import React from 'react';
import './Button.css';
import { isProperty } from '@babel/types';

function Button(props){
    return (
      <button className={props.className} onClick={props.onClick}>{props.text}</button>
    )
  }
  
  export default Button;