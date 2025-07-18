import "./PhotoEntryPage.css"
import camera from "../assets/camera.png"
import { useState } from "react";

function PhotoEntryPage({refreshData, onBack, onClose, date, username}){
    const [preview, setPreview] = useState(null);
    const [macros, setMacros] = useState(null);
    const [macroData, setMacroData] = useState(null);
    const [macroTitle, setMacroTitle] = useState(null);
    const [image_URL, setURL] = useState(null);

    const [scanningMeal, setScanningMeal] = useState(null);
    const [probability, setProbability] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
            if (selectedFile) {
                const objectURL = URL.createObjectURL(selectedFile);
                setPreview(objectURL);
                scanFood(selectedFile);
            }
      };

    async function scanFood(file){
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try{
            
            setScanningMeal(true);
            const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}upload`,{
                method: 'POST',
                body: formData
            });
    
            if (!uploadResponse.ok)
                throw new Error(`API Upload error: ${uploadResponse.statusText}`);

            const data = await uploadResponse.json();
            const imageURL = (data.data.url);


            setURL(imageURL);
            const scanResponse = await fetch(`${import.meta.env.VITE_API_URL}scan`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({imageURL: imageURL})
            });
            
            const foodData = await scanResponse.json();
            console.log(foodData)
            
            let mealName = foodData[0].description
            if (mealName == 'Food' || mealName == 'Ingredient' || mealName == 'Fruit'){
                mealName = foodData[1].description
            }
            setProbability(Math.round(foodData[1].score * 100));

            const macroResponse = await fetch(`${import.meta.env.VITE_API_URL}search`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({food: mealName.replace(/%/g, ' ')})
            });

            const macroData = await macroResponse.json();
            macroData.name = mealName;
            setScanningMeal(false);
            setMacroData(macroData);
            setMacroTitle(true);
            setMacros(<>
            <div className="results-container">
                <div className="food-details-container">
                    <div className="macro-block">
                        <span className="macro-label">Calories</span>
                        <span className="macro-value">{Math.round(macroData.calories)}</span>
                    </div>
                    <div className="macro-block">
                        <span className="macro-label">Protein</span>
                        <span className="macro-value">{Math.round(macroData.protein)}g</span>
                    </div>
                    <div className="macro-block">
                        <span className="macro-label">Carbs</span>
                        <span className="macro-value">{Math.round(macroData.carbs)}g</span>
                    </div>
                    <div className="macro-block">
                        <span className="macro-label">Fat</span>
                        <span className="macro-value">{Math.round(macroData.fat)}g</span>
                    </div>
                </div>
            </div>
                        </>);
                



        } catch (error) {
            console.error("Error during food scan:", error);
        }
    }
    
    async function submit(){
        try{

            console.log('submit')
            const response = await fetch(`${import.meta.env.VITE_API_URL}meal`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, date: date, meal: macroData.name, calorie: macroData.calories, protein: macroData.protein, carb: macroData.carbs, fat: macroData.fat, imageURL: image_URL})
            });

            const result = await response.json();
            if (!response.ok)
                throw new Error();
            refreshData();
            onClose();

        } catch (error) {
            console.log("error while submitting to db");
        }   

    }


    return(
        <div className="backdrop">
            <div className="content" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <div className="cancel-button-container">
                    <button className="back-button" onClick={onBack}>←</button>
                    <button className="button-close" onClick={onClose}>
                        <span class="X"></span>
                        <span class="Y"></span>
                        <div class="close">Close</div>
                    </button>
                </div>
                
                
                <p style={{fontWeight: "600", fontSize: "2rem", marginBottom: "1rem"}}>Capture your meal

</p>

                {macroTitle && !scanningMeal && (
                     <div className="food-title-container"style={{ textAlign: 'center' }}>
                     <p className="food-name">{macroData.name}</p>
                     <p style={{fontSize: '1rem', marginTop: '.5rem'}}>Probability: {probability}%</p>
                 </div>
                )}
                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" style={{ maxWidth: "100%", height: "200px", objectFit: "cover",  borderRadius: "12px" }} />
                    </div>
                )}     
                {scanningMeal && (
                    <p>Scanning Food...</p>
                )} 
                {macros && !scanningMeal &&(
                    <div className="macros">
                        {macros}
                    </div>
                )}
                <div className="submit-container" style={{marginBottom:'0.75rem'}}>
                <input
                        style={{display: "none", marginTop: "1rem", marginBottom: "1rem",fontSize:"1rem"}}
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                        />
                <label htmlFor="file-upload" className="custom-file-button"><img style={{margin: '5px', maxWidth: '50%'}}src={camera}/></label>
                <button 
                    disabled={!macros}
                    className={macros ? "btn-submit" : "btn-submit-dead"}
                    onClick={submit}
                    >Submit</button>
                </div>
            </div>


        </div>
    )
}

export default PhotoEntryPage;