import express from 'express';

import { createTask, deleteTask, getAllTasks, updateTask } from '../controller/tasksControlller.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/data',createTask);
router.put('/data/:id',updateTask);
router.delete('/data/:id',deleteTask);

export default router;