import { useState } from "react";
import "./createAlarmModal.css";

// Alarm type definition
export type AlarmType = "money" | "energy";

// Interface for new alarm values
interface NewAlarmValues {
  threshold: number;
  type: AlarmType;
}

// Interface for modal component props
interface CreateAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: NewAlarmValues) => Promise<void> | void;
}

// Modal component for creating new alarms
export function CreateAlarmModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateAlarmModalProps) {
  // State variables for threshold value, alarm type, and submission status
  const [threshold, setThreshold] = useState(18);
  const [type, setType] = useState<AlarmType>("money");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Renders nothing if modal is closed
  if (!isOpen) return null;

  // Increments the threshold value
  const handleIncrease = () => setThreshold((prev) => prev + 1);
  // Decrements the threshold value without allowing negatives
  const handleDecrease = () =>
    setThreshold((prev) => (prev > 0 ? prev - 1 : 0));

  // Handles new alarm confirmation with validation and error handling
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("[Modal] handleSubmit -> values:", { threshold, type,  activate: true });
      await onConfirm({ threshold, type });
      console.log("[Modal] onConfirm resolved");
    } catch (e) {
      console.error("[Modal] Error in onConfirm:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Dark overlay with centered modal
    <div className="modal-overlay">
      <div className="modal">
        {/* Modal title */}
        <h2 className="modal-title">Create new alert</h2>
        {/* Toggle to select alarm type (money or energy) */}
        <div className="modal-type-toggle">
          {/* Button to select money alarm */}
          <button
            className={`toggle-btn ${type === "money" ? "active" : ""}`}
            onClick={() => setType("money")}
          >
            €
          </button>
          {/* Button to select energy alarm */}
          <button
            className={`toggle-btn ${type === "energy" ? "active" : ""}`}
            onClick={() => setType("energy")}
          >
            kWh
          </button>
        </div>
        {/* Controls to adjust threshold value */}
        <div className="modal-threshold">
          {/* Button to decrement value */}
          <button onClick={handleDecrease} className="threshold-btn">
            -
          </button>
          {/* Displays current threshold value */}
          <span className="threshold-value">{threshold}</span>
          {/* Button to increment value */}
          <button onClick={handleIncrease} className="threshold-btn">
            +
          </button>
        </div>

        {/* Modal footer with action buttons */}
        <div className="modal-footer">
          {/* Button to close modal without saving */}
          <button className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          {/* Button to confirm and create alarm */}
          <button
            className="btn-confirm"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
