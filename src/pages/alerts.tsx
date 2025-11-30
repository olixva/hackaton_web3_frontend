import { useEffect, useState } from "react";
import {
  getAlarms,
  Alert,
  toggleAlarm,
  createAlarm,
  getAlertHistory,
  AlertHistoryItem,
} from "@/services/alertService.service";
// Imports components
import { AlarmCard } from "@/components/alarmCard";
import "./alerts.css";
import { Constants } from "@/constants";
import { CreateAlarmModal } from "@/components/createAlarmModal";
import type { AlarmType } from "@/components/createAlarmModal";

// Importa componentes del Drawer para mostrar historial
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Skeleton component displayed while alarms are loading
function SkeletonAlarmCard() {
  return (
    <div className="alarm-card alarm-card--skeleton">
      <div className="alarm-card__info">
        <div className="alarm-card__amount">
          <span className="amount-value skeleton-text">---</span>
          <span className="amount-currency skeleton-text">€</span>
        </div>
        <div className="alarm-card__label skeleton-text">Cargando...</div>
      </div>
      <div className="alarm-switch alarm-switch--skeleton">
        <div className="alarm-switch__thumb" />
      </div>
    </div>
  );
}

// Main alerts page
export function Alerts() {
  // State variables for managing alarms, modal, and history
  const [alarms, setAlarms] = useState<Alert[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [alarmsLoading, setAlarmsLoading] = useState(true);
  // Gets user ID from constants
  const userId = Constants.userId;

  // State variables for alert history drawer
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<AlertHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Loads user alarms on component mount
  useEffect(() => {
    setAlarmsLoading(true);
    getAlarms(userId)
      .then(setAlarms)
      .catch((err) => console.error(err))
      .finally(() => setAlarmsLoading(false));
  }, []);

  // Loads alert history when drawer opens
  useEffect(() => {
    if (!isHistoryOpen) return;

    setHistoryLoading(true);
    getAlertHistory(userId)
      .then(setHistory)
      .catch((err) => console.error(err))
      .finally(() => setHistoryLoading(false));
  }, [isHistoryOpen, userId]);

  // Handles alarm state change with optimistic update
  const handleToggleAlarm = async (id: string, newActive: boolean) => {
    // Optimistic state update
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, Active: newActive } : a))
    );

    try {
      await toggleAlarm(id);
    } catch (err) {
      console.error(err);

      // Revert change if API fails
      setAlarms((prev) =>
        prev.map((a) => (a.id === id ? { ...a, Active: !newActive } : a))
      );
    }
  };

  // Opens modal to create new alarm
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  // Closes modal
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  // Creates new alarm and adds it to list
  const handleCreateAlarm = async (values: {
    threshold: number;
    type: AlarmType;
  }) => {
    try {
      const newAlert = await createAlarm({
        active: true,
        threshold: values.threshold,
        type: values.type,
        user_id: userId,
      });

      // Adds new alarm to list
      setAlarms((prev) => [...prev, newAlert]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creando la alarma", error);
    }
  };

  // Converts alarm type to corresponding currency symbol
  const formatCurrencySymbol = (type: "money" | "energy") =>
    type === "money" ? "€" : "kWh";

  return (
    // Main alerts page container
    <div className="alarms-container">
      <h1>Active alerts</h1>
      {/* Shows skeletons while loading or list of alarms */}
      {alarmsLoading ? (
        <>
          <SkeletonAlarmCard />
          <SkeletonAlarmCard />
          <SkeletonAlarmCard />
        </>
      ) : (
        // Renders each alarm as interactive card
        alarms.map((alarm) => (
          <AlarmCard
            key={alarm.id}
            alarm={alarm}
            onToggle={handleToggleAlarm}
          />
        ))
      )}

      {/* Action buttons container */}
      <div className="btn-container">
        {/* Button to create new alarm */}
        <button className="btn-create-alert" onClick={handleOpenCreateModal}>
          Create alert
        </button>

        {/* Drawer for viewing alert history */}
        <Drawer open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DrawerTrigger asChild>
            {/* Button to open history */}
            <button className="btn-history-alert">
              View alert history
            </button>
          </DrawerTrigger>
          <DrawerContent className="history-drawer">
            <div className="history-wrapper">
              <DrawerHeader className="history-header">
                <DrawerTitle className="history-title">
                  Alert history
                </DrawerTitle>
              </DrawerHeader>

              {/* Shows loading state or history list */}
              {historyLoading ? (
                <p className="history-loading">Loading...</p>
              ) : history.length === 0 ? (
                <p className="history-empty">No alerts in history.</p>
              ) : (
                <div className="history-list">
                  {history.map((item) => {
                    // Finds associated alarm
                    const alarm = alarms.find((a) => a.id === item.alarm_id);

                    // Gets currency symbol
                    const symbol = formatCurrencySymbol(alarm?.type ?? "money");

                    // Formats date and time
                    const time = new Date(item.triggered_at).toLocaleTimeString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );

                    // Descriptive label for event
                    const label = alarm
                      ? "Alert reached"
                      : "Alert";

                    return (
                      <div key={item.id} className="history-row">
                        {/* Triggered alert value */}
                        <div className="history-left">
                          <span className="history-amount">
                            {item.value.toFixed(1)}
                            {symbol}
                          </span>
                        </div>

                        {/* Event type */}
                        <div className="history-middle">
                          <span className="history-label">{label}</span>
                        </div>

                        {/* Event date and time */}
                        <div className="history-right">
                          <span className="history-time">{time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Modal to create new alarm */}
      <CreateAlarmModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onConfirm={handleCreateAlarm}
      />
    </div>
  );
}
