import React from "react";
import "../App.css";
import FormCard from "../components/FormCard.js";

const FormSection = (props) => {
  return(
    <div id="formSection">

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
        </div>
      </div>

      <div className="lavaRow cardRow" id="">
        <div className="lavaColumn">
          <h3>How it Works: Long Version</h3>
          <p>
            <ol>
              <li>
                Some players, <b>randers</b>, submit random numbers, one number per submission (plus a fixed deposit and gas costs for each submitted random number). Every submitted random number is pushed to a (cyclical) <i>L</i>-length array. The rander whose random number gets booted off of this array upon a random number submission may get their deposit returned. Other players, <b>preders</b>, submit a prediction window (an array of predictions) along with 1 wager per unit window length (1 wager per prediction). Finally, there are <b>customers</b>, who pay the smart contract a fixed amount <i>C</i> to automatically have a random number sent to their address or some location of their choosing.
              </li>
              <li>
                Randers and preders can submit random numbers and predictions, respectively, at any time, but each may be entitled to payouts only when a customer places an order. Cases:
                <ol>
                  <i>The last submitted random number DOES NOT match a prediction.</i> Thus, the <i>L</i> most recent randers are entitled to <i>1/(1+i)^2</i> of <i>C</i>, where <i>i</i> ranges from <i>1, 2, ..., L</i>. The most recent rander (the one who actually submitted the emitted random number) receives an additional <i>C/4</i>. Excess customer payment not disbursed to randers (namely the amount <i>L - ∑^L_i N/(1+i)^2</i>) contributes to a pot of ether. Preders lose their wagers.
                </ol>
                <ol>
                  <i>The last submitted random number DOES match a prediction.</i> Thus, all preders who submitted a prediction that matches the random number sent to the customer split <i>C</i> and receive their wager back in full. Furthermore, the first preder to submit the correct guess gets the ether pot. Note that there is nothing preventing any preder from "investing" in a particular value for a random number multiple times over using the same or different public addresses.
                </ol>
                <ol>
                  In both cases, the customer pays <i>C</i>, pays gas, and receives the last submitted random number.
                </ol>
              </li>
            </ol>
          </p>
          <p style={{marginTop : "40px"}}>
            Preders are incentivized to correctly guess the next random number that will be utilized. Randers are, in turn, incentivized to frequently submit random numbers of maximal entropy to maximize their chance of not matching a predictor while maximizing their chance of earning income from <i>C</i>. By submitting frequently, randers maximize their chance of being one of the <i>L</i>-most recent randers). Random number submissions achieve maximum entropy when randers sample from the uniform distirbution. Hence, Lava exhibits long-run coincidence with true randomness.
          </p>
          <p style={{marginTop : "40px"}}>
            If rander volume is low or too many customers freely take the random numbers submitted by the randers (for instance, by accessing the smart contract's logs), then the pot will build, eventually incentivizing preders to become customers and pay for random numbers themselves to reliably win the pot. But this opens an opportunity for randers to profit - they need only to submit a truly random number to reliably beat the opportunistic preder to profit.
          </p>
          <p style={{marginTop : "40px"}}>
            Read these to understand why a rander, under pressure from preders, is incentivized to submit samples from the uniform distribution:
            <ul>
              <li><a href='https://stats.stackexchange.com/questions/66108/why-is-entropy-maximised-when-the-probability-distribution-is-uniform'>Link 1</a></li>
              <li><a href='https://math.stackexchange.com/questions/275652/equivalence-between-uniform-and-normal-distribution'>Link 2</a></li>
              <li><a href='https://en.wikipedia.org/wiki/Maximum_entropy_probability_distribution#Uniform_and_piecewise_uniform_distributions'>Link 3</a></li>
              <li><a href='https://math.stackexchange.com/questions/1156404/entropy-of-a-uniform-distribution'>Link 4</a></li>
            </ul>
          </p>
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

      <h3>License</h3>
      <div className="lavaRow cardRow" id="">
        <div className="lavaColumn">
          <p>MIT</p>
        </div>
      </div>
    </div>
  );
}

export default FormSection;
