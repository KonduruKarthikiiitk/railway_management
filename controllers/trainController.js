import { addTrain, getTrainsByRoute } from "../models/trainModel.js";
import pool from "../config/db.js";


const createTrain = async (req, res) => {
  const { train_name, source, destination, total_seats, available_seats } = req.body;

  if (!train_name || !source || !destination || !total_seats ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newTrain = await addTrain(train_name, source, destination, total_seats, available_seats);
    res.status(201).json(newTrain);
  } catch (error) {
    console.error("Error adding train:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });  }
}; 



const getTrains = async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await getTrainsByRoute(source, destination);

        if (trains.length === 0) {
            return res.status(404).json({ error: "No trains found for the given route" });
        }

        res.status(200).json(trains);
    } catch (error) {
        console.error("Error fetching trains:", error);
        res.status(500).json({ error: "Failed to fetch train availability" });
    }
};



export { createTrain, getTrains };
