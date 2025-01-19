import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './components/RegistrationForm';
import VotingForm from './components/VotingForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    const [voters, setVoters] = useState([]);
    const [votes, setVotes] = useState({});

  
    const handleRegister = (voter) => {
        setVoters([...voters, voter]);
    };

    

    const handleVote = (candidate) => {
        setVotes((prevVotes) => ({
            ...prevVotes, // Spread the previous state
            [candidate]: (prevVotes[candidate] || 0) + 1, // Update the candidate's vote count
        }));
    };
    return (
        <div className="app">
            <h1>Decentralized Voting DApp</h1>
            {/* Pass voters and setVoters as props */}
            <RegistrationForm voters={voters} setVoters={setVoters} onRegister={handleRegister} />
            <VotingForm onVote={handleVote} />
            <Dashboard voters={voters} votes={votes} />
        </div>
    );
}

export default App;
