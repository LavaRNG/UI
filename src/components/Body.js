import React from "react";
import "../App.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';

const Body = (props, context) => {

  const codeStyle = atomDark;

  const codeString = `
  getContract = () => {
    return new Promise((resolve, reject) => {
      // const eth = new Eth(new HttpProvider('https://rinkeby.infura.io/v3/3d0bbf8a09bb4c41b8bd03ffd7821f6f'));
      // const eth = new Eth(window.web3.currentProvider);
      const provider = getDefaultProvider('rinkeby');
      const privateKey = '';
      let wallet = new Wallet(privateKey,provider);
      let lava = new Contract(address,abi,wallet);
      this.setState({lava, provider, wallet}, resolve);
    })
  }
  `

  return(
    <div id="formSection">
      <h3>How it Works</h3>
      <div className="lavaRow cardRow" id="">
        <div className="lavaColumn">
         <p id="howItWorks"> Peer-to-peer grow data-driven e-enable visualize collaborative B2C convergence eyeballs podcasts integrate--virtual collaborative, mindshare productize, expedite. Webservices initiatives networks empower integrate orchestrate leverage, ecologies leverage reinvent; user-contributed platforms. Partnerships user-centric podcasts world-class, "eyeballs engage e-business," rss-capable: incubate podcasting revolutionary, vortals A-list transform 24/365 matrix user-contributed open-source? Syndicate podcasting evolve. Social communities dynamic engage, engineer post repurpose visualize.</p>
        </div>
      </div>

      <div className="lavaRow cardRow" id="codeRow">
        <div className="lavaColumn">
          <h3>Use It Yourself</h3>
          <p style={{marginTop : "40px"}}>Whether you're building a Dapp that requires RNG, or you're trying to earn ETH by predicting or submitting random numbers, you'll want
          to automate the connection to the Lava system. Below you'll find examples written in Javascript for interacting with the Lava contracts. </p>
          
          
          <h5 className="margin-top">Get Random Numbers for your Dapp</h5>
          <p style={{marginTop : "40px"}}>If you're building a Dapp Lava can be used as a reliable rnadom number oracle. To get a random number you'll need to 
          send ETH to the Lava contract and call the request function. If the correct conditions are met 
          your number will be broadcasted as an event. Check below for an example of how to to make
          a request and monitor for the broadcast of the random number.</p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{codeString}</SyntaxHighlighter>
          </div>

          <h5 className="margin-top">Submit Random Numbers and earn ETH</h5>
          <p style={{marginTop : "40px"}}>You can earn ETH by submitting random numbers to the
          Lava system. If you have a good method for RNG (hased pixel values from Lava lamp pohtos...) then
          you'll probably want to setup an automated system to submit numbers. Numbers should be 
          submitted as a stream of numbers. The example below shows how you would set up a 
          number submission stream.</p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{codeString}</SyntaxHighlighter>
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


