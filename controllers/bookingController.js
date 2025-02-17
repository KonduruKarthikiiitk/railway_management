import { bookSeat } from "../models/bookingModel.js";

const bookTrainSeat = async (req, res) => {
  try {
    const { trainId, seatsToBook } = req.body;
    const userId = req.user.id;
    
    if (!trainId || !seatsToBook) {
      return res.status(400).json({ error: "Train ID and Seats to book are required" });
    }

    const booking = await bookSeat(trainId, userId, seatsToBook);

    res.status(200).json({ message: "Seats booked successfully", booking });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ error: "Failed to book seat" });
  }
};

export { bookTrainSeat };
