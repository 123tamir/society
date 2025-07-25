import express from 'express';
import { loginUser, registerUser, getUserBills } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/bills', protect, getUserBills);

export default router;
