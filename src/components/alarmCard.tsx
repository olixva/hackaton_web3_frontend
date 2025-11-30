import { Alert } from "@/services/alertService.service";
import "./alarmCard.css";

interface AlarmCardProps {
    alarm: Alert;
    onToggle: (id: string, newActive: boolean) => void;
}

export function AlarmCard({ alarm, onToggle }: AlarmCardProps) {
    const isActive = alarm.Active;

    const handleToggle = () => {
        onToggle(alarm.id, !isActive);
    };

    return (
        <div className={`alarm-card ${isActive ? "alarm-card--active" : "alarm-card--inactive"}`}>
            <div className="alarm-card__info">
                <div className="alarm-card__amount">
                    <span className="amount-value">{alarm.threshold}</span>
                    <span className="amount-currency">
                        {alarm.type === "money" ? "€" : "kwh"}
                    </span>

                </div>
                <div className="alarm-card__label">
                    {alarm.type || "Alerta"}
                </div>
            </div>

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
