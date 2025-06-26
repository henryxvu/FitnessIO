import { useState } from "react";

function LoginPage({stateChangingFunction}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [count, setcount] = useState(0);

    const [retryMessage, displayTryAgain] = useState(null);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const login = async () => {
        if (username === "admin" && password === "1234"){
            displayTryAgain(<p>Correct!</p>);
            await sleep(500);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            stateChangingFunction(true); // SETS LOGIN STATE IN APP TO TRUE
        }   
        else{
            displayTryAgain(<p>Incorrect Details. Try Again</p>);
            setcount(count + 1);
        }
    } 

   
    return(
        <div>
            
            <div id = "logincard">
                <h1>Count: {count}</h1>
                <form>
                    <input value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <input value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                {retryMessage}
                </form>
                <button onClick={login}>Login</button>
                <p>current username: <strong>{username}</strong></p>
                <p>current password: <strong>{password}</strong></p>
            </div>
            

        </div>
    );
}

export default LoginPage;
