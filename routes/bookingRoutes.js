import express from "express";
import { bookTrainSeat } from "../controllers/bookingController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", authenticateUser, bookTrainSeat);

export default router;
