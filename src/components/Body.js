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
          <p style={{marginTop : "40px"}}>This is a description of the part of the code that belongs below this. There would be some indication of why a user would want to use this code and then more instructions.</p>
          <div className="card" id="codeCard">
            <SyntaxHighlighter language='jsx' style={codeStyle}>{codeString}</SyntaxHighlighter>
          </div>
          <p style={{marginTop : "40px"}}>This is a description of the part of the code that belongs below this. There would be some indication of why a user would want to use this code and then more instructions.</p>
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


