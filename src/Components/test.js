import React, { useState, useEffect } from 'react';

const TestLocalStorage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Clear local storage manually for debugging
        localStorage.removeItem('members');
        console.log('Local storage cleared');
    }, []);

    const handleAddMember = () => {
        let existingMembers = [];
        const membersFromStorage = localStorage.getItem('members');
        console.log('membersFromStorage:', membersFromStorage); // Log the raw data

        if (membersFromStorage) {
            try {
                existingMembers = JSON.parse(membersFromStorage);
                if (!Array.isArray(existingMembers)) {
                    throw new Error('Invalid members data');
                }
            } catch (error) {
                console.error('Error parsing JSON from local storage:', error);
                // If there's an error parsing, reset local storage
                localStorage.removeItem('members');
                existingMembers = [];
            }
        }

        const newMember = {
            firstName: 'John',
            lastName: 'Doe',
            birthday: '1990-01-01',
            country: 'USA',
            city: 'New York',
        };

        existingMembers.push(newMember);
        localStorage.setItem('members', JSON.stringify(existingMembers));
        console.log('Saved members:', JSON.stringify(existingMembers)); // Log the saved data
        setMembers(existingMembers);
    };

    return (
        <div>
            <button onClick={handleAddMember}>Add Member</button>
            <div>
                <h3>Members:</h3>
                <pre>{JSON.stringify(members, null, 2)}</pre>
            </div>
        </div>
    );
};

export default TestLocalStorage;
