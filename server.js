import express from 'express';
import cors from 'cors';

// const express = require("express");
const app = express();
const PORT = 3001;

const mongodbURL = 'mongodb://127.0.0.1:27017';




app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());

app.post('/api/meal', (req, res) => {
    const data = req.body;

    const date = data.date_;
    const mealName = data.meal;
    const calorieCount = data.calorie;
    const proteinCount = data.protein;
    const carbCount = data.carb;
    const fatCount = data.fat;

    
   
    
   
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });