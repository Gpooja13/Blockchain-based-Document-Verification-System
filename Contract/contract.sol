// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Verification {
    constructor() {
        owner = msg.sender;
    }

    uint16 public count_Exporters = 0;
    uint16 public count_hashes = 0;
    address public owner;

    struct Exporter_Record {
        uint256 blockNumber;
        uint256 minetime;
        string info;
    }

    struct Record {
        uint256 blockNumber;
        uint256 minetime;
        string info;
        string ipfs_hash;
        string rollno;
        string name;
        string description;
        string email;
    }

    // Mappings for storing document hashes and exporters
    mapping(bytes32 => Record) private docHashes;
    mapping(address => Exporter_Record) public Exporters;
    mapping(bytes32 => bytes32) private emailRollnoToHash;

    //---------------------------------------------------------------------------------------------------------//
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    modifier authorised_Exporter(bytes32 _doc) {
        require(
            keccak256(abi.encodePacked(Exporters[msg.sender].info)) ==
                keccak256(abi.encodePacked(docHashes[_doc].info)),
            "Caller is not authorised to edit this document"
        );
        _;
    }

    modifier canAddHash() {
        require(
            Exporters[msg.sender].blockNumber != 0,
            "Caller not authorised to add documents"
        );
        _;
    }

    //---------------------------------------------------------------------------------------------------------//

    // Event emitted when an exporter is added
    event ExporterAdded(
        address indexed exporterAddress,
        string info,
        uint256 minetime,
        address registerBy
    );

    // Event emitted when an exporter is deleted
    event ExporterDeleted(
        address indexed exporterAddress,
        uint256 minetime,
        string info
    );

    // Event emitted when a document hash is added
    event AddHash(
        address indexed exporter,
        bytes32 indexed hash,
        string rollno,
        uint256 minetime,
        string ipfs_hash,
        string name,
        string description,
        string email
    );

    // Event emitted when a document hash is deleted
    event HashDeleted(
        bytes32 indexed hash,
        uint256 minetime,
        address indexed deletedBy
    );

    //----------------------------------------------------------------------------------------------------------//

    function add_Exporter(address _add, string calldata _info)
        external
        onlyOwner
    {
        require(Exporters[_add].blockNumber == 0, "Exporter already exists");

        // Create a new Exporter record with a unique ID
        Exporter_Record memory newExporter = Exporter_Record({
            blockNumber: block.number,
            minetime: block.timestamp,
            info: _info
        });

        Exporters[_add] = newExporter;
        count_Exporters++;

        emit ExporterAdded(_add, _info, block.timestamp, owner);
    }

    function delete_Exporter(address _add) external onlyOwner {
        require(Exporters[_add].blockNumber != 0, "Exporter does not exist");

        uint256 minetime = Exporters[_add].minetime; // Capture the exporter's unique ID
        string memory info = Exporters[_add].info;
        delete Exporters[_add];
        count_Exporters--;

        emit ExporterDeleted(_add, minetime, info); // Emit ExporterDeleted event with the ID
    }

    // Viewing Functions to Retrieve Mappings

    function getExporterInfo(address _add)
        external
        view
        returns (string memory)
    {
        return (Exporters[_add].info);
    }

    function changeOwner(address _newOwner)
        public
        onlyOwner
        validAddress(_newOwner)
    {
        owner = _newOwner;
    }

    function addDocHash(
        bytes32 hash,
        Record calldata details // Using struct to combine parameters
    ) public canAddHash {
        require(docHashes[hash].blockNumber == 0, "Hash already exists");

        docHashes[hash] = Record({
            blockNumber: block.number,
            minetime: block.timestamp,
            info: Exporters[msg.sender].info,
            ipfs_hash: details.ipfs_hash,
            rollno: details.rollno,
            name: details.name,
            description: details.description,
            email: details.email
        });

        count_hashes++;

        bytes32 compositeKey = keccak256(
            abi.encodePacked(details.email, details.rollno)
        );
        emailRollnoToHash[compositeKey] = hash;

        emit AddHash(
            msg.sender,
            hash,
            details.rollno,
            block.timestamp,
            details.ipfs_hash,
            details.name,
            details.description,
            details.email
        );
    }

    function findDocByEmailAndRollno(
        string calldata _email,
        string calldata _rollno
    ) external view returns (bytes32 hash, Record memory record) {
       
        bytes32 compositeKey = keccak256(abi.encodePacked(_email, _rollno));
        bytes32 documentHash = emailRollnoToHash[compositeKey];
        require(
            documentHash != 0,
            "Document not found for the given email and roll number"
        );

        record = docHashes[documentHash];

        return (documentHash, record);
    }

    function verifyDocHash(bytes32 _hash)
        external
        view
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        Record memory record = docHashes[_hash];
        return (
            record.blockNumber,
            record.minetime,
            record.info,
            record.ipfs_hash,
            record.name,
            record.description,
            record.rollno,
            record.email
        );
    }

    function deleteHash(bytes32 _hash) public authorised_Exporter(_hash) canAddHash {
    require(docHashes[_hash].minetime != 0, "Hash does not exist");

    Record storage record = docHashes[_hash]; // Retrieve the record only once
    bytes32 compositeKey = keccak256(abi.encodePacked(record.email, record.rollno)); // Use the stored record

    emit HashDeleted(_hash, record.minetime, msg.sender); // Use the stored record for emitting event

    delete docHashes[_hash];
    delete emailRollnoToHash[compositeKey];
    count_hashes--;
}

    //---------------------------------------------------------------------------------------------------------//
}
