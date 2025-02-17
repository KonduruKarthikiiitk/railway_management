import pool from "../config/db.js";

const createUser = async (username, passwordHash, role) => {
  const result = await pool.query(
    "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
    [username, passwordHash, role]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

export { createUser, findUserByUsername };
