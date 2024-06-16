const { createPool } = require('@vercel/postgres');
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

module.exports = async (req, res) => {
  try {
    const client = await pool.connect();
    await client.sql`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        birthday DATE,
        country VARCHAR(255),
        city VARCHAR(255)
      );
    `;
    client.release();
    res.status(200).send('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error.stack);
    res.status(500).send(`Error creating table: ${error.message}`);
  }
};
