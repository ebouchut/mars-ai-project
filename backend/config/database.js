// ~~~~~~~~~~~~~~~~~
//  Database Module
// ~~~~~~~~~~~~~~~~~
import mysql from 'mysql2';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  Test database connection
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const connection = mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test connection
connection.connect(function(error) {
    if (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit application if DB connection fails
    }
    console.log('Connected to marsAI database successfully');
});

export default connection;
