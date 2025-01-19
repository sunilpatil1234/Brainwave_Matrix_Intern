// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract Voting {
    address public owner; // Address of the contract owner
    mapping(address => bool) public voters; // To track whether an address has voted
    mapping(string => uint256) public candidates; // To track votes for each candidate
    mapping(string => bool) public validCandidates; // Mapping to check if a candidate is valid
    string[] public candidateList; // List of candidates

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    constructor(string[] memory _candidateList) {
        owner = msg.sender; // Set the owner of the contract as the deployer
        for (uint256 i = 0; i < _candidateList.length; i++) {
            candidateList.push(_candidateList[i]);
            candidates[_candidateList[i]] = 0; // Initialize each candidate's vote count to 0
            validCandidates[_candidateList[i]] = true; // Mark the candidate as valid
        }
    }

    event Voted(address indexed voter, string candidate);

    function vote(string memory _candidate) public {
        require(!voters[msg.sender], "You have already voted."); // Check if the voter has already voted
        require(validCandidates[_candidate], "Invalid candidate."); // Check if the candidate is valid

        voters[msg.sender] = true; // Mark the voter as having voted
        candidates[_candidate]++; // Increment the vote count for the chosen candidate

        emit Voted(msg.sender, _candidate); // Emit a Voted event
    }

    function addCandidate(string memory _candidate) public onlyOwner {
        require(!validCandidates[_candidate], "Candidate already exists."); // Ensure the candidate doesn't already exist
        candidateList.push(_candidate); // Add the new candidate to the list
        candidates[_candidate] = 0; // Initialize the candidate's vote count to 0
        validCandidates[_candidate] = true; // Mark the candidate as valid
    }

    function getVotes(string memory _candidate) public view returns (uint256) {
        require(validCandidates[_candidate], "Invalid candidate."); // Ensure the candidate is valid
        return candidates[_candidate]; // Return the vote count for the candidate
    }

    function getCandidateList() public view returns (string[] memory) {
        return candidateList; // Return the list of candidates
    }
}
