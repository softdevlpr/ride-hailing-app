//defining API endpoint
//setting up POST route at /api/register

import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js';
import { createOrder } from '../controllers/orderController.js';
import { listCabs } from '../controllers/cabController.js';


const router = express.Router();

router.post('/register',registerUser); // /api/register
router.post('/login',loginUser); // /api/login
router.post('/order',createOrder); // /api/order
router.get('/cabs',listCabs);

export default router;