// NewMember.js
import React, { useState } from 'react';
import Location from './location';
import DataValid from './datavalid';
import saveMemberToDatabase from './connection';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName.length === 0 || lastName.length === 0) {
            alert('Please enter both first name and last name.');
            return;
        }

        const newMember = {
            firstName,
            lastName,
            birthday,
            country,
            city,
        };

        try {
            await saveMemberToDatabase(newMember);
            console.log('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
        }

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
