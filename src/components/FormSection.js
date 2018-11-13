import React from "react";
import "../App.css";
import FormCard from "../components/FormCard.js";

const FormSection = (props) => {
  return(
    <div id="formSection">
      <h3>Submit or Request</h3>
      <div className="lavaRow cardRow" id="">
        <FormCard displayLoader={props.displayLoader} randomGot={null} requestSent={null} requestGot={null} action={props.rander} title={"Submit Number"} buttonText={"Submit"}/>
        <FormCard displayLoader={props.displayLoader} randomGot={null} requestSent={null} requestGot={null} action={props.preder} title={"Predict Number"} buttonText={"Predict"}/>
        <FormCard displayLoader={props.displayLoader} randomGot={props.randomGot} requestSent={props.requestSent} requestGot={props.requestGot} action={props.customer} title={"Request Number"} buttonText={"Request"}/>
      </div>
    </div>
  );
}

export default FormSection;
