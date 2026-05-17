const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 👇 SELIPKAN KODE INI DI BAWAH QUEUELIMIT (JANGAN LUPA KOMA SEBELUMNYA)
  ssl: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  
  }
});