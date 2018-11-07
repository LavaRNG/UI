import React from "react";
import "../App.css";

const Button = (props) => {
  return(
    <div id="button" className="lavaCard lavaRow">
      <h2 id="submitText">{props.buttonText}</h2>
    </div>
  );
}

export default Button;
