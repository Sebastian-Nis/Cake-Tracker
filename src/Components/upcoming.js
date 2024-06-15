import React, { useState, useEffect } from 'react';

const Upcoming = () => {
    const [birthdays, setBirthdays] = useState([]);

    useEffect(() => {
        // Retrieve members data from local storage
        const membersFromStorage = localStorage.getItem('members');
        if (membersFromStorage) {
            try {
                const parsedMembers = JSON.parse(membersFromStorage);
                if (Array.isArray(parsedMembers)) {
                    setBirthdays(parsedMembers);
                } else {
                    console.error('Invalid members data');
                }
            } catch (error) {
                console.error('Error parsing JSON from local storage:', error);
            }
        }
    }, []);

    const today = new Date();

    const upcoming = birthdays
        .filter(member => new Date(member.birthday) >= today)
        .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
        .slice(0, 5);

    const calculateDaysFromNow = (date) => {
        const birthdayDate = new Date(date);
        const timeDiff = birthdayDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff;
    };

    return (
        <div>
            <h2>Upcoming Birthdays</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Days</th>
                    </tr>
                </thead>
                <tbody>
                    {upcoming.map(birthday => (
                        <tr key={birthday.firstName + birthday.lastName}>
                            <td>{birthday.firstName} {birthday.lastName}</td>
                            <td>{birthday.birthday}</td>
                            <td>{calculateDaysFromNow(birthday.birthday)} days</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Upcoming;
