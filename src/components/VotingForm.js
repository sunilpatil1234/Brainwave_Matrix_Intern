import React, { useState } from "react";

const VotingForm = () => {
  // State to manage voter names and votes
  const [voters, setVoters] = useState([]);
  const [votes, setVotes] = useState({});
  const [voterName, setVoterName] = useState("");
  const [candidateName, setCandidateName] = useState("");

  // Handle voter registration
  const registerVoter = () => {
    if (voterName.trim() && !voters.includes(voterName)) {
      setVoters([...voters, voterName]);
      setVoterName("");
      alert(`${voterName} is successfully registered!`);
    } else {
      alert("Voter name is empty or already registered!");
    }
  };
  

  // Handle voting
  const castVote = () => {
    if (candidateName.trim()) {
      setVotes({
        ...votes,
        [candidateName]: (votes[candidateName] || 0) + 1,
      });
      setCandidateName("");
      alert(`${candidateName} has successfully received a vote.`);
    } else {
      alert("Please enter a valid candidate name!");
    } 
    
    
  };

  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voting Application : </h1>

      {/* Voter Registration */}
      <h1>Voter Register :</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Voter Name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
        />
        <button onClick={registerVoter}>Register</button>
      </div>


      {/* Voting Section */}
      <div style={{ marginTop: "20px" }}>
        <h3>Vote :</h3>
        <input
          type="text"
          placeholder="Enter Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <button onClick={castVote}>Vote</button>
      </div>

      

      {/* Voting Dashboard */}
      <div style={{ marginTop: "30px" }}>
        <h3>Voting Dashboard :</h3>
        <p>
          <strong>Voters:</strong> {voters.join(", ")}
        </p>
        <p>
          <strong>Votes:</strong>
        </p>
        <ul>
          {Object.keys(votes).map((candidate) => (
            <li key={candidate}>
              {candidate}: {votes[candidate]} votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VotingForm;
