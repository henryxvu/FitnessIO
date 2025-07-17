import { useState } from 'react';
import "./ManualEntryForm.css"


function ManualEntryForm({onBack, onClose, refreshData, date, username}){
    const [mealName, setMealName] = useState('');
    const [calorieCount, setCalorieCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [fatCount, setFatCount] = useState(0);


    async function submitEntry(){
        try {
            console.log("button clicked");
            const response = await fetch(`${import.meta.env.VITE_API_URL}meal`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, date: date, meal: mealName, calorie: calorieCount, protein: proteinCount, carb: carbCount, fat: fatCount, imageURL: null})
            })
            
            const result = await response.json();
            if (!response.ok)
                throw new Error();
            
            console.log("Meal Logged")
            refreshData();
        }
        catch (err){
            console.error("Error while logging meal: ", err.message);
        }
    }

    return(
        <div className="backdrop">
            
            <div className="content">
                <div className="cancel-button-container">
                    <button className="back-button" onClick={onBack}>←</button>
                    <button className="button-close" onClick={onClose}>
                        <span class="X"></span>
                        <span class="Y"></span>
                        <div class="close">Close</div>
                    </button>
                </div>
                
                <h2 style={{marginTop: ".6rem"}}>Add Meal</h2>




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

                    <button className="submit-button" onClick={(e) => { e.preventDefault(); submitEntry(); onClose()}}>Submit</button>
                </form>
            </div>

        </div>
       
    );
}

export default ManualEntryForm;