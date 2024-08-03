const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false // Use this setting if you encounter self-signed certificate errors
  }
};

const pool = new Pool(config)

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to database');
    client.release();

  } catch (err) {
    console.error("Error connecting to database: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
