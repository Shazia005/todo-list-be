import Todo from "../models/todo.js";

// 1. GET ALL TODOS
// route: GET /api/todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos", details: error.message });
  }
};

// 2. CREATE A NEW TODO
// route: POST /api/todos
export const createTodo = async (req, res) => {
  try {
    const { text, title } = req.body;
    const taskText = text || title;

    if (!taskText || !taskText.trim()) {
      return res.status(400).json({ error: "Task text is required" });
    }

    const newTodo = await Todo.create({
      title: taskText.trim(),
      completed: false,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo", details: error.message });
  }
};

// 3. UPDATE A TODO (Text or Completion Status)
// route: PUT /api/todos/:id
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, title, completed } = req.body;

    const updates = {};
    if (text !== undefined) updates.title = text.trim();
    if (title !== undefined) updates.title = title.trim();
    if (completed !== undefined) updates.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo", details: error.message });
  }
};

// 4. DELETE A TODO
// route: DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo", details: error.message });
  }
};