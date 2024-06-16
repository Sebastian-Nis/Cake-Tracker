const { createPool } = require('@vercel/postgres');
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

module.exports = async (req, res) => {
  console.log('Request method:', req.method);
  if (req.method === 'POST') {
    const { firstName, lastName, birthday, country, city } = req.body;
    console.log('Request body:', req.body);

    try {
      const client = await pool.connect();
      console.log('Connected to the database');

      console.log('Inserting member:', { firstName, lastName, birthday, country, city });

      await client.sql`
        INSERT INTO members (first_name, last_name, birthday, country, city)
        VALUES (${firstName}, ${lastName}, ${birthday}, ${country}, ${city})
      `;
      client.release();
      console.log('Member inserted successfully');

      res.status(200).send('Member saved to database');
    } catch (error) {
      console.error('Error saving member to database:', error.stack);
      res.status(500).send(`Error saving member to database: ${error.message}`);
    }
  } else if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      console.log('Connected to the database');

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
