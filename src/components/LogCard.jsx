import './LogCard.css';

function LogCard ({entries}){
    if (!entries || entries.length < 1)
        return <div className="invalid-card">No meals logged for this date</div>
    else{
        const cards = [];
        entries.forEach(entry => {
            cards.push(
                <div className="log-card">
                    <div className="log-left-container"><img className="log-img" src=""></img></div>
                    <div className="log-right-container">
                        <div>
                            <p className="meal-name">{entry.meal}</p>
                            <p className="meal-calories">{entry.calorie} calories</p>
                        </div>


                        <p className="meal-macros">P: {entry.protein}g C: {entry.carb}g  F: {entry.fat}g</p>
                    </div>
                
                
                </div>)})
            return (
                <div>
                    {cards}
            
                </div>
            );

    }

        
        

}

export default LogCard;