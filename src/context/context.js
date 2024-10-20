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


  return (
    <GlobalContext.Provider
      value={{
        issueEvents,
        setIssueEvents,
        showModal,
        setShowModal,

        viewDocumentInNewTab,
        downloadDocument
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
