const connect = require('../database');

exports.create = async ({ name, email, password, activation_code }) => {
    const conn = await connect();
    const sql = 'INSERT INTO users(name, email, password, activation_code) VALUES (?, ?, ?, ?)';
    const values = [
        name, 
        email, 
        password, 
        activation_code
    ];

    return await conn.query(sql, values);
}