import { createPool } from "mysql2/promise";
import dotenv = require('dotenv');

dotenv.config();

const connector = createPool({
  host: process.env.db_mysql_host,
  user: process.env.db_mysql_user,
  password: process.env.db_mysql_password,
  database: process.env.db_mysql_database,
  decimalNumbers: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connector.once('connection', () => console.log('Database connected'));

export default connector;