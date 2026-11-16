import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {

    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true
},
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    description: {
      type: String,
      default: null,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "LOW",
    },

    category: {
      type: String,
      default: null,
      trim: true,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
