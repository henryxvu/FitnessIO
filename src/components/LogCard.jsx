import './LogCard.css';

function LogCard ({entries}){
    if (!entries || entries.length < 1)
        return <div className="invalid-card">No meals logged for this date</div>
    else{
        const cards = [];
        entries.forEach(entry => {
            cards.push(
                <div className="log-card">
                    <div className="log-left-container"><img style={{ maxWidth: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }} src={entry.imageURL}></img></div>
                    <div className="log-right-container">
                        <div>
                            <p className="meal-name">{entry.meal}</p>
                            <p className="meal-calories">{entry.calorie} calories</p>
                        </div>


                        <div className="meal-macros"><p>Protein: {Math.round(entry.protein)}g</p><p>Carbs: {Math.round(entry.carb)}g</p><p>Fat: {Math.round(entry.fat)}g</p></div>
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