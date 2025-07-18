import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mealRoutes from './routes/mealRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import authRoutes from './routes/authRoutes.js';
import scanRoutes from './routes/scanRoutes.js'
import searchRoutes from './routes/searchRoutes.js';
import dotenv from 'dotenv';

dotenv.config();




const app = express();
const PORT = process.env.PORT;


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('✅ Connected to MongoDB');
  }).catch(err => {
    console.error('❌ MongoDB connection  error:', err);
  });

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', mealRoutes);
app.use('/api', uploadRoutes);
app.use('/api', scanRoutes);
app.use('/api', searchRoutes);





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });