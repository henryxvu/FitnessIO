import { useState } from 'react';
import "./ManualEntryForm.css"


function ManualEntryForm({onClose, refreshData, date}){
    const [mealName, setMealName] = useState('');
    const [calorieCount, setCalorieCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [fatCount, setFatCount] = useState(0);




    return(
        <div className="backdrop">
            
            <div className="content">
                <h2>Add Meal {mealName}</h2>
                <form className="entry-form">
                    <label>
                        <p className="label-text">Meal Name</p>
                        <input type="text" placeholder='Required'
                         onChange={(e) => setMealName(e.target.value)}></input>
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

                    <button className="submit-button" onClick={() => {}}>Submit</button>
                </form>
            </div>

        </div>
       
    );
}

export default ManualEntryForm;