import "./OnboardPage.css";
import { useState } from "react";

function OnboardPage({viewChanger, setUserId}){
    
    const [view, viewSetter] = useState("mainScreen");
    const [goal, goalSetter] = useState("");
    const [totalCalories, caloreSetter] = useState(0);
    const [feet, feetSetter] = useState(0);
    const [inch, inchSetter] = useState(0);
    const [weight, weightSetter] = useState(0);
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    async function createAccount(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}signup`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username, password, totalCalories})
        });

        const data = await response.json();
        console.log("Signup response:", data);
        if (data.message === "Success"){
            setUserId({id: data.userId, username: username, totalCalories: totalCalories});
            viewChanger("mainpage");

        }
        else if (data.message === "existing username")
                setError("Username already exists");
    }


    function accountCreation(){
        return(
            <div className="create-account-container">
                <h1>Create an account to start tracking!</h1>
                <p>Your daily calorie intake: <strong>{totalCalories}</strong></p>
                <form>
                    <div>
                    <label>Username</label>
                    <input className="input-text" onChange={(e) => setUsername(e.target.value)}/>
                    <label>Password</label>
                    <input className="input-text" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="btn-start" onClick={(e) => {e.preventDefault(); createAccount()}}>Sign Up</button>
                    {error && <div className="error-message">{error}</div>}                
                </form>
            </div>
        );
    }

    function calculate_totals(){
        if (!gender || !feet || !inch || !weight || !goal) {
            setError("Please fill out all fields.");
            return;
        }
        setError("");
    
        const totalInches = parseInt(feet) * 12 + parseInt(inch);
    const heightCm = totalInches * 2.54;
    const weightKg = parseFloat(weight) * 0.453592;
    const age = 25;

    let BMR;

    if (gender === "male") {
        BMR = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else if (gender === "female") {
        BMR = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    } else {
        console.warn("Gender not selected. Defaulting to female BMR calculation.");
        BMR = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const TDEE = BMR * 1.375;

    let targetCalories;
    if (goal === "LoseWeight") {
        targetCalories = TDEE - 500;
    } else if (goal === "maintainWeight") {
        targetCalories = TDEE;
    } else if (goal === "GainMuscle") {
        targetCalories = TDEE + 300;
    } else {
        targetCalories = TDEE; 
    }

    caloreSetter(Math.round(targetCalories));
    console.log("Suggested daily calories:", Math.round(targetCalories));
    viewSetter("accountCreation")
    return Math.round(targetCalories);
    }


    function healthGoals(){
        return(
        <div className="health-goals-container">
            <h1>What are your health goals?</h1>
            <button className="btn-health-goals" onClick={() => {goalSetter("LoseWeight"); viewSetter("bodyMeasurements")}}>Lose weight</button>
            <button className="btn-health-goals" onClick={() => {goalSetter("maintainWeight"); viewSetter("bodyMeasurements")}}>Mantain Weight</button>
            <button className="btn-health-goals" onClick={() => {goalSetter("GainMuscle"); viewSetter("bodyMeasurements")}}>Gain Muscle</button>
        </div>
        )
    }

    function bodyMeasurements(){
        return(
        <div className="body-measurements-container">
            <h1>Body Measurements</h1>


            <form>
                <label>Gender</label>
                    <div className="gender-bubbles">
                        <button
                            type="button"
                            className={`gender-bubble ${gender === "male" ? "selected" : ""}`}
                            onClick={() => setGender("male")}>Male</button>
                         <button
                            type="button"
                            className={`gender-bubble ${gender === "female" ? "selected" : ""}`}
                            onClick={() => setGender("female")}>Female</button>
                    </div>
                    <label>Height</label>
                    <input className="input-text" placeholder="Feet (ft)" onChange={(e) => feetSetter(e.target.value)}/>
                    <input className="input-text" placeholder="Inches (in)" onChange={(e) => inchSetter(e.target.value)}/>

                    <label>Weight</label>
                    <input className="input-text" placeholder="Pounds (lb)" onChange={(e) => weightSetter(e.target.value)}/>
                    <button className="btn-start" style={{width: "100%"}} onClick={(e) => {e.preventDefault(); calculate_totals()}}>Done</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
        </div>
        )
    }



    function mainScreen(){
        return(
            <div className="onboard-content">
            <img className="sandwich-img" src="src/assets/sandwich.jpg"></img>
            <div className="title"><h1>Calorie tracking made easy</h1></div>
            <p style={{fontSize: "2vh", fontWeight: "500", color: "rgb(125,125,125)"}}>Scan your food. Get your custom plan.</p>
            
            <div className="onboard-btn-container">
                <button className="btn-start" onClick={() => {viewSetter("healthGoals")}}>Get Started</button>
                <button className="btn-login" onClick={() => {viewChanger("login")}}>Log in</button>
            </div>
        </div>
        )
    }

    return(
        <div className="onboard-bg">
           {view === "mainScreen" && mainScreen()}
           {view === "healthGoals" && healthGoals()}
            {view === "bodyMeasurements" && bodyMeasurements()}
            {view === "accountCreation" && accountCreation()}
        </div>
        
        
    );
    
}
export default OnboardPage;