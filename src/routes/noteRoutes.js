import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

import {
  createNote,
  getNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/', authMiddleware, getNote);       
router.post('/', authMiddleware, createNote);    
router.put('/:id', authMiddleware, updateNote);  
router.delete('/:id', authMiddleware, deleteNote); 

export default router;
