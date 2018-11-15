import React from "react";
import "../App.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';
import snippets from '../assets/codeSnippets'

const Body = (props, context) => {

  const codeStyle = atomDark;
  // const codeString = snippets.codeString


  return(
    <div id="formSection">
      <div className="lavaRow cardRow" id="codeRow">
        <div className="lavaColumn">
          <h3>Use It Yourself</h3>
          <p style={{marginTop : "40px"}}>Whether you're building a Dapp that requires RNG, or you're trying to earn ETH by predicting or submitting random numbers, you'll want
          to automate the connection to the Lava system. Below you'll find examples written in Javascript for interacting with the Lava contracts.
          </p>

          <h5 className="margin-top">Setting Up Your Connection To Lava and Helpers</h5>
          <p style={{marginTop : "40px"}}>
            Feel free to connect to the Lava contract in whichever way you please. Here we provide an example connection using the ethjs
            Library. First you'll want to get the instance of the
            contract. We'll also need a helper to check if the transaction
            has been mined or not.
          </p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{snippets.setup}</SyntaxHighlighter>
          </div>

          <hr></hr>


          <h5 className="margin-top">Get Random Numbers for your Dapp</h5>
          <p style={{marginTop : "40px"}}>If you're building a Dapp Lava can be used as a reliable rnadom number oracle.
          To get a random number, send at least 857 wei to the Lava contract while calling the <code>requestRand()</code> function. If the correct conditions are met
          your number will be broadcasted as an event. Check below for an example of how to to make
          a request and monitor for the broadcast of the random number. </p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{snippets.requestNumber}</SyntaxHighlighter>
          </div>

          <hr></hr>

          <h5 className="margin-top">Submit Random Numbers and Earn ETH</h5>
          <p style={{marginTop : "40px"}}>You can earn ETH by submitting random numbers to the
          Lava system. If you have a good method for RNG (hashed pixel values from Lava lamp photos...) then
          you'll probably want to setup an automated system to submit numbers. Lava works such that the more you submit,
          the more wei you make (and the more risk you incur, but don't worry about that if you submit truly random numbers).
          The example below shows how you would set up a number submission stream. Lava requires 1 wei per random number
          submission - consider this to be your deposit, to confidently tell the world that "You, a rander, are truly
          submitting a random number."</p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{snippets.submitRand}</SyntaxHighlighter>
          </div>

          <hr></hr>


          <h5 className="margin-top">Predict Random Numbers and Earn ETH</h5>
          <p style={{marginTop : "40px"}}>Lava is built so that all random numbers provided
          are broadcasted publically. If you have a good method (e.g. machine learning algorithm, insider knowledge) for
          predicting these numbers than you can earn ETH by monitoring the outputted numbers and
          submitting predictions. You would probably do this by monitoring the broadcasted
          numbers from the Lava smart contract and running the outputs through your detection
          system. Below is an example of monitoring these events followed by how one would submit predictions.
          Lava's <code>submitPredWindow()</code> function takes an array of integers (so one may predict the next
          purchased random number, then the one after that if their array was of length 2). Lava also expects 1 wei
          per submission (so submitting an array of length 2 means you must submit 2 wei to Lava). Take note: In our example,
          we submit arrays of length 1 only (because, on this dapp, we only let you submit 1 prediction at a time).
          </p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{snippets.predict}</SyntaxHighlighter>
          </div>

          <hr></hr>

          <h3>Get Involved</h3>
          <p style={{marginTop : "40px"}}>
          The Lava system becomes more effective as the user base grows - so get involved! Checkout the Lava github <a href="https://github.com/lava-rng">https://github.com/lava-rng </a>
           for more information and a detailed breakdown of the logic behind Lava.
          </p>

        </div>
      </div>

      <hr></hr>
      <div className="lavaRow cardRow" id="footer">
        <div className="lavaColumn">
          Made by <a href="kennyp.herokuapp.com">Kenny Peluso</a> and Ian Lapham using <a href='https://reactjs.org/'>React</a>, React-Materialize, ethjs, and some elbow grease.
        </div>
      </div>
    </div>
  );
}

export default Body;


