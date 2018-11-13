import React, { Component } from "react";
import FormSection from "./components/FormSection";
import EthContract from 'ethjs-contract'; 
import Eth from 'ethjs';
import unit from 'ethjs-unit';
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { bytecode, address, abi } from "./assets/Contract";

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
      const eth = new Eth(window.web3.currentProvider);
      let address = "0xaB338DB878F7CE6f2B9BDc90dF700ebb0B88A30E";
      let lava = eth.contract(abi, bytecode, { from: this.state.from, gas: 3000000 }).at(address);
      console.log('lava:', lava)
      const contract = new EthContract(eth);


      const testEvent = lava.receivedRand();
      testEvent.new( {toBlock: 'latest', address: address, to: undefined });
      testEvent.watch((err, results)=> {
        console.log("the event was triggered with value" + results);
      });

      console.log(testEvent + " is the event");
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
    // if (!isNaN(parseInt(value))) {
    //   value = parseInt(value);
    // } else {
    //   alert('You must enter numerical input!');
    //   return;
    // }
    console.log('THE VALUE:', value);
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000,
      });
      // setup an instance of that contract
      let address = "0xaB338DB878F7CE6f2B9BDc90dF700ebb0B88A30E";
      const lava = Lava.at(address);
      // use a method that comes with the contract
      lava.submitRand(value, {value: unit.toWei(2,'wei')})
      .then((txHash) => {
        console.log(txHash);
        this.waitForTxToBeMined(txHash);
      })
      .catch(console.error)
    });
    return;
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
