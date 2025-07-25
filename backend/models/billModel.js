import pool from './db.js';

export const getBillsByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM bills WHERE user_id = $1', [userId]);
  return result.rows;
};

export const createBill = async (userId, amount, month) => {
  const result = await pool.query(
    'INSERT INTO bills (user_id, amount, month) VALUES ($1, $2, $3) RETURNING *',
    [userId, amount, month]
  );
  return result.rows[0];
};
