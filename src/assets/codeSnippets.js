
module.exports = {

    setup : `
    import EthContract from 'ethjs-contract'; // const EthContract = require('ethjs-contract');
    import Eth from 'ethjs';

    //the contract info
    export const abi = [ FILL THIS IN WITH THE LAVA CONTRACT ABI ]
    export const address = '0xaB338DB878F7CE6f2B9BDc90dF700ebb0B88A30E';
    export const bytecode = "  ~ GENERATE THE CONTRACT BYTE CODE AKA THE 'CONTRACT CREATION CODE' ~ "

    // setup the instance of the contract
    const eth = new Eth(window.web3.currentProvider);
    const contract = new EthContract(eth);

    //you may need to wait until transaction are mined
    async waitForTxToBeMined(txHash, msg) {
        let txReceipt
        while (!txReceipt) {
          try {
            txReceipt = await eth.getTransactionReceipt(txHash)
          } catch (err) {
            alert('Failed transaction!');
          }
        }
        alert(msg);
        //at this point the transaction has been mined
        doThingsNowThatItHasBeenMined();
    }

    `,

    codeString : `

    //setup the instance of the contract
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
    `,


    requestNumber :
    `
      requestRand = (v) => {
        this.setState({ requestSent: true });
        this.state.eth.accounts().then((accounts) => {
          const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
            from: accounts[0],
            gas: 3000000
          }); // we up the gas limit here because random number requests can get pretty pricey
          const lava = Lava.at(this.state.address); // setup an instance of that contract
          lava.requestRand({value: unit.toWei(857,'wei')})
          .then((txHash) => {
            console.log('Transaction hash:', txHash);
            this.waitForTxToBeMined(txHash, 'Lava will be returning a random number shortly... ' );
          })
          .catch((error) => {
            alert('Request error/rejection! (perhaps the gas was too high)');
          })
        });
      }

      //Here is an example event listener for the request function. This is
      //how you would listen for the requested numbers that get broadcasted.
      startRequestListener = () => {
        eth.accounts().then((accounts) => {
          const Lava = contract(abi, bytecode, {
            from: accounts[0],
            gas: 300000
          });
          const lava = Lava.at(address); // setup an instance of that contract
          //
          // Source: https://github.com/ethjs/ethjs-filter/issues/4
          //
          let reqFilter = lava.requestedRand();
          if(!address) throw new Error('no address')
          reqFilter.new({ toBlock: 'latest', address, to: undefined })
            .then((result) => {
              console.log(result); // let users see that the event listener is working
            })
            .catch((error) => {  // check for errors setting up listener
              throw new Error(error)
            });
          reqFilter.watch((err, result) => {
              console.log('Result:', result);
              const newNumber = parseInt(result.data, 16);
              alert('Lava successfully returned the random number: ' + String(parseInt(result.data, 16)));
          });
        });
      }

    `,

    submitRand : `
    submitRand = (value) => {
        if (!isNaN(parseInt(value))) {
          value = parseInt(value);
        } else {
          alert('You must enter numerical input!');
          return;
        }
        eth.accounts().then((accounts) => {
          const Lava = contract(abi, bytecode, {
            from: accounts[0],
            gas: 300000
          });
          const lava = Lava.at(address); // setup an instance of that contract
          lava.submitRand(value, {value: unit.toWei(1,'wei')})
          .then((txHash) => {
            console.log('Transaction hash:', txHash);
            this.waitForTxToBeMined(txHash, 'Successful random number submission!');
          })
          .catch(console.error)
        });
      }
    `,

    predict : `
    // You'll want to collect all the submitted numbers to run through your prediction algorithm.
    // Here is an example of setting up an event listener to do that
    startRandSubmitListener = () => {
      this.state.eth.accounts().then((accounts) => {
        const Lava = this.state.contract(this.state.abi, this.state.bytecode, {
          from: accounts[0],
          gas: 300000
        });
        const lava = Lava.at(this.state.address); // setup an instance of that contract
        //
        // Source: https://github.com/ethjs/ethjs-filter/issues/4
        //
        let filter = lava.receivedRand();
        this.setState({filter});
        if(!this.state.address) throw new Error('no address')
        filter.new({ toBlock: 'latest', address: this.state.address, to: undefined })
          .then((result) => {
            console.log('Filter:', result)
          })
          .catch((error) => {
            throw new Error(error)
          });
        filter.watch((err, result) => {
          if (!result) {
            result = JSON.parse(String(err).split("'")[1])[0];
          }
          console.log('Result:', result);
          alert('You just submitted the random number: ' + String(parseInt(result.data, 16)));
        });
      });
    }


    //then to predict a stream of number you could do the following
    submitPredWindow = (value) => {
        if (!isNaN(parseInt(value))) {
          value = parseInt(value);
        } else {
          alert('You must enter numerical input!');
          return;
        }
        eth.accounts().then((accounts) => {
          const Lava = contract(abi, bytecode, {
            from: accounts[0],
            gas: 300000
          });
          const lava = Lava.at(address); // setup an instance of that contract
          lava.submitPredWindow([value], {value: unit.toWei(1*[value].length,'wei')})
          .then((txHash) => {
            console.log('Transaction hash:', txHash);
            this.waitForTxToBeMined(txHash, 'Successful prediction window submission!');
          })
          .catch(console.error)
        });
      }
    `
}
