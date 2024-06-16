const { createPool } = require('@vercel/postgres');
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, birthday, country, city } = req.body;

    try {
      const client = await pool.connect();
      await client.sql`
        INSERT INTO members (first_name, last_name, birthday, country, city)
        VALUES (${firstName}, ${lastName}, ${birthday}, ${country}, ${city})
      `;
      client.release();

      res.status(200).send('Member saved to database');
    } catch (error) {
      console.error('Error saving member to database:', error.stack);
      res.status(500).send(`Error saving member to database: ${error.message}`);
    }
  } else if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.sql`SELECT * FROM members`;
      client.release();

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching members:', error.stack);
      res.status(500).send(`Error fetching members: ${error.message}`);
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
