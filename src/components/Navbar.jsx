import './Navbar.css';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function Navbar({ date, dateSetter, showCalendar, calendarVisible}) {

  

  function renderButtons() {
    const days = [["Sunday"], ["Monday"], ["Tuesday"], ["Wednesday"], ["Thursday"], ["Friday"], ["Saturday"]];

    let startOfWeekDate = dayjs().startOf('week');
    for (const d of days){
      d.push(startOfWeekDate);
      startOfWeekDate = startOfWeekDate.add(1, 'day');
    }

    const buttons = [];
    for (const d of days) {
      if (d[1].isSame(date, 'day'))
        buttons.push(<button className="btn-date curr">
          <div>{d[0][0]}</div>
          <div>{d[1].format("DD")}</div>
        </button>);
      else{
        buttons.push(<button onClick={() => dateSetter(d[1])} className="btn-date">
          <div>{d[0][0]}</div>
          <div>{d[1].format("DD")}</div>
        </button>); 
      }
    }
    return buttons;
}
  
  
  
  return (
      <nav className="nav">
  
        <img className="logo" src="src/assets/fitnessio.png" alt="FitnessIO logo"/>
        <div className="nav-center">
        {renderButtons()}


        </div>
        <div className="nav-right">
        <button className = {`calendar-button ${calendarVisible ? "calendar-active" : ""}`} onClick={()=>{showCalendar(!calendarVisible)}}>
          <img className= {`calendar-pic ${calendarVisible ? "calendar-pic-active" : ""}`} src="src/assets/Daco_378914.png"></img>
        </button>
        
        </div>
      </nav>
    );
  }
  
  

export default Navbar;