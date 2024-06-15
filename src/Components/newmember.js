import React, { useState } from 'react';
import Location from './location';
import DataValid from './datavalid';

const NewMember = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const handleNameChange = (field, value) => {
        if (field === 'firstName') {
            setFirstName(value);
        } else if (field === 'lastName') {
            setLastName(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName.length === 0 || lastName.length === 0) {
            alert('Please enter both first name and last name.');
            return;
        }

        let existingMembers = [];

        // Retrieve existing members from local storage
        const membersFromStorage = localStorage.getItem('members');
        if (membersFromStorage) {
            try {
                existingMembers = JSON.parse(membersFromStorage);
                if (!Array.isArray(existingMembers)) {
                    throw new Error('Invalid members data');
                }
            } catch (error) {
                console.error('Error parsing JSON from local storage:', error);
                existingMembers = [];
            }
        }

        // Create new member object
        const newMember = {
            firstName,
            lastName,
            birthday,
            country,
            city,
        };

        // Save new member to local storage
        existingMembers.push(newMember);
        localStorage.setItem('members', JSON.stringify(existingMembers));
        console.log('Saved members:', JSON.stringify(existingMembers)); // Log the saved data

        // Handle successful submission
        console.log('Form submitted successfully!');
        console.log('Saved data:', newMember);

        // Clear all fields
        setFirstName('');
        setLastName('');
        setBirthday('');
        setCountry('');
        setCity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <DataValid onNameChange={handleNameChange} />
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </label>
            <br />
            <Location onCountryChange={setCountry} onCityChange={setCity} />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewMember;
