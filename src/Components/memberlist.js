import React, { useEffect, useState } from 'react';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        console.log('Members fetched:', data);
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = members.filter(member => {
      return Object.keys(member).some(key =>
        typeof member[key] === 'string' && member[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredMembers(filteredData);
  }, [searchQuery, members]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedMembers = [...filteredMembers].sort((a, b) => {
      if (key === 'birthday') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'ascending' ? dateA - dateB : dateB - dateA;
      } else {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      }
    });

    setFilteredMembers(sortedMembers);
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1>Member List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>
              First Name
              <button onClick={() => handleSort('firstName')}>Sort</button>
            </th>
            <th>
              Last Name
              <button onClick={() => handleSort('lastName')}>Sort</button>
            </th>
            <th>
              Birthday
              <button onClick={() => handleSort('birthday')}>Sort</button>
            </th>
            <th>
              Country
              <button onClick={() => handleSort('country')}>Sort</button>
            </th>
            <th>
              City
              <button onClick={() => handleSort('city')}>Sort</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.birthday}</td>
              <td>{member.country}</td>
              <td>{member.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
