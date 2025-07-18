import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import CircularTracker from "./CircularTracker.jsx";
import LogCard from "./LogCard.jsx"
import MealMethodModal from './MealMethodModal';
import './MainPage.css';
import ManualEntryForm from "./ManualEntryForm.jsx";
import dayjs from 'dayjs';
import DatePicker from "react-datepicker";
import CalendarDropdown from "./CalendarDropdown.jsx";
import PhotoEntryPage from "./PhotoEntryPage.jsx";



function MainPage({userId}){
    
    const [username, setUsername] = useState(userId.username);
    
    /* Macros */
    const calorieTotal = userId.totalCalories;
    const [calorieCount, setCalorieCount] = useState(0);
    const [proteinTotal, setProteinTotal] = useState(180);
    const [proteinCount, setProteinCount] = useState(0);

    const [carbTotal, setCarbTotal] = useState(220);
    const [carbCount, setCarbCount] = useState(0);
    
    const [fatTotal, setFatTotal] = useState(70);
    const [fatCount, setFatCount] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [showAiEntry, setShowAiEntry] = useState(false);

    const [date, setDate] = useState(dayjs());

    const [mealEntries, setMealEntries] = useState();
    
      const [showCalendar, setShowCalendar] = useState(false);
    

    async function refreshData() {
        // refreshes website data for a specific date

        console.log("Initiated refresh");
        const searchParams = new URLSearchParams({username: userId.username, date: date.format("MM/DD/YYYY")})
        const response = await fetch(`${import.meta.env.VITE_API_URL}meal?${searchParams}`,{
            method: 'GET'
        });

        const data = await response.json();
        console.log(data);

        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;


        // loop through each entry, summing up the totals of all entries 
        const entries = [];
        data.forEach(entry => {
            entries.push(entry);
            totalCalories += parseInt(entry.calorie) || 0;
            totalProtein += parseInt(entry.protein) || 0;
            totalCarbs += parseInt(entry.carb) || 0;
            totalFats += parseInt(entry.fat) || 0;
        })
        
        setMealEntries(entries);
        setCalorieCount(totalCalories);
        setProteinCount(totalProtein);
        setCarbCount(totalCarbs);
        setFatCount(totalFats);
    }

    function calculateMacroTargets(calories) {
        const proteinCalories = calories * 0.25;
        const carbCalories = calories * 0.5;
        const fatCalories = calories * 0.25;
    
        const proteinGrams = Math.round(proteinCalories / 4);
        const carbGrams = Math.round(carbCalories / 4);
        const fatGrams = Math.round(fatCalories / 9);
    
        setProteinTotal(proteinGrams);
        setCarbTotal(carbGrams);
        setFatTotal(fatGrams);
    }

    useEffect(() => {
        refreshData();
    }, [date]);

    useEffect(() => {
        if (userId.totalCalories) {
            calculateMacroTargets(userId.totalCalories);
        }
    }, [userId.totalCalories]);
  
    return(
        <> 

            <div className="dashboard">
            <Navbar date={date} dateSetter={setDate} showCalendar={setShowCalendar} calendarVisible={showCalendar}/>
            

            
                <div className="header">
                    <p style={{margin: '0'}}>Hello, {username}</p>
                    <p style={{margin: '0'}}>{date.format("MMMM DD, YYYY")}</p>
                </div>
    
                <div className="calorie-card">
                    <div className="card-left">
                        <div className="calorie-value">{calorieCount}</div>
                        <div className="macro-label"><p>Calories consumed</p></div>
                    </div>

                    <div className="card-right">
                        <div className="circular-wrapper">
                            <CircularTracker value={(calorieCount / calorieTotal) * 100} color="gold"/>
                            <div className="circular-text">
                                <div className="macro-value">{calorieTotal - calorieCount}</div>
                                <div className="macro-label"><p>remaining</p></div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="macro-cards">

                    <div className="protein-card">
                        <div className="macro-value">{proteinCount}g</div>
                        <div className="macro-label" style={{padding: '0 0 5px 0'}}><p>Protein consumed</p></div>
                        <div className="macro-circle">
                            <div className="circular-wrapper">
                                <CircularTracker value={(proteinCount / proteinTotal) * 100} color="orange"/>
                                <div className="circular-text">
                                    <div className="circular-small-value">{proteinTotal - proteinCount}g</div>
                                    <div className="circular-small-text">remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carbs-card">
                        <div className="macro-value">{carbCount}g </div>
                        <div className="macro-label" style={{padding: '0 0 5px 0'}}><p>Carbs consumed</p></div>
                       
                            <div className="macro-circle">
                                <div className="circular-wrapper">
                                    <CircularTracker value={(carbCount/carbTotal)*100}/>
                                    <div className="circular-text">
                                        <div className="circular-small-value">{carbTotal - carbCount}g</div>
                                        <div className="circular-small-text">remaining</div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="fats-card">
                        <div className="macro-value">{fatCount}g</div>
                        <div className="macro-label" style={{padding: '0 0 5px 0'}}><p>Fats consumed</p></div>
                        <div className="macro-circle">
                            <div className="circular-wrapper">
                                <CircularTracker value={(fatCount/fatTotal)*100} color="#e594ff"/>
                                <div className="circular-text">
                                    <div className="circular-small-value">{fatTotal-fatCount}g</div>
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
                        <LogCard entries={mealEntries}/>
                    </div>
                    
               </div>

                

            </div>
            {showCalendar && (
  <CalendarDropdown
    date={date}
    onChange={setDate}
    showCalendar={setShowCalendar}
    visible={showCalendar}
  />
)}

            {showModal && (
                <MealMethodModal
                onClose={() => setShowModal(false)}
                onManual={() => { setShowModal(false); setShowManualEntry(true); }}
                onScan={() => { setShowModal(false); setShowAiEntry(true); }}
                />
            )}

            {showManualEntry && (
                <ManualEntryForm
                onClose={() => {setShowManualEntry(false); setShowModal(false);}}
                onBack={() => {setShowManualEntry(false); setShowModal(true);}}
                refreshData = {refreshData}
                date = {date.format("MM/DD/YYYY")}
                username = {username}
                
                />
            )}
            
            {showAiEntry && (
                <PhotoEntryPage
                onClose={() => {setShowAiEntry(false); setShowModal(false);}}
                onBack={() => {setShowAiEntry(false); setShowModal(true);}}
                date = {date.format("MM/DD/YYYY")}
                username = {username}
                refreshData = {refreshData}
                />
            )}
           
        </>

    );

}

export default MainPage;