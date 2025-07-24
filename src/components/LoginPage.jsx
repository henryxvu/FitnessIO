import { useState } from "react";
import "./LoginPage.css"

function LoginPage({viewChanger, setCurrentUserId}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retryMessage, displayTryAgain] = useState(null);
    

    const login = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        
        const data = await response.json();
    
        if (data.message === "Success"){
            setCurrentUserId({id: data.userId, username: username, totalCalories: data.totalCalories})
            viewChanger("mainpage");

        }
        else if (data.message === "Failed. Invalid Username")
            displayTryAgain("Failed. Invalid Username");
        else 
            displayTryAgain("Failed. Invalid Password");
    } 

   
    return(
        <div className="login-bg">
            <div className="login-card">
                <div className="login-header"><h1>Login</h1></div>
                <form>
                    <label>Username</label>
                    <input className="input-text" value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <label>Password</label>
                    <input className="input-text" value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                </form>
                <button className="login-btn" onClick={login}>Login</button>
                {retryMessage}
        
            </div>
            

        </div>
    );
}

export default LoginPage;
