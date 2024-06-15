// src/Components/connection.js
import { sql, config } from "@vercel/postgres";

// Load the connection string from the environment variable
config({
    connectionString: process.env.REACT_APP_POSTGRES_URL,
});

const saveMemberToDatabase = async (member) => {
    try {
        const { firstName, lastName, birthday, country, city } = member;
        await sql`
            INSERT INTO members (first_name, last_name, birthday, country, city)
            VALUES (${firstName}, ${lastName}, ${birthday}, ${country}, ${city})
        `;
        console.log("Member saved to database:", member);
    } catch (error) {
        console.error("Error saving member to database:", error);
    }
};

export default saveMemberToDatabase;
