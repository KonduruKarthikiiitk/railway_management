import pool from "../config/db.js";

const addTrain = async (
  train_name,
  source,
  destination,
  total_seats,
  available_seats
) => {
  try {
    const result = await pool.query(
      "INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [train_name, source, destination, total_seats, available_seats]
    );
    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Train with this name already exists");
    } else if (error.code === "23502") {
      throw new Error("Missing required fields");
    } else if (error.code === "22P02") {
      throw new Error("Invalid data type");
    }
    throw error;
  }
};

const getTrainsByRoute = async (source, destination) => {
  try {
    let query = "SELECT * FROM trains";
    let values = [];

    if (source && destination) {
        query += " WHERE source ILIKE  $1 AND destination ILIKE  $2";
        values = [source, destination];
    }

    const result = await pool.query(query, values);
    return result.rows;
} catch (error) {
    console.error("Database Error (getTrainsByRoute):", error);
    throw new Error("Database query failed");
}
};

export { addTrain, getTrainsByRoute };
