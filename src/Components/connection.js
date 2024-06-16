// src/connection.js
const saveMemberToDatabase = async (member) => {
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
      });
  
      if (response.ok) {
        console.log("Member saved to database:", member);
      } else {
        console.error("Error saving member to database");
      }
    } catch (error) {
      console.error("Error saving member to database:", error);
    }
  };
  
  export default saveMemberToDatabase;
  