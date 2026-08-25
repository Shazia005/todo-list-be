import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';

const router = express.Router();

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;

