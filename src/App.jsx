import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import OnboardPage from './components/OnboardPage';
import Page1 from './components/Page1';
import { useState, useEffect } from "react";


function App(){
  
  const [view, setView] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    async function startup() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}startup`, {
          method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        if (data.message === "Success") {
          setView("onboard");
        } else {
          throw new Error("Server not responding")
        }
      } catch (error) {
        console.error("Connection failed", error);
    
        setTimeout(() => {
          startup();
        }, 1000);

      }
    }

    startup(); 
  }, []);
  
  
  if (!view) {
    return <div>Connecting to server...</div>;
  }

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
 