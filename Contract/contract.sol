// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Verification {
    constructor() {
        owner = msg.sender;
    }

    uint16 public count_Exporters = 0;
    uint16 public count_hashes = 0;
    address public owner;
    uint256 public nextExporterId = 1; // Counter for unique exporter IDs

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

    struct Exporter_Record {
        uint256 exporterId; // Unique ID for each exporter
        uint256 blockNumber;
        uint256 minetime;
        string info;
        address registerBy;
    }

    // Mappings for storing document hashes and exporters
    mapping(bytes32 => Record) private docHashes;
    mapping(address => Exporter_Record) public Exporters;

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
        uint256 exporterId,
        string info,
        uint256 minetime,
        address registerBy
    );

    // Event emitted when an exporter is deleted
    event ExporterDeleted(
        address indexed exporterAddress,
        uint256 exporterId,
        string info
    );

    // Event emitted when a document hash is added
    event AddHash(
        address indexed exporter,
        bytes32 indexed hash,
        string indexed rollno,
        uint256 minetime,
        string ipfs_hash,
        string name,
        string description,
        string email
    );

    // Event emitted when a document hash is deleted
    event HashDeleted(bytes32 indexed hash, address indexed deletedBy);

    //----------------------------------------------------------------------------------------------------------//

    function add_Exporter(address _add, string calldata _info)
        external
        onlyOwner
    {
        require(Exporters[_add].blockNumber == 0, "Exporter already exists");

        // Create a new Exporter record with a unique ID
        Exporter_Record memory newExporter = Exporter_Record({
            exporterId: nextExporterId,
            blockNumber: block.number,
            minetime: block.timestamp,
            info: _info,
            registerBy: owner
        });

        Exporters[_add] = newExporter;
        count_Exporters++;
        nextExporterId++; // Increment the exporter ID counter

        emit ExporterAdded(_add, newExporter.exporterId, _info, block.timestamp, owner);
    }

    function delete_Exporter(address _add) external onlyOwner {
        require(Exporters[_add].blockNumber != 0, "Exporter does not exist");

        uint256 exporterId = Exporters[_add].exporterId; // Capture the exporter's unique ID
        string memory info = Exporters[_add].info;
        delete Exporters[_add];
        count_Exporters--;

        emit ExporterDeleted(_add, exporterId, info); // Emit ExporterDeleted event with the ID
    }

    // Viewing Functions to Retrieve Mappings

    function getExporterInfo(address _add)
        external
        view
        returns (string memory, uint256)
    {
        return (Exporters[_add].info, Exporters[_add].exporterId);
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
        string calldata _ipfs,
        string calldata _name,
        string calldata _description,
        string calldata _rollno,
        string calldata _email
    ) public canAddHash {
        require(docHashes[hash].blockNumber == 0, "Hash already exists");

        Record memory newRecord = Record(
            block.number,
            block.timestamp,
            Exporters[msg.sender].info,
            _ipfs,
            _rollno,
            _name,
            _description,
            _email        
        );

        docHashes[hash] = newRecord;
        count_hashes++;

        emit AddHash(
            msg.sender,
            hash,
            _rollno,
            block.timestamp,
            _ipfs,
            _name,
            _description,
            _email
        ); 
    }

    function findDocHash(bytes32 _hash)
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

    function deleteHash(bytes32 _hash)
        public
        authorised_Exporter(_hash)
        canAddHash
    {
        require(docHashes[_hash].minetime != 0, "Hash does not exist");

        delete docHashes[_hash];
        count_hashes--;

        emit HashDeleted(_hash, msg.sender);
    }
    //---------------------------------------------------------------------------------------------------------//
}
