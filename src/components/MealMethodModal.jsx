import "./MealMethodModal.css";

function MealMethodModal({ onClose, onManual, onScan }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <button className="button-close" onClick={onClose}>x</button>
          <h2>How would you like to log your meal?</h2>
          <div className="buttons-container">
            <button className="ai-button" onClick={onScan}>📸 Use AI Photo</button>
            <button className="manual-button" onClick={onManual}>📝 Enter Manually</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default MealMethodModal;