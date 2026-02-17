import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // Thay đổi theo địa chỉ frontend của bạn
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/tasks', tasksRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


