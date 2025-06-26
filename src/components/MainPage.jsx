import { useState } from "react";
import Navbar from "./Navbar.jsx";
import './MainPage.css';

function MainPage(){
    
    const [username, setUsername] = useState(() => {
        return localStorage.getItem("username") || "";
      });
    
    return(
        <>
            
            <Navbar username={username}/>

            <div className="dashboard">

                <div className="calorie-card">
                    <p>Calories consumed</p>
                    <h2>1739</h2>
                </div>

                <div className="macro-cards">

                    <div className="protein-card">
                        <p>Protein consumed</p>
                        <h2>1739</h2>
                    </div>

                    <div className="carbs-card">
                        <p>Carbs consumed</p>
                        <h2>1739</h2>
                    </div>

                    <div className="fats-card">
                        <p>Fats consumed</p>
                        <h2>41g</h2>
                    </div>
                </div>

                <div className="extra-row">
                    <div className="ai-photo-card">
                        <button>
                            <img src='./src/assets/temp.jpg'></img>
                            <p>Try our new AI Photo feature</p>
                        </button>
                    </div>

                    <div className="weight-card">
                        <p>Current weight</p>
                        <h2>155 lb</h2>
                    </div>
                </div>

                
                
            </div>
        
        </>

    );

}

export default MainPage;