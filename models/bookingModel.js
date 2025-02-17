import pool from "../config/db.js";

export const bookSeat = async (trainId, userId, seatsToBook) => {
  try {

    const trainResult = await pool.query(
      'SELECT * FROM trains WHERE id = $1', [trainId]
    );

    if (trainResult.rows.length === 0) {
      throw new Error("Train not found");
    }

    const train = trainResult.rows[0];
    const { source, destination, available_seats } = train;

    if (seatsToBook > available_seats) {
      throw new Error("Not enough seats available");
    }

    const bookedSeats = Array.from({ length: seatsToBook }, (_, index) => index + 1);

    const bookingResult = await pool.query(
      'INSERT INTO bookings (train_id, user_id, source, destination, seat_numbers, status, booked_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *',
      [trainId, userId, source, destination, bookedSeats, 'booked']
    );

    const updatedSeats = available_seats - seatsToBook;

    await pool.query(
      'UPDATE trains SET available_seats = $1 WHERE id = $2',
      [updatedSeats, trainId]
    );
    return bookingResult.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
