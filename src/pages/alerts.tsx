// src/pages/Alerts.tsx
import { useEffect, useState } from "react";
import {
  getAlarms,
  Alert,
  toggleAlarm,
  createAlarm,
  getAlertHistory,
  AlertHistoryItem,
} from "@/services/alertService.service";
import { AlarmCard } from "@/components/alarmCard";
import "./alerts.css";
import { Constants } from "@/constants";
import { CreateAlarmModal } from "@/components/createAlarmModal";
import type { AlarmType } from "@/components/createAlarmModal";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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

export function Alerts() {
  const [alarms, setAlarms] = useState<Alert[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [alarmsLoading, setAlarmsLoading] = useState(true);
  const userId = Constants.userId;

  // estado para el Drawer de historial
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<AlertHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    setAlarmsLoading(true);
    getAlarms(userId)
      .then(setAlarms)
      .catch((err) => console.error(err))
      .finally(() => setAlarmsLoading(false));
  }, []);

  useEffect(() => {
    if (!isHistoryOpen) return;

    setHistoryLoading(true);
    getAlertHistory(userId)
      .then(setHistory)
      .catch((err) => console.error(err))
      .finally(() => setHistoryLoading(false));
  }, [isHistoryOpen, userId]);

  const handleToggleAlarm = async (id: string, newActive: boolean) => {
    // Actualización optimista del estado
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, Active: newActive } : a))
    );

    try {
      await toggleAlarm(id);
    } catch (err) {
      console.error(err);

      // Revertir el cambio si falla la API
      setAlarms((prev) =>
        prev.map((a) => (a.id === id ? { ...a, Active: !newActive } : a))
      );
    }
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

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

      // newAlert YA es de tipo Alert, no hace falta cast
      setAlarms((prev) => [...prev, newAlert]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creando la alarma", error);
    }
  };

  const formatCurrencySymbol = (type: "money" | "energy") =>
    type === "money" ? "€" : "kWh";

  return (
    <div className="alarms-container">
      <h1>Alertas activas</h1>
      {alarmsLoading ? (
        <>
          <SkeletonAlarmCard />
          <SkeletonAlarmCard />
          <SkeletonAlarmCard />
        </>
      ) : (
        alarms.map((alarm) => (
          <AlarmCard
            key={alarm.id}
            alarm={alarm}
            onToggle={handleToggleAlarm}
          />
        ))
      )}

      <div className="btn-container">
        <button className="btn-create-alert" onClick={handleOpenCreateModal}>
          Crear alerta
        </button>

        {/* Drawer para el historial */}
        <Drawer open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DrawerTrigger asChild>
            <button className="btn-history-alert">
              Ver historial de alertas
            </button>
          </DrawerTrigger>
          <DrawerContent className="history-drawer">
            <div className="history-wrapper">
              <DrawerHeader className="history-header">
                <DrawerTitle className="history-title">
                  Ver historial de alertas
                </DrawerTitle>
              </DrawerHeader>

              {historyLoading ? (
                <p className="history-loading">Cargando...</p>
              ) : history.length === 0 ? (
                <p className="history-empty">No hay alertas en el historial.</p>
              ) : (
                <div className="history-list">
                  {history.map((item) => {
                    // buscamos la alarma asociada
                    const alarm = alarms.find((a) => a.id === item.alarm_id);

                    const symbol = formatCurrencySymbol(alarm?.type ?? "money");

                    // formatear la hora a 10:45, 22:18, etc.
                    const time = new Date(item.triggered_at).toLocaleTimeString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );

                    // texto del centro (por ahora algo genérico; si luego el backend manda más info, lo cambiamos)
                    const label = alarm
                      ? "Alerta alcanzada" // aquí puedes poner lo que quieras
                      : "Alerta";

                    return (
                      <div key={item.id} className="history-row">
                        <div className="history-left">
                          <span className="history-amount">
                            {item.value.toFixed(1)}
                            {symbol}
                          </span>
                        </div>

                        <div className="history-middle">
                          <span className="history-label">{label}</span>
                        </div>

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

      <CreateAlarmModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onConfirm={handleCreateAlarm}
      />
    </div>
  );
}
