// src/Components/database.js
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.REACT_APP_POSTGRES_URL,
});

export default pool;
