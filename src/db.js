const { Pool } = require('pg');

let pool;

const getPool = () => {
  if (!pool) {
    console.log('Creating database connection pool...');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false // Required for some cloud providers, adjust as needed
      }
    });
  }
  return pool;
};

module.exports = {
  query: (text, params) => getPool().query(text, params),
};
