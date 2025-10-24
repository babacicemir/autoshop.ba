const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const createDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    client.release();
  } catch (err) {
    console.log('Error connecting to the database', err.stack);
  }
};

const createTestDatabase = async () => {
  const adminPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Default admin baza
    port: process.env.DB_PORT
  });

  try {
    const client = await adminPool.connect();
    const testDbName = process.env.TEST_DB_NAME || 'test_db';

    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`, 
      [testDbName]
    );

    if (dbExists.rowCount === 0) {
      // Kreiraj test bazu ako ne postoji
      await client.query(`CREATE DATABASE ${testDbName}`);
      console.log(`Test database "${testDbName}" created.`);
    } else {
      console.log(`Test database "${testDbName}" already exists.`);
    }

    client.release();
  } catch (err) {
    console.error('Error creating test database:', err.stack);
  } finally {
    adminPool.end();
  }
};

// Testni pool za povezivanje na test bazu
const testPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.TEST_DB_NAME || 'test_db',
  port: process.env.DB_PORT
});

module.exports = {
  pool,
  createDatabaseConnection,
  createTestDatabase,
  testPool
};
