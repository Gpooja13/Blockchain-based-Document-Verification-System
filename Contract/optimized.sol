// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Verification {
    constructor() {
        owner = msg.sender;
    }

    uint16 public count_Exporters = 0;
    uint16 public count_hashes = 0;
    address public owner;

    struct Record {
        uint256 blockNumber;
        uint256 minetime;
        string info;
        string ipfs_hash;
        string name;
        string description;
    }

    struct Exporter_Record {
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
        string info,
        uint256 minetime,
        address registerBy
    );

    // Event emitted when an exporter is deleted
    event ExporterDeleted(address indexed exporterAddress, string info);

    // Event emitted when a document hash is added
    event AddHash(
        address indexed exporter,
        bytes32 indexed hash,
        uint256 minetime,
        string info,
        string ipfs_hash,
        string name,
        string description
    );

    // Event emitted when a document hash is deleted
    event HashDeleted(bytes32 indexed hash, address indexed deletedBy);

    //----------------------------------------------------------------------------------------------------------//

    function add_Exporter(address _add, string calldata _info)
        external
        onlyOwner
    {
        require(Exporters[_add].blockNumber == 0, "Exporter already exists");

        Exporter_Record memory newExporter = Exporter_Record({
            blockNumber: block.number,
            minetime: block.timestamp,
            info: _info,
            registerBy: owner
        });

        Exporters[_add] = newExporter;
        count_Exporters++;

        emit ExporterAdded(_add, _info, block.timestamp, owner); // Emit ExporterAdded event
    }

    function delete_Exporter(address _add) external onlyOwner {
        require(Exporters[_add].blockNumber != 0, "Exporter does not exist");

        string memory info = Exporters[_add].info;
        delete Exporters[_add];
        count_Exporters--;

        emit ExporterDeleted(_add, info); // Emit ExporterDeleted event
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
        string calldata _description
    ) public canAddHash {
        require(docHashes[hash].blockNumber == 0, "Hash already exists");

        Record memory newRecord = Record(
            block.number,
            block.timestamp,
            Exporters[msg.sender].info,
            _ipfs,
            _name,
            _description
        );

        docHashes[hash] = newRecord;
        count_hashes++;

        emit AddHash(
            msg.sender,
            hash,
            block.timestamp,
            Exporters[msg.sender].info,
            _ipfs,
            _name,
            _description
        ); // Emit AddHash event
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
            record.description
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

        emit HashDeleted(_hash, msg.sender); // Emit HashDeleted event
    }

    //---------------------------------------------------------------------------------------------------------//
    // Viewing Functions to Retrieve Mappings

    function getExporterInfo(address _add)
        external
        view
        returns (string memory)
    {
        return Exporters[_add].info;
    }
}
