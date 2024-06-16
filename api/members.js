import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  console.log('Request method:', req.method);

  if (req.method === 'POST') {
    const { firstName, lastName, birthday, country, city } = req.body;
    console.log('Request body:', req.body);

    try {
      console.log('Connecting to the database...');
      const client = await db.connect();

      console.log('Inserting member:', { firstName, lastName, birthday, country, city });

      await client.sql`
        INSERT INTO members (first_name, last_name, birthday, country, city)
        VALUES (${firstName}, ${lastName}, ${birthday}, ${country}, ${city})
      `;
      client.release();
      console.log('Member inserted successfully');
      res.status(200).send('Member saved to database');
    } catch (error) {
      console.error('Error saving member to database:', error);
      res.status(500).send(`Error saving member to database: ${error.message}`);
    }
  } else if (req.method === 'GET') {
    try {
      console.log('Fetching members...');
      const client = await db.connect();
      const result = await client.sql`SELECT * FROM members`;
      client.release();

      console.log('Fetched members:', result.rows);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).send(`Error fetching members: ${error.message}`);
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
