import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import OnboardPage from './components/OnboardPage';
import Page1 from './components/Page1';
import { useState } from "react";


function App(){
  
  const [view, setView] = useState("onboard");
  const [currentUserId, setCurrentUserId] = useState(null);


  if (view === "onboard")
    return <OnboardPage viewChanger={setView} setUserId={setCurrentUserId}/>;
  if (view === "login")
    return <LoginPage viewChanger={setView} setCurrentUserId={setCurrentUserId}/>;

  
  if (view === "mainpage"){
    console.log(currentUserId);
    return <MainPage userId={currentUserId}/>;
  }

}

export default App;
