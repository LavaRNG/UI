import React from "react";
import "../App.css";
import FormCard from "../components/FormCard.js";

const FormSection = (props) => {
  return(
    <div id="formSection">
      <h3>Submit or Request</h3>
      <div className="lavaRow cardRow" id="">
        <FormCard action={props.rander} title={"Submit Number"} buttonText={"Submit"}/>
        <FormCard action={props.preder} title={"Predict Number"} buttonText={"Predict"}/>
        <FormCard action={props.customer} title={"Request Number"} buttonText={"Request"}/>
      </div>
    </div>
  );
}

export default FormSection;
