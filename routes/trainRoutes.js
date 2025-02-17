import express from "express";
import { createTrain, getTrains } from "../controllers/trainController.js";
import adminAuth from "../middleware/adminMiddleware.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", adminAuth, createTrain);

router.get("/availability", authenticateUser, getTrains);

export default router;
