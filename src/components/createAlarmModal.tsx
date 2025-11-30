import { useState } from "react";
import "./createAlarmModal.css";

export type AlarmType = "money" | "energy";

interface NewAlarmValues {
  threshold: number;
  type: AlarmType;
}

interface CreateAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: NewAlarmValues) => Promise<void> | void;
}

export function CreateAlarmModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateAlarmModalProps) {
  const [threshold, setThreshold] = useState(18);
  const [type, setType] = useState<AlarmType>("money");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleIncrease = () => setThreshold((prev) => prev + 1);
  const handleDecrease = () =>
    setThreshold((prev) => (prev > 0 ? prev - 1 : 0));

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("[Modal] handleSubmit -> valores:", { threshold, type,  activate: true });
      await onConfirm({ threshold, type });
      console.log("[Modal] onConfirm resuelto");
    } catch (e) {
      console.error("[Modal] Error en onConfirm:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Crear nueva alerta</h2>
                {/* Toggle € / kWh */}
        <div className="modal-type-toggle">
          <button
            className={`toggle-btn ${type === "money" ? "active" : ""}`}
            onClick={() => setType("money")}
          >
            €
          </button>
          <button
            className={`toggle-btn ${type === "energy" ? "active" : ""}`}
            onClick={() => setType("energy")}
          >
            kWh
          </button>
        </div>
                {/* Selector numérico */}
        <div className="modal-threshold">
          <button onClick={handleDecrease} className="threshold-btn">
            -
          </button>
          <span className="threshold-value">{threshold}</span>
          <button onClick={handleIncrease} className="threshold-btn">
            +
          </button>
        </div>

        {/* ... resto igual ... */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
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
