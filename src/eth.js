// const Eth = require('ethjs');
// const eth = new Eth(new Eth.HttpProvider('http://localhost:8545'));
// // const eth = new Eth(new Eth.HttpProvider('https://ropsten.infura.io'));
//
// // new Eth(window.web3._currentProvider);
//
// // eth.getBlockByNumber(45300, true, (err, block) => {
// //   // result null { ...block data... }
// // });
//
// // const etherValue = Eth.toWei(72, 'ether'); // result <BN: 3e733628714200000>
//
// if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {
//   eth.setProvider(window.web3.currentProvider);
// } else {
//   eth.setProvider(provider); // set to TestRPC if not available
// }
//
// const tokenABI = [{
//   "constant": true,
//   "inputs": [],
//   "name": "totalSupply",
//   "outputs":[{"name": "","type": "uint256"}],
//   "payable": false,
//   "type": "function",
// }];
//
// const address = '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78';
//
// const token = eth.contract(tokenABI).at(address);
//
// token.totalSupply().then((totalSupply) => {
//   // result <BN ...>  4500000
// });
//
// // token.transfer( ... ).then(txHash => eth.getTransactionSuccess(txHash)).then(receipt => console.log(receipt));
//
//
//
