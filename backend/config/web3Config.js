const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3('http://127.0.0.1:7545'); // Ganache
const contractABI = require('../abi/CertificateNFT.json');
const contractAddress = '0xYourDeployedContractAddress';

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

module.exports = { web3, contract };
