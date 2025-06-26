import './Navbar.css';

function Navbar({ username }) {
    return (
      <nav className="nav">
        <div className="nav-left">FitnessIO</div>
        <div className="nav-center">Hello {username}</div>
        <div className="nav-right">
          <button className="calendar-button">📅</button>
        </div>
      </nav>
    );
  }
  
  

export default Navbar;