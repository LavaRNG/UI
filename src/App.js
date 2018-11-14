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
      reqFilter: null,
      randomGot: null,
      requestSent: false,
      requestGot : false
    }
  }

  getContract = () => {
    return new Promise((resolve, reject) => {
      const eth = new Eth(window.web3.currentProvider);
      const contract = new EthContract(eth);
      this.setState({ eth, contract }, resolve);
    })
  }

  async componentDidMount(){
    await this.getContract();
    this.startRequestListener();
    this.startRandSubmitListener();
  }

  onComponentWillUnmount() {
    this.state.filter.uninstall(); // end our contract event listener
    this.state.reqFilter.uninstall(); // end our contract event listener
  }

  startRandSubmitListener = () => {
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(address); // setup an instance of that contract
      //
      // Source: https://github.com/ethjs/ethjs-filter/issues/4
      //
      let filter = lava.receivedRand();
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
        // We suspect that ethjs's code is flawed in that it expects the "data" property to be an array, but it's a hex value.
        //
        // console.log("WATCH!");
        // console.log(err);
        // if(err) throw new Error()
        //
        if (!result) {
          result = JSON.parse(String(err).split("'")[1])[0];
        }
        console.log('Result:', result);
        alert('You just submitted the random number: ' + String(parseInt(result.data, 16)));
      });
    });
  }

  startRequestListener = () => {
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(address); // setup an instance of that contract
      //
      // Source: https://github.com/ethjs/ethjs-filter/issues/4
      //
      let reqFilter = lava.requestedRand();
      this.setState({reqFilter});
      if(!address) throw new Error('no address')
      reqFilter.new({ toBlock: 'latest', address, to: undefined })
        .then((result) => {
          console.log('Request Filter:', result)
        })
        .catch((error) => {
          throw new Error(error)
        });
      reqFilter.watch((err, result) => {
        //
        // We suspect that ethjs's code is flawed in that it expects the "data" property to be an array, but it's a hex value.
        //
        // console.log("WATCH!");
        // console.log(err);
        // if(err) throw new Error()
        //
        if (this.state.requestSent) {
          if (!result) {
            result = JSON.parse(String(err).split("'")[1])[0];
          }
          console.log('Result:', result);
          this.setState({ randomGot: parseInt(result.data, 16), requestSent: false, requestGot: true });
          alert('Lava successfully returned the random number: ' + String(parseInt(result.data, 16)));
        }
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
      .catch((error) => {
        alert('Random number submission error/rejection!');
        console.log(error);
      })
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
      .catch((error) => {
        alert('Prediction submission error/rejection!');
        console.log(error);
      })
    });
  }

  requestRand = (v) => {
    this.setState({ requestSent: true });
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(abi, bytecode, {
        from: accounts[0],
        gas: 3000000
      });
      const lava = Lava.at(address); // setup an instance of that contract

      lava.requestRand({value: unit.toWei(900,'wei')}) // use a method that comes with the contract
      .then((txHash) => {
        console.log('Transaction hash:', txHash);
        this.waitForTxToBeMined(txHash, 'Lava will be returning a random number shortly... ' );
      })
      .catch((error) => {
        alert('Request error/rejection! (perhaps the gas was too high)');
        this.setState({ requestSent: false, requestGot: true });
        console.log(error);
      })
    });
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
