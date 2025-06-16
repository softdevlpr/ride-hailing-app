//defining API endpoint
//setting up POST route at /api/register

import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js';
import { createOrder, trackOrder } from '../controllers/orderController.js';
import { createCab, searchCabs } from '../controllers/cabController.js';


const router = express.Router();

router.post('/register',registerUser); // /api/register
router.post('/login',loginUser); // /api/login
router.post('/order',createOrder); // /api/order
router.get('/cabs',searchCabs);
router.post('/cabs',createCab);
router.get("/order/:orderId", trackOrder);
export default router;