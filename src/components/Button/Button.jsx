import React from "react";
import "./Button.css";

const Button = (props) => {
  
  // let onClickHandler = props.onClickHandler()
  function onClickHandler() {
    props.onClickHandler();
  };

  if(typeof props.onClickHandler!== "function"){
    console.log("erro");
  }

  return(
    <div className="Button" onClick={onClickHandler}>{props.children}</div>
  );
}

export default Button;