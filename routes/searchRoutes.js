import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/search', async (req, res) => {
    try{
        const foodDbResponse = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.FOOD_DATA_API_KEY}&query=${req.body.food}`,{
            method: 'GET'
        });
        if (!foodDbResponse.ok) {
            const text = await foodDbResponse.text();
            throw new Error(`USDA API error: ${text}`);
          }
          const macros = {
            calories: null,
            protein: null,
            fat: null,
            carbs: null
          };
          const data = await foodDbResponse.json();
          for (const nutrient of data.foods[0].foodNutrients){
            if (nutrient.nutrientNumber === '203'){ // protein
                macros.protein = nutrient.value;
            } else if (nutrient.nutrientNumber === '204'){ // Total lipid (fat)
                macros.fat = nutrient.value;
            } else if (nutrient.nutrientNumber === '205'){ // carbs
                macros.carbs = nutrient.value;
            } else if (nutrient.nutrientNumber === '208'){ //energy
                macros.calories = nutrient.value;
            }
          }

          res.json(macros);
    }
    catch (error) {

    }
});


export default router;