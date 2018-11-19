import React, { Component } from "react";
import FormSection from "./components/FormSection";
import EthContract from 'ethjs-contract'; // const EthContract = require('ethjs-contract');
import Eth from 'ethjs';
import unit from 'ethjs-unit';

import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { bytecode_main, bytecode_rinkeby, address_main, address_rinkeby, abi_main, abi_rinkeby } from "./assets/Contract";

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
      requestGot : false,
      abi: null,
      address: null,
      bytecode: null,
      network: null
    }
  }

  getContract = () => {
    return new Promise((resolve, reject) => {
      const eth = new Eth(window.web3.currentProvider);
      const contract = new EthContract(eth);
      this.setState({ eth, contract }, resolve);
    })
  }

  getNetwork = () => {
    return new Promise((resolve, reject) => {
      let the_abi, the_address, the_bytecode;
      window.web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case "1":
            alert('Welcome to Lava on Mainnet!');
            the_abi = abi_main;
            the_address = address_main;
            the_bytecode = bytecode_main;
            break;
          case "4":
            alert('Welcome to Lava on Rinkeby!');
            the_abi = abi_rinkeby;
            the_address = address_rinkeby;
            the_bytecode = bytecode_rinkeby;
            break;
          default:
            alert("You're on an unsupported/unknown network. Please switch to Mainnet (1) or Rinkeby (4) to play with Lava.");
        }
        this.setState({abi: the_abi, address: the_address, bytecode: the_bytecode, network: netId}, resolve);
      })
    })
  }

  async componentDidMount(){
    await this.getContract();
    await this.getNetwork();
    this.startRequestListener();
    /* this.startRandSubmitListener(); */

    console.log('componentDidMount 1: ', this.state.network);
  }

  componentWillUnmount() {
    this.state.reqFilter.uninstall(); // end our contract event listener
    /* this.state.filter.uninstall(); */
  }

  /*
  The following is a listener for random number submissions.
  Our dapp doesn't use it, but yours may!
  Take note of the associated code in componentDidMount() and componentWillUnmount().
  */
  // startRandSubmitListener = () => {
  //   this.state.eth.accounts().then((accounts) => {
  //     const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
  //       from: accounts[0],
  //       gas: 300000
  //     });
  //     const lava = Lava.at(this.state.address); // setup an instance of that contract
  //     let filter = lava.receivedRand();
  //     this.setState({filter});
  //     if(!this.state.address) throw new Error('no address')
  //     filter.new({ toBlock: 'latest', address: this.state.address, to: undefined })
  //       .then((result) => {
  //         console.log('Filter:', result)
  //       })
  //       .catch((error) => {
  //         throw new Error(error)
  //       });
  //     filter.watch((err, result) => {
  //       if (!result) {
  //         result = JSON.parse(String(err).split("'")[1])[0];
  //       }
  //       console.log('Result:', result);
  //       alert('You just submitted the random number: ' + String(parseInt(result.data, 16)));
  //     });
  //   });
  // }

  startRequestListener = () => {
    this.state.eth.accounts().then((accounts) => {
      const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(this.state.address); // setup an instance of that contract
      //
      // Source: https://github.com/ethjs/ethjs-filter/issues/4
      //
      let reqFilter = lava.requestedRand();
      this.setState({reqFilter});
      if(!this.state.address) throw new Error('no address')
      reqFilter.new({ toBlock: 'latest', address: this.state.address, to: undefined })
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
      const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(this.state.address); // setup an instance of that contract
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
      const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
        from: accounts[0],
        gas: 300000
      });
      const lava = Lava.at(this.state.address); // setup an instance of that contract
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
      const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
        from: accounts[0],
        gas: 3000000
      });
      const lava = Lava.at(this.state.address); // setup an instance of that contract

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
