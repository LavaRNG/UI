import React from "react";
import "../App.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';
import snippets from '../assets/codeSnippets'

const Body = (props, context) => {

  const codeStyle = atomDark;
  const codeString = snippets.codeString


  return(
    <div id="formSection">
    
      <div className="lavaRow cardRow" id="codeRow">
        <div className="lavaColumn">
          <h3>Use It Yourself</h3>
          <p style={{marginTop : "40px"}}>Whether you're building a Dapp that requires RNG, or you're trying to earn ETH by predicting or submitting random numbers, you'll want
          to automate the connection to the Lava system. Below you'll find examples written in Javascript for interacting with the Lava contracts. 
          We've also include some forms here so you can play around with the contracts. In reality it would be 
          highly impracticle to submit, predict or request numbers using the UI. However, it is connected to the actual 
          Lava contract and can give you a feel for how Lava works. 
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


          <h5 className="margin-top">Get Random Numbers for your Dapp</h5>
          <p style={{marginTop : "40px"}}>If you're building a Dapp Lava can be used as a reliable rnadom number oracle. To get a random number you'll need to 
          send ETH to the Lava contract and call the request function. If the correct conditions are met 
          your number will be broadcasted as an event. Check below for an example of how to to make
          a request and monitor for the broadcast of the random number.</p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{snippets.requestNumber}</SyntaxHighlighter>
          </div>

          <h5 className="margin-top">Submit Random Numbers and earn ETH</h5>
          <p style={{marginTop : "40px"}}>You can earn ETH by submitting random numbers to the
          Lava system. If you have a good method for RNG (hased pixel values from Lava lamp pohtos...) then
          you'll probably want to setup an automated system to submit numbers. Numbers should be 
          submitted as a stream of numbers. The example below shows how you would set up a 
          number submission stream.</p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{snippets.submitRand}</SyntaxHighlighter>
          </div>


          <h5 className="margin-top">Predict Random Numbers and Earn ETH</h5>
          <p style={{marginTop : "40px"}}>Lava is built so that all random numbers provided
          are broadcasted publically. If you have a good method (Network, algorithm, etc...) for 
          predicting these numbers than you can earn ETH by monitoring the outputted numbers and 
          submitting predictions. You would probably do this by monitoring the broadcasted 
          numbers from the Lava smart contract and running the outputs through your detection 
          system. Below is an example of monitoring this output and submitting predictions 
          based on it. </p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{codeString}</SyntaxHighlighter>
          </div>

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


