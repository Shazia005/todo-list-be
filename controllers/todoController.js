//In-memory Data store
let todos = [
  { id: 1, text: 'Learn Express.js', completed: false },
  { id: 2, text: 'Connect React to Node API', completed: false }
];

//  Get all todos
// route:   GET /api/todos
const getTodos = (req, res) => {
  res.json(todos);
};

// Create a new todo
// route:   POST /api/todos
const createTodo = (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Task text is required' });
  }

  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// 3. UPDATE A TODO (Text or Completion Status)
const updateTodo = (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (text !== undefined) todo.text = text.trim();
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
};

// 4. DELETE A TODO
const deleteTodo = (req, res) => {
  const { id } = req.params;
  
  const todoExists = todos.some((t) => t.id === Number(id));
  if (!todoExists) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos = todos.filter((t) => t.id !== Number(id));
  res.json({ message: 'Todo deleted successfully' });
};
 
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};