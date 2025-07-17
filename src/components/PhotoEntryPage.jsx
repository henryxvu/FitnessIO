import "./PhotoEntryPage.css"
import { useState } from "react";

function PhotoEntryPage({onBack, onClose, date, username}){
    const [preview, setPreview] = useState(null);
    const [macros, setMacros] = useState(null);
    const [macroData, setMacroData] = useState(null);
    const [image_URL, setURL] = useState(null);
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
            
            const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}upload`,{
                method: 'POST',
                body: formData
            });
    
            if (!uploadResponse.ok)
                throw new Error(`API Upload error: ${uploadResponse.statusText}`);

            const data = await uploadResponse.json();
            const imageURL = (data.data.url);

            setMacros(<p>Scanning meal...</p>)

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
            
            const macroResponse = await fetch(`${import.meta.env.VITE_API_URL}search`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({food: mealName.replace(/%/g, ' ')})
            });

            const macroData = await macroResponse.json();
            macroData.name = mealName;
            setMacroData(macroData);
            setMacros(<>
                <p style = {{fontWeight: '3rem'}}>{macroData.name}</p>
                <p>probability: {Math.round(foodData[1].score * 100)}%</p>
                <p>Calories: {Math.round(macroData.calories)} P: {Math.round(macroData.protein)} C: {Math.round(macroData.carbs)} F: {Math.round(macroData.fat)}</p>
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
                
                
                <p style={{fontWeight: "600", fontSize: "2rem"}}>Snap a photo of your meal</p>


                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" style={{ maxWidth: "100%", height: "200px", objectFit: "cover",  borderRadius: "12px" }} />
                    </div>
                )}      
                {macros && (
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
                <label htmlFor="file-upload" className="custom-file-button"><img style={{margin:'5px'}}src="src/assets/camera.png"/></label>
                <button 
                    disabled={!preview}
                    className={preview ? "btn-submit" : "btn-submit-dead"}
                    onClick={submit}
                    >Submit</button>
                </div>
            </div>


        </div>
    )
}

export default PhotoEntryPage;