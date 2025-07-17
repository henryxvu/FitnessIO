import { useState } from "react";
import "./Page1.css"

function Page1({viewChanger, ID}){

    const [view, viewSetter] = useState("healthGoals")


    function healthGoals(){
        return(
        <div className="health-goals-container">
            <h1>What are your health goals?</h1>
            <button className="btn-lose-weight"></button>
            <button className="btn-maintain-weight"></button>
            <button className="btn-gain-muscle"></button>
        </div>
        )
    }


    return(
        <div className="page1-content">
            {view === "healthGoals" && healthGoals()}


        </div>
    )
}

export default Page1;