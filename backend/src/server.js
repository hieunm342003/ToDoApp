import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const app = express();
if (process.env.NODE_ENV !== 'production') {

    const corsOptions = {
        origin: 'http://localhost:5173', // Thay đổi theo địa chỉ frontend của bạn
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
}
app.use(express.json());
app.use('/api/tasks', tasksRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(projectRoot, 'frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(projectRoot, 'frontend', 'dist', 'index.html'));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


