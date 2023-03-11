import React from "react";

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({isSubmitting, btnName, icon, handleClick,classStyle,type }) => {
  return (
    <div className={Style.box}>
      <button
      disabled={isSubmitting}
        className={`${Style.button} ${classStyle}`}
        onClick={() => {handleClick!== undefined ? handleClick() :""}}
        type={type}
      >
        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
