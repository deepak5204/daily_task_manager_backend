import express from "express";
import {
  createTask,
  getAllTasks,
  deleteAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

console.log("Task routes initialized");

// Create a new task
router.post("/", createTask);

// Get all tasks
router.get("/", getAllTasks);

// Delete all tasks
router.delete("/", deleteAllTasks);

// Get task by ID
router.get("/:id", getTaskById);

// Update task
router.put("/:id", updateTask);
router.patch("/:id", updateTask);

// Delete task by ID
router.delete("/:id", deleteTask);

export default router;
