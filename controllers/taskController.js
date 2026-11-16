import Task from "../models/Task.js";
import mongoose from "mongoose";

// Create a new task
const createTask = async (req, res) => {
  console.log("Received request to create task:", req.body);
  try {
    const { title, description, priority, category, dueDate } = req.body;

    // Basic request validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    // Create a new task
    const task = await Task.create({
        userId: req.user.userId,  // req.user is set by authMiddleware 
        title: title.trim(),
        description : description ? description.trim() : null,
        priority: priority ? priority.toUpperCase() : "LOW",
        category: category ? category.trim() : null,
        dueDate: dueDate || null,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  console.log("Received request to get all tasks");
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get all tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  console.log("Received request to get task by ID:", req.params.id);
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Get task by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  console.log("Received request to update task:", req.params.id, req.body);
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Only allow updating these fields
    const allowedFields = [
      "title",
      "description",
      "priority",
      "category",
      "dueDate",
      "isCompleted",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (Object.hasOwn(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    //   task,
    });
  } catch (error) {
    console.error("Update task error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete task by ID
const deleteTask = async (req, res) => {
  console;
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete all tasks
const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All tasks deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete all tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
