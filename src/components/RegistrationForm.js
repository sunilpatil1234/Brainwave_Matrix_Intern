import React, { useState } from 'react';

const RegistrationForm = ({ voters, setVoters, onRegister }) => {
    const [voterName, setVoterName] = useState('');

    const handleRegister = () => {
        const normalizedVoterName = voterName.toLowerCase();
        
        // Ensure the voter is not already registered
        if (!voters.some((voter) => voter.toLowerCase() === normalizedVoterName)) {
            setVoters([...voters, voterName]);
            onRegister(voterName);
            setVoterName('');
        } else {
            alert("Voter is already registered.");
        }
    };
    
    };
    export default RegistrationForm;
