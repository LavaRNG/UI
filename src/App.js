import React, { Component } from "react";
import FormSection from "./components/FormSection";
import EthContract from 'ethjs-contract'; // const EthContract = require('ethjs-contract');
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
      filter: null,
      randomGot: null,
      requestSent: false,
      requestGot : false
    }
  }

  getContract = () => {
    return new Promise((resolve, reject) => {

      const eth = new Eth(window.web3.currentProvider);
      // const eth = new Eth(new HttpProvider('https://rinkeby.infura.io/v3/3d0bbf8a09bb4c41b8bd03ffd7821f6f'));

      const contract = new EthContract(eth);
      this.setState({ eth, contract }, resolve);
    })
  }

  async componentDidMount(){
    await this.getContract();
  }

  onComponentWillUnmount() {
    this.state.filter.uninstall(); // end our contract event listener
  }

  startEventListener = () => {
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(address); // setup an instance of that contract
      //
      // Source: https://github.com/ethjs/ethjs-filter/issues/4
      //
      let filter = lava.receivedRand()
      this.setState({filter});
      if(!address) throw new Error('no address')
      filter.new({ toBlock: 'latest', address, to: undefined })
        .then((result) => {
          console.log('Filter:', result)
        })
        .catch((error) => {
          throw new Error(error)
        });
      filter.watch((err, result) => {
        //
        // We suspect that their code is flawed in that it expects the "data" property to be an array, but it's a hex value.
        //
        // console.log("WATCH!");
        // console.log(err);
        // if(err) throw new Error()
        //
        console.log('Event that just occurred:', result);
      });
    });
  }

  displayLoader = () => {
    this.setState({ requestSent: true });
  }

  async waitForTxToBeMined(txHash, msg) {
    let txReceipt
    while (!txReceipt) {
      try {
        txReceipt = await this.state.eth.getTransactionReceipt(txHash)
      } catch (err) {
        alert('Failed transaction!');
      }
    }
    alert(msg);
    this.setState({requestSent: false, requestGot : true});
  }

  submitRand = (value) => {
    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    } else {
      alert('You must enter numerical input!');
      return;
    }
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(address); // setup an instance of that contract
      lava.submitRand(value, {value: unit.toWei(2,'wei')}) // use a method that comes with the contract
      .then((txHash) => {
        console.log('Transaction hash:', txHash);
        this.waitForTxToBeMined(txHash, 'Successful random number submission!');
      })
      .catch(console.error)
    });
  }

  submitPredWindow = (value) => {
    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    } else {
      alert('You must enter numerical input!');
      return;
    }
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(address); // setup an instance of that contract
      lava.submitPredWindow([value], {value: unit.toWei(2,'wei')}) // use a method that comes with the contract
      .then((txHash) => {
        console.log('Transaction hash:', txHash);
        this.waitForTxToBeMined(txHash, 'Successful prediction window submission!');
      })
      .catch(console.error)
    });
  }

  requestRand = (v) => {
    this.setState({ requestSent: true });
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(address); // setup an instance of that contract
      lava.requestRand({value: unit.toWei(900,'wei')}) // use a method that comes with the contract
      .then((txHash) => {
        console.log('Transaction hash:', txHash);
        this.waitForTxToBeMined(txHash, 'Lava successfully returned the random number: ... ' );
        this.setState({randomGot: 666});
      })
      .catch(console.error)
    });
  }

  sendTheNumberToUI() {
    
  }

  render(){
    return(
      <div className="App">
        <Header />
        <FormSection
          randomGot={this.state.randomGot}
          requestSent={this.state.requestSent}
          requestGot={this.state.requestGot}
          displayLoader={this.displayLoader}
          rander={this.submitRand.bind(this)}
          preder={this.submitPredWindow.bind(this)}
          customer={this.requestRand.bind(this)}
        />
        <Body />
      </div>
    );
  }
}

export default App;
