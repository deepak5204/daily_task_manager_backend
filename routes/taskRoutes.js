import express from "express";
import {createTask} from "../controllers/taskController.js";


const router = express.Router();

console.log("Task routes initialized");

// Create a new task
router.post("/", createTask);


export default router;