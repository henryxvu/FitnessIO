import { useState } from 'react';
import "./ManualEntryForm.css"


function ManualEntryForm({onClose, refreshData, date}){
    const [mealName, setMealName] = useState('');
    const [calorieCount, setCalorieCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [fatCount, setFatCount] = useState(0);


    async function submitEntry(){
        try {
            console.log("button clicked");
            const response = await fetch('http://localhost:3001/api/meal', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({meal: mealName, calorie: calorieCount, protein: proteinCount, carb: carbCount, fat: fatCount, date_: date})
            });

            const result = await response.json();
            if (!response.ok)
                throw new Error();

            console.log("Meal Logged")
        }
        catch (err){
            console.error("Error while logging meal: ", err.message);
        }
    }

    return(
        <div className="backdrop">
            
            <div className="content">
                <div className="cancel-button-container">
                    <button className="cancel-button" onClick={onClose}>←</button>
                </div>
                
                <h2 style={{marginTop: "0"}}>Add Meal</h2>




                <form className="entry-form">
                    <label>
                        <p className="label-text">Meal Name</p>
                        <input type="text" placeholder='Required'
                         onChange={(e) => setMealName(e.target.value)}></input>
                    </label>

                    <label>
                        <p className="label-text">Calories</p>
                        <input type="number" onChange={(e) => setCalorieCount(e.target.value)}></input>
                    </label>
                    
                    <label>
                        <p className="label-text">Protein (g)</p>
                        <input type="number" onChange={(e) => setProteinCount(e.target.value)}></input>
                    </label>

                    <label>
                        <p className="label-text">Carbs (g)</p>
                        <input type="number" onChange={(e) => setCarbCount(e.target.value)}></input>
                    </label>

                    <label>
                        <p className="label-text">Fats (g)</p>
                        <input type="number" onChange={(e) => setFatCount(e.target.value)}></input>
                    </label>

                    <button className="submit-button" onClick={(e) => { e.preventDefault(); submitEntry()}}>Submit</button>
                </form>
            </div>

        </div>
       
    );
}

export default ManualEntryForm;