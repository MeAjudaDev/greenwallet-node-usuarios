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

exports.findUserByEmail = async (email) => {
  const conn = await connect();
  const sql = 'SELECT name, email, activation_code, state FROM users WHERE email = ?';
  const values = [email];

  return await conn.query(sql, values);
}

exports.updateStateColumn = async (email, state) => {
  const conn = await connect();
  const sql = "UPDATE users SET state = ? WHERE email= ?";
  const values = [
    state,
    email
  ];

  return await conn.query(sql, values);
}

exports.findUserForLogin = async (email) => {
  const conn = await connect();
  const sql = 'SELECT * FROM users WHERE email = ?'
  const values = [email];

  return await conn.query(sql, values);
}