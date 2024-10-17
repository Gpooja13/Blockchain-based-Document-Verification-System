export const address =
  // "0xceD8A67782404D830fA4a08b653a98db22A0F472";
  // "0x3e2e0B3876C16d5e6436e830eB9465668811aD9B";
"0x99Ffad8b24890339519A249872128f37cBAAf229";

export const network = "Example : https://polygon-rpc.com/";
export const explore = "Example : https://polygonscan.com/";
// Your Contract ABI
export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_info",
				"type": "string"
			}
		],
		"name": "add_Exporter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_ipfs",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addDocHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "delete_Exporter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "exporter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minetime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfs_hash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "AddHash",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "deleteHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "exporterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minetime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registerBy",
				"type": "address"
			}
		],
		"name": "ExporterAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "exporterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "info",
				"type": "string"
			}
		],
		"name": "ExporterDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "deletedBy",
				"type": "address"
			}
		],
		"name": "HashDeleted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "count_Exporters",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "count_hashes",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Exporters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minetime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "info",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "registerBy",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "findDocHash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "getExporterInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


//Your IPFS api key in ifura.io
// export const projectId = "28LuNAotbXzcvtpOcE9F8ayKOeP";
export const projectId = "bbf50cad38e80d64ff61";
//Your api secret in ifura.io
// export const projectSecret = "3de3d9c099c6c0c168e39b8bc03e2f7a";
export const projectSecret =
  "0e69db88d05c8e9ab0f37f5dfa9f4b717121c54825fc7a8a96e42b3c384244b8";

export const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNzdkNWQ0Ni04ODA1LTRjY2EtYjE1Ni1mOTE4Yjc4NjkwY2UiLCJlbWFpbCI6ImJlbGlldml4MTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJiZjUwY2FkMzhlODBkNjRmZjYxIiwic2NvcGVkS2V5U2VjcmV0IjoiMGU2OWRiODhkMDVjOGU5YWIwZjM3ZjVkZmE5ZjRiNzE3MTIxYzU0ODI1ZmM3YThhOTZlNDJiM2MzODQyNDRiOCIsImV4cCI6MTc2MDQ4OTQyNn0.2osj2Rz7iHZr4vrhKGg7kJpE54sdf0ihrMe9WGWZXR0";

  // API Key: bbf50cad38e80d64ff61
  // API Secret: 0e69db88d05c8e9ab0f37f5dfa9f4b717121c54825fc7a8a96e42b3c384244b8
  // JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNzdkNWQ0Ni04ODA1LTRjY2EtYjE1Ni1mOTE4Yjc4NjkwY2UiLCJlbWFpbCI6ImJlbGlldml4MTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJiZjUwY2FkMzhlODBkNjRmZjYxIiwic2NvcGVkS2V5U2VjcmV0IjoiMGU2OWRiODhkMDVjOGU5YWIwZjM3ZjVkZmE5ZjRiNzE3MTIxYzU0ODI1ZmM3YThhOTZlNDJiM2MzODQyNDRiOCIsImV4cCI6MTc2MDQ4OTQyNn0.2osj2Rz7iHZr4vrhKGg7kJpE54sdf0ihrMe9WGWZXR0