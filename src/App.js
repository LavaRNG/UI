import React, { Component } from "react";
import FormSection from "./components/FormSection";
import HttpProvider from 'ethjs-provider-http'; // const HttpProvider = require('ethjs-provider-http');
// import Eth from 'ethjs-query'; // const Eth = require('ethjs-query');
import EthContract from 'ethjs-contract'; // const EthContract = require('ethjs-contract');
import Eth from 'ethjs';
import unit from 'ethjs-unit';
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { bytecode, address, abi } from "./assets/Contract";

// import { getProviderUrl, getProvider, getWebsocketProvider, getEth } from './Provider';
// import { getCurrentUser } from './Account';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      lava: null,
      eth: null,
      contract: null,
      from: '0x76cD09Fd114ce95bf0D81422A0959316FD7F6B1B'
    }
  }

  getContract = () => {
    return new Promise((resolve, reject) => {
      // var url = 'https://mainnet.infura.io/v3/9a3684130940424c911e0c45ac27f6f5';
      const eth = new Eth(new HttpProvider('https://rinkeby.infura.io/v3/3d0bbf8a09bb4c41b8bd03ffd7821f6f'));
      // const eth = new Eth(window.web3.currentProvider);

      let lava = eth.contract(abi, bytecode, { from: this.state.from, gas: 3000000 }).at(address);

      console.log('lava:', lava)
      const contract = new EthContract(eth);
      this.setState({ lava, eth, contract }, resolve);
    })
  }

  async componentDidMount(){
    await this.getContract();
    console.log('done');
  }

  async waitForTxToBeMined(txHash) {
    let txReceipt
    while (!txReceipt) {
      try {
        txReceipt = await this.state.eth.getTransactionReceipt(txHash)
      } catch (err) {
        alert('failed transaction ~ wFTTBM');
      }
    }
    alert('successful transaction ~ wFTTBM');
  }

  lavaFun = (which) => async (value) => {
    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    } else {
      alert('You must enter numerical input!');
      return;
    }

    console.log('THE VALUE:', value);

    //
    // WAY #1 :
    //

    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000,
      });

      // setup an instance of that contract
      const lava = Lava.at(address);

      // use a method that comes with the contract
      lava.submitRand(value)
      .then((txHash) => {
        console.log(txHash);
        this.waitForTxToBeMined(txHash);
      })
      .catch(console.error)
    });
    return;

    //
    // WAY #2 :
    //

    let numHex = unit.toWei(2,'wei');
    console.log('numHex:', numHex);
    this.state.lava.submitRand(value, numHex, {
      address,
      from: this.state.from,
      gasLimit: 230000,
      nonce: Math.floor(Math.random()*100)
    }, (error, transactionHash) => {
      console.log(error, transactionHash);
      console.log(unit.fromWei(numHex, 'ether'));
      console.log('Paid:', numHex);
      console.log('Value:', value);
      // console.log(window.web3.utils.hexToNumber(numHex));
      // this.setState({transactionHash});
    });
    return;

    //
    //
    //

    let msg, foo;

    let addr = 'd12686c789f3434fab6df795a63aefbd'; // API key !!!

    let options = {address: addr};
    window.web3.eth.filter(options, function(error,result){console.log(result)});

    switch (which) {
      case 'RANDER':
        msg = 'Successful random number submission!';
        foo = this.state.lava.submitRand(parseInt(value), { from: addr, value: '100' });
        break;
      case 'PREDER':
        msg = 'Successful random number prediction!';
        foo = this.state.lava.submitPredWindow(parseInt(value), { from: addr, value: '100' });
        break;
      case 'CUSTOMER':
        msg = 'Lava successfully returned the random number: ... ';
        foo = this.state.lava.requestRand({ from: addr, value: '900' });
        break;
      default:
        alert('INVALID FUNCTION TYPE! ~ lavaFun');
        return;
    }
    alert(which + ' CALLED!');

    if (!this.state.lava) {
      alert('Not yet connected to Lava contract!');
    } else {
      foo.then((txHash) => {
          console.log('Transaction sent');
          console.dir(txHash);
          return txHash;
        })
        .then((txHash) => {
          this.waitForTxToBeMined(txHash);
        })
        .then(() => {
          alert(msg);
        })
        .catch(console.error);
    }
  }

  render(){
    return(
      <div className="App">
        <Header />
        <FormSection
          rander={this.lavaFun('RANDER').bind(this)}
          preder={this.lavaFun('PREDER').bind(this)}
          customer={this.lavaFun('CUSTOMER').bind(this)}
        />
        <Body />
      </div>
    );
  }
}

export default App;
