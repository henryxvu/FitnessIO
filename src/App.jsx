import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { useState } from "react";


function App(){
  const [isLoggedIn, toggleIsLoggedIn] = useState(false);
  
  
  
  /*
  if (!isLoggedIn){
    return <LoginPage stateChangingFunction={toggleIsLoggedIn}/>;
    }
    else
    return <MainPage/>
  */
  return <MainPage/>

  
  

}

export default App;
