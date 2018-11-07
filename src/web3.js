import Web3 from 'web3';
import { Web3Provider } from 'react-web3';
if (window.web3) {
  // Then replace the old injected version by the local Web3.JS version 1.0.0-beta.N
  window.web3 = new Web3(window.web3.currentProvider);
}
const web3 = new Web3(window.web3.currentProvider);
export default web3;