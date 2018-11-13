
module.exports = {

    setup : `
    import EthContract from 'ethjs-contract'; // const EthContract = require('ethjs-contract');
    import Eth from 'ethjs';

    //the contract info 
    export const abi = [ FILL THIS IN WITH THE LAVA CONTRACT ABI ]
    export const address = '0xaB338DB878F7CE6f2B9BDc90dF700ebb0B88A30E';
    export const bytecode = "  ~ GENERATE THE CONTRACT BYTE CODE ~ "

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
        eth.accounts().then((accounts) => {
          const Lava = contract(abi, bytecode, {
            from: accounts[0],
            gas: 300000
          });
          const lava = Lava.at(address); // setup an instance of that contract
          lava.requestRand({value: unit.toWei(900,'wei')}) // use a method that comes with the contract
          .then((txHash) => {
            console.log('Transaction hash:', txHash);
            this.waitForTxToBeMined(txHash, 'Lava successfully returned the random number: ... ' );

            NEED TO FILL THIS PART IN ONCE YOU GET NUMBER

        })
          .catch(console.error)
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
          lava.submitRand(value, {value: unit.toWei(2,'wei')}) // use a method that comes with the contract
          .then((txHash) => {
            console.log('Transaction hash:', txHash);
            this.waitForTxToBeMined(txHash, 'Successful random number submission!');
          })
          .catch(console.error)
        });
      }
    `



}