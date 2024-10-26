import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import { abi, address } from "../Utils/constants"; // Network removed for simplicity

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [email, setEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [fileHash, setFileHash] = useState(null);
  const [message, setMessage] = useState("");
  const [isFileHashed, setIsFileHashed] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [chain, setChain] = useState(null);
  const [issueEvents, setIssueEvents] = useState([]);
  const [delIssueEvents, setDelIssueEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshLog, setRefreshLog] = useState("");
  const [authorityInfo, setAuthorityInfo] = useState(null);
  const [hashcount, setHashcount] = useState(0);
  const [ownerAddress, setOwnerAddress] = useState("");

  const connect = async () => {
    if (window.ethereum) {
      try {
        const selectedAccount = await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            return accounts[0];
          })
          .catch(() => {
            throw new Error("No account selected 👍");
          });

        window.userAddress = selectedAccount;
        console.log("Connected account:", selectedAccount);
        window.localStorage.setItem("userAddress", selectedAccount); // Save the user address
        setConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("No Ethereum wallet detected. Please install MetaMask.");
    }
  };

  const get_ChainID = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("Chain ID:", chainId);
        setChain(chainId);
        return chainId;
      } catch (error) {
        console.error("Error getting chain ID:", error);
      }
    } else {
      console.error("Ethereum object does not exist");
    }
  };

  const getSha3 = async (file) => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    setMessage("Hashing Your Document 😴...");
    const reader = new FileReader();

    reader.readAsText(file, "UTF-8");

    reader.onload = async (evt) => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const hashedfile = await web3.utils.soliditySha3(evt.target.result);

        setFileHash(hashedfile);
        setIsFileHashed(true);
        setMessage("Document Hashed 😎");
        console.log(`Document Hash: ${hashedfile}`);
      } catch (error) {
        console.error("Error hashing the file", error);
        setMessage("Error hashing the file");
      }
    };

    reader.onerror = () => {
      setMessage("Error reading the file");
      setFileHash(null);
    };
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");
    setIsFileHashed(false);
    setFileHash(null);

    if (selectedFile) {
      getSha3(selectedFile);
    }
  };

  const getEthBalance = async (user) => {
    try {
      const web3 = new Web3(Web3.givenProvider); // Initialize Web3 with the given provider
      const balanceInWei = await web3.eth.getBalance(user); // Get balance in Wei
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether"); // Convert balance to Ether
      const formattedBalance = parseFloat(balanceInEther).toFixed(6); // Format to 6 decimal places
      setUserBalance(formattedBalance); // Set the formatted balance
    } catch (err) {
      console.error("Error fetching balance:", err);
      setUserBalance("n/a"); // Set to "n/a" in case of an error
    }
  };

  const initializeWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const contractAddress = address; // Use the validated contract address
      const contractABI = abi; // Use the correct ABI

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAddress = accounts[0]; // Get the user's address
        console.log("user",userAddress);
        setUserAddress(userAddress); // Store the user's address

        const contractInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);
        getEthBalance(userAddress);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    } else {
      console.error("Please install MetaMask!");
    }
  };

  const viewDocumentInNewTab = (ipfsHash) => {
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
    window.open(ipfsUrl, "_blank");
  };

  const downloadDocument = (ipfsHash) => {
    // Construct IPFS URL
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
    // Programmatically trigger the download
    const link = document.createElement("a");
    link.href = ipfsUrl;
    link.setAttribute("download", "document.pdf"); // You can set the file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <GlobalContext.Provider
      value={{
        ownerAddress,
        setOwnerAddress,
        connected,
        setConnected,
        email,
        setEmail,
        contract,
        userAddress,
        chain,
        get_ChainID,
        userBalance,
        fileHash,
        message,
        setMessage,
        isFileHashed,
        file,
        setFile,
        loading,
        setLoading,
        issueEvents,
        setIssueEvents,
        delIssueEvents,
        setDelIssueEvents,
        showModal,
        setShowModal,
        refreshLog,
        setRefreshLog,
        authorityInfo,
        setAuthorityInfo,
        hashcount,
        setHashcount,

        connect,
        initializeWeb3,
        handleFileChange,
        viewDocumentInNewTab,
        downloadDocument,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
