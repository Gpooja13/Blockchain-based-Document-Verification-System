import { createContext, useContext, useState } from "react";
import Web3 from "web3";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [issueEvents, setIssueEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  // const convertToString = (word) => {
  //   let web3;
  //   if (window.ethereum) {
  //     // Use MetaMask's provider
  //     web3 = new Web3(window.ethereum);
  //     return web3.utils.hexToUtf8(word);
  //   }
  // };

  return (
    <GlobalContext.Provider
      value={{
        issueEvents,
        setIssueEvents,
        showModal,
        setShowModal,

        viewDocumentInNewTab,
        downloadDocument,
        // convertToString,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
