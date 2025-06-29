import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularTracker(props){
    return(
    
        
      <CircularProgressbar
        value={props.value}
        styles={buildStyles({
            pathColor: props.color,
            textColor: "#333",
            trailColor: "#eee",
        })}
        />
    
   
    );
}

export default CircularTracker;