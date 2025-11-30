import { Alert } from "@/services/alertService.service";
import "./alarmCard.css";

// Defines the interface for component props
interface AlarmCardProps {
    alarm: Alert;
    onToggle: (id: string, newActive: boolean) => void;
}

export function AlarmCard({ alarm, onToggle }: AlarmCardProps) {
    // Gets the current alarm state (active or inactive)
    const isActive = alarm.Active;

    // Event handler to toggle the alarm state
    const handleToggle = () => {
        onToggle(alarm.id, !isActive);
    };

    return (
      // Main container with conditional styles based on alarm state
        <div className={`alarm-card ${isActive ? "alarm-card--active" : "alarm-card--inactive"}`}>
            {/* Info section: displays the threshold value and alarm type */}
            <div className="alarm-card__info">
                {/* Displays the numeric threshold value with its unit */}
                <div className="alarm-card__amount">
                    <span className="amount-value">{alarm.threshold}</span>
                    <span className="amount-currency">
                        {alarm.type === "money" ? "€" : "kwh"}
                    </span>

                </div>
                {/* Descriptive label of the alarm type */}
                <div className="alarm-card__label">
                    {alarm.type || "Alerta"}
                </div>
            </div>

            {/* Toggle button to activate/deactivate the alarm */}
            <button
                type="button"
                className={`alarm-switch ${isActive ? "alarm-switch--on" : "alarm-switch--off"}`}
                onClick={handleToggle}
            >
                <div className="alarm-switch__thumb" />
            </button>
        </div>
    );
}
