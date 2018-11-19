import React from "react";
import "../App.css";
import FormCard from "../components/FormCard.js";

const FormSection = (props) => {
  return(
    <div id="formSection">
          <h3>Decntralized Random Number Oracle</h3>
      <p style={{marginTop : "20px", marginBottom: "-20px"}}>
          Lava is a system that aims to generate random numbers in a secure, decentralized fashion. Lava is built on top of 
          Ethereum and can be used as a trustworthy RNG oracle within the network. 
      </p>

      <div className="lavaRow cardRow" id="">
        <div className="lavaColumn">
          <h3>How it Works: Short Version</h3>
          <p>
              Some people (<b>randers</b>) send "random numbers" and others (<b>preders</b>) predict what those random numbers will be.
              If someone (a <b>customer</b>) buys a random number that was predicted then preders earn money. Otherwise, randers earn money.
              Thus, the randers are incentivized to sample from the uniform distribution so as to not lose money to the preders.
              We expect randers to converge to this strategy in the long run (one may call it an <i>iteratively dominant strategy</i>).
          </p>
          <p>
              Randers can sit back and have a bot automatically submit transformed pictures of actual lava lamps (hence the name, <i>"Lava"</i>).
              Preders can sit back and let a machine learning algorithm predict the next random number.
              Preders can also take a more active approach revealing their knowledge of compromised random number submissions via the preders' own predictions.
          </p>
          <p>To see a more mathmatical and in-depth explanation of the Lava system checkout the github here <a href="https://github.com/lava-rng">https://github.com/lava-rng</a>.</p>
        </div>
      </div>


      <h3>Try It Out</h3>
      <p style={{marginTop : "40px"}}>
          We built a UI so you can try out Lava with some buttons. In reality it would be
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
