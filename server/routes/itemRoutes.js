import express from 'express';
import { createItem, getAllItems } from '../controllers/itemController.js';

const router = express.Router();

// Routes
router.post('/items', createItem);
router.get('/items', getAllItems);

export default router;
