import Web3 from 'web3';

// Define your networks (Mainnet, Testnet)
const networks = {
  1: { // Mainnet
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    explorerUrl: 'https://etherscan.io'
  },
  3: { // Ropsten Testnet
    name: 'Ropsten Testnet',
    chainId: 3,
    rpcUrl: 'https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    explorerUrl: 'https://ropsten.etherscan.io'
  },
  4: { // Rinkeby Testnet
    name: 'Rinkeby Testnet',
    chainId: 4,
    rpcUrl: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    explorerUrl: 'https://rinkeby.etherscan.io'
  }
};

// ABI of the smart contract
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setBalance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Connect to Ethereum Network (via Infura or MetaMask)
let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request account access
} else {
  // Fallback to Infura
  const provider = new Web3.providers.HttpProvider(networks[3].rpcUrl); // Choose Ropsten as default
  web3 = new Web3(provider);
}

// Smart contract address (replace with your deployed contract address)
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

// Initialize contract
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to get balance from contract
async function getBalance() {
  try {
    const balance = await contract.methods.getBalance().call();
    console.log(`Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    return balance;
  } catch (error) {
    console.error('Error getting balance:', error);
  }
}

// Function to set balance (this requires a signed transaction)
async function setBalance(valueInEther) {
  try {
    const accounts = await web3.eth.getAccounts();
    const valueInWei = web3.utils.toWei(valueInEther, 'ether');
    
    await contract.methods.setBalance(valueInWei).send({ from: accounts[0] });
    console.log(`Balance updated to ${valueInEther} ETH`);
  } catch (error) {
    console.error('Error setting balance:', error);
  }
}

// Function to check network
async function checkNetwork() {
  const networkId = await web3.eth.net.getId();
  const networkName = networks[networkId] ? networks[networkId].name : 'Unknown Network';
  console.log(`Connected to: ${networkName}`);
}

// Export the functions and configurations
export { getBalance, setBalance, checkNetwork, networks, abi };

