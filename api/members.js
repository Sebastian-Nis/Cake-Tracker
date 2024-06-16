const { db } = require('@vercel/postgres');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, birthday, country, city } = req.body;

    try {
      const client = await db.connect();
      await client.sql`
        INSERT INTO members (first_name, last_name, birthday, country, city)
        VALUES (${firstName}, ${lastName}, ${birthday}, ${country}, ${city})
      `;
      client.release();
      res.status(200).json({ message: 'Member saved to database' });
    } catch (error) {
      console.error('Error saving member to database:', error);
      res.status(500).json({ error: `Error saving member to database: ${error.message}` });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await db.connect();
      const result = await client.sql`SELECT * FROM members`;
      client.release();
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).json({ error: `Error fetching members: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
