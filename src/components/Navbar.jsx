import './Navbar.css';

function Navbar({ username }) {
    return (
      <nav className="nav">
        
       
            <img src="src/assets/fitnessio.png" alt="FitnessIO logo"/>
        <div className="nav-center">

        </div>
        <div className="nav-right">
          <button className="calendar-button">📅</button>
        </div>
      </nav>
    );
  }
  
  

export default Navbar;