import React from "react";
import "../App.css";
import FormCard from "../components/FormCard.js";

const FormSection = (props) => {
  return(
    <div id="formSection">

<h3>How it Works</h3>
      <div className="lavaRow cardRow" id="">
        <div className="lavaColumn">
         <p id="howItWorks">Here is a descirption of how Lava works. We've also include some forms here so you can play around with the contracts. In reality it would be 
          highly impracticle to submit, predict or request numbers using the UI. However, it is connected to the actual 
          Lava contract and can give you a feel for how Lava works.  </p>
        </div>
      </div>

      <h3>Try It Out</h3>
      <p style={{marginTop : "40px"}}>We built a UI so you can try out Lava with some buttons. In reality it would be 
          highly impracticle to submit, predict or request numbers using the UI. However, it is connected to the actual 
          Lava contract and can give you a feel for how Lava works. We recommend you switch to Rinkeby so that you can test out 
      the funcitons for free. Try submitting, predicting, and requesting numbers.
          </p>
      <div className="lavaRow cardRow" id="">
        <FormCard displayLoader={props.displayLoader} randomGot={null} requestSent={null} requestGot={null} action={props.rander} title={"Submit Number"} buttonText={"Submit"}/>
        <FormCard displayLoader={props.displayLoader} randomGot={null} requestSent={null} requestGot={null} action={props.preder} title={"Predict Number"} buttonText={"Predict"}/>
        <FormCard displayLoader={props.displayLoader} randomGot={props.randomGot} requestSent={props.requestSent} requestGot={props.requestGot} action={props.customer} title={"Request Number"} buttonText={"Request"}/>
      </div>
    </div>
  );
}

export default FormSection;
