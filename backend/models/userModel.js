import pool from './db.js';

export const createUser = async (name, email, password, flat_no) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, flat_no) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, flat_no]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
