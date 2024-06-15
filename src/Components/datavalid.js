import React, { useState } from 'react';

const DataValid = ({ onNameChange }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleNameChange = (setName, field) => (e) => {
        const input = e.target.value;
        // Allow letters, hyphens, apostrophes, and spaces
        const sanitizedInput = input.replace(/[^a-zA-Z\s'-]/g, '');
        // Capitalize the first letter of each word
        const capitalizedInput = sanitizedInput.replace(/\b\w/g, (char) => char.toUpperCase());
        setName(capitalizedInput);
        onNameChange(field, capitalizedInput);
    };

    const handleFirstNameChange = handleNameChange(setFirstName, 'firstName');
    const handleLastNameChange = handleNameChange(setLastName, 'lastName');

    return (
        <div>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={handleFirstNameChange} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={handleLastNameChange} />
            </label>
            <br />
        </div>
    );
};

export default DataValid;
