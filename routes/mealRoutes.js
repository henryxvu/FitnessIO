import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get("/meal", async (req, res) => {
    console.log("get meal");
    const username = req.query.username;
    const date = req.query.date;

    try {
        const db = mongoose.connection.db;
        const collection = db.collection("meals");
        const meals = await collection.find({ username, date }).toArray();
        res.json(meals);
        console.log('refreshed', date);
}   catch (err) {
        console.error(err);
        res.status(500).json({ error: "MongoDB query failed" });
    }
});

router.post("/meal", async (req, res) => {
    const data = req.body;

    try {
        const db = mongoose.connection.db;
        const collection = db.collection("meals");
        const result = await collection.insertOne(data);
        res.status(201).json({ message: "Meal logged successfully", insertedId: result.insertedId });
        console.log('meal logged')
    } catch (err){
        console.log(err);
        res.status(500).json({ error: "MongoDB query failed" });
    }
});


/*
router.post("/scan", async (req, res) => {
    try{
        console.log(`https://api.spoonacular.com/food/images/analyze?imageUrl=${req.body.imageURL}&apiKey=${process.env.SPOONACULAR_API_KEY}`)
        const spoonacularResponse = await fetch(`https://api.spoonacular.com/food/images/analyze?imageUrl=${req.body.imageURL}&apiKey=${process.env.SPOONACULAR_API_KEY}`,{
        method: 'GET'
    });

    if (!spoonacularResponse.ok){
        const errorText = await spoonacularResponse.text(); 
        console.error("Spoonacular error response:", errorText);
        throw new Error(`Spoonacular API error: ${spoonacularResponse.statusText}`);
    }
    const data = await spoonacularResponse.json();
    res.json(data);
  

       
    } catch (error) {
        console.error("Error during food scan:", error);
    }

});
*/

export default router;