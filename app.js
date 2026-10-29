import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

db(); 

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(port, (err) => {
    if(err) {  
        console.error('Error starting server:', err);
        return;
    }
    console.log('Server is running on port ', port);
    }); 