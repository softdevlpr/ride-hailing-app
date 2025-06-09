/*1. Import dependencies
2. Load env variables
3. Connect to MongoDB
4. Create Express app
5. Enable JSON parsing
6. Register user routes under /api
7. Start the server
*/


import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';



dotenv.config();
connectDB();    //connecting server to DB

const app = express();

app.use(express.json());        //middleware

app.use('/api',userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
  console.log(`Server running at http://localhost:${PORT}`);
})