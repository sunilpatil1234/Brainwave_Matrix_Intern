// src/utils/web3Utils.js
import Web3 from 'web3';
import { contractAddress, contractABI } from './contractConfig';

const [contract, setContract] = useState(null);
const [accounts, setAccounts] = useState([]);


const getVoteCount = async (candidateName) => {
  const count = await contract.votes(candidateName);
  return count.toString();
};

useEffect(() => {
  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const allAccounts = await web3.eth.getAccounts();
      setAccounts(allAccounts);

      const votingContract = new web3.eth.Contract(contractABI, contractAddress);
      setContract(votingContract);
    } else {
      alert('Please install MetaMask to use this DApp!');
    }
  };

  loadBlockchainData();
}, []);




// Function to initialize Web3 with MetaMask or fallback to Infura
const initWeb3 = () => {
  // Check if the browser has MetaMask
  if (window.ethereum) {
    // Create a web3 instance using MetaMask's provider
    const web3 = new Web3(window.ethereum);
    // Request user's MetaMask account
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => console.log("MetaMask is connected"))
      .catch((err) => console.log("MetaMask connection error:", err));
    return web3;
  } else {
    // Fallback to Infura if MetaMask is not available
    const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
    return web3;
  }
};

// Smart contract interaction
const interactWithContract = async (web3, contractAddress, abi) => {
  const contract = new web3.eth.Contract(abi, contractAddress);

  // Example: Call a function from the contract (replace with your own function)
  try {
    const data = await contract.methods.yourContractMethod().call();
    console.log("Contract Data:", data);
  } catch (error) {
    console.error("Contract interaction error:", error);
  }
};

export { initWeb3, interactWithContract };
