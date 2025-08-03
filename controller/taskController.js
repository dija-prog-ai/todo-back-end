const Task =require("../models/taskModel");const Task = require("../models/taskModel");

async function getTasks(_req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTaskById(req, res) {
  try {
    const id = req.params.id;

    const task = await Task.findOne({ _id: id });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createTask(req, res) {
  try {
    const { title, description, priority, date } = req.body;
    
    const userId = req.user && req.user.id; 

    if (!title || !description || !priority || !date) {
      return res
        .status(400)
        .json({ error: "Title, description, priority, and date are required" });
    }
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newTask = {
      title,
      description,
      priority,
      date,
      userId: userId,
    };
   const createdTask = await Task.create(newTask);
    res.status(201).json(createdTask);
  } catch (error) {
    console.log("Error creating task:", error);
    res
      .status(400)
      .json({ error: "Title, description, priority, and date are required" });
  }
}

async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      await Task.updateOne({ _id: id }, { $set: req.body });
      res.json({
        message: "Task updated successfully",
        task: { ...task, ...req.body },
      });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      await Task.deleteOne({ _id: id });
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };


