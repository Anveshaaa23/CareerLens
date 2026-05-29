const fs = require('fs');
const path = require('path');
const pool = require('./index');

const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

pool.query(sql)
  .then(() => {
    console.log('✅ All tables created successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error creating tables:', err.message);
    process.exit(1);
  });