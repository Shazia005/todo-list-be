import Todo from "../models/Todo.js";

// 1. GET ALL TODOS
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. CREATE A NEW TODO
export const createTodo = async (req, res) => {
  try {
    const { text, title } = req.body;

    const newTodo = await Todo.create({
      title: title || text, // Fallback if front-end sends text
      text,
      user: req.user.userId,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 3. UPDATE A TODO
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, user: req.user.userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 4. DELETE A TODO
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};