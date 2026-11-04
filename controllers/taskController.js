
import Task from "../models/Task.js";

// Create a new task
const createTask = async (req, res) => {
    console.log("Received request to create task:", req.body);
  try {
    const {
      title,
      description,
      priority,
      category,
      dueDate
    } = req.body;

    // Basic request validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required"
      });
    }

    // Create a new task
    const task = await Task.create({
      title,
      description,
      priority,
      category,
      dueDate
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });

  } catch (error) {
    console.error("Create task error:", error);

    if (error.name === "ValidationError" ||
        error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export { createTask };
