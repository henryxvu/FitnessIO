import { useState } from "react";
import Navbar from "./Navbar.jsx";
import CircularTracker from "./CircularTracker.jsx";
import LogCard from "./LogCard.jsx"
import MealMethodModal from './MealMethodModal';
import './MainPage.css';
import ManualEntryForm from "./ManualEntryForm.jsx";

function MainPage(){
    
    const [username, setUsername] = useState(() => {
        return localStorage.getItem("username") || "";
      });
      
    /* Macros */
    const [calorieCount, setCalorieCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [carbCount, setCarbCount] = useState(0);
    const [fatCount, setFatCount] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [showAiEntry, setShowAiEntry] = useState(false);

    const [date, setDate] = useState("1/12/2005");
    
    function refreshData(){
        console.log("refreshing data..")
    }

   
    return(
        <> 
            <Navbar username={username}/>

            <div className="dashboard">
            <div className="header">
                <p>Hello, {username}</p>
            </div>
    
                <div className="calorie-card">
                    <div className="card-left">
                        <div className="calorie-value">1739</div>
                        <div className="macro-label">Calories consumed</div>
                    </div>

                    <div className="card-right">
                        <div className="circular-wrapper">
                            <CircularTracker value={75} color="gold"/>
                            <div className="circular-text">
                                <div className="macro-value">2,900</div>
                                <div className="macro-label">remaining</div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="macro-cards">

                    <div className="protein-card">
                        <div className="macro-value">89g</div>
                        <div className="macro-label" style={{padding: '0 0 5px 0'}}>Protein consumed</div>
                        <div className="macro-circle">
                            <div className="circular-wrapper">
                                <CircularTracker value={75} color="orange"/>
                                <div className="circular-text">
                                    <div className="circular-small-value">36g</div>
                                    <div className="circular-small-text">remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carbs-card">
                        <div className="macro-value">1739g </div>
                        <div className="macro-label" style={{padding: '0 0 5px 0'}}>Carbs consumed</div>
                       
                            <div className="macro-circle">
                                <div className="circular-wrapper">
                                    <CircularTracker value={75}/>
                                    <div className="circular-text">
                                        <div className="circular-small-value">65g</div>
                                        <div className="circular-small-text">remaining</div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="fats-card">
                        <div className="macro-value">41g</div>
                        <div className="macro-label" style={{padding: '0 0 5px 0'}}>Fats consumed</div>
                        <div className="macro-circle">
                            <div className="circular-wrapper">
                                <CircularTracker value={75} color="#e594ff"/>
                                <div className="circular-text">
                                    <div className="circular-small-value">41g</div>
                                    <div className="circular-small-text">remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
                <button className="meal-button" onClick={() => setShowModal(true)}> + Add Meal</button>
                    
               <div className="recently-logged">
                    <p>Recently Logged</p>
                    <div className="log-cards">
                        <LogCard/>
                    </div>
                    
               </div>

                
                
            </div>

            {showModal && (
                <MealMethodModal
                    onClose={() => setShowModal(false)}
                    onManual={() => { setShowModal(false); setShowManualEntry(true); }}
                    onScan={() => { setShowModal(false); setShowAiEntry(true); }}
                />
            )}

            {showManualEntry && (
                <ManualEntryForm
                    onClose={() => {setShowManualEntry(false); setShowModal(true);}}
                    refreshData = {refreshData}
                    date = {date}
                />
            )}
            
           
        </>

    );

}

export default MainPage;