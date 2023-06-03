// taskRoutes.js

const express = require('express');
const router = express.Router();

// Import the taskController
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById
} = require('../controllers/taskController');

// Middleware for JWT authentication
const { authenticateToken } = require('../middlewares/authMiddleware');

// Routes
router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getAllTasks);
router.get('/tasks/:id', authenticateToken, getTaskById);
router.put('/tasks/:id', authenticateToken, updateTaskById);
router.delete('/tasks/:id', authenticateToken, deleteTaskById);

module.exports = router;
