// src/pages/Messages.tsx
import { useEffect, useState } from "react";
import { getAlarms, Alert, toggleAlarm, createAlarm } from "@/services/alertService.service";
import { AlarmCard } from "@/components/alarmCard";
import "./messages.css";
import { Constants } from "@/constants";
import { CreateAlarmModal } from "@/components/createAlarmModal";
import type { AlarmType } from "@/components/createAlarmModal";

export function Messages() {
  const [alarms, setAlarms] = useState<Alert[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const userId = Constants.userId;

  useEffect(() => {
    getAlarms(userId)
      .then(setAlarms)
      .catch((err) => console.error(err));
  }, []);

  const handleToggleAlarm = async (id: string, newActive: boolean) => {
    // Actualización optimista del estado
    setAlarms((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, Active: newActive } : a
      )
    );

    try {
      await toggleAlarm(id);
    } catch (err) {
      console.error(err);

      // Revertir el cambio si falla la API
      setAlarms((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, Active: !newActive } : a
        )
      );
    }
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleCreateAlarm = async (values: { threshold: number; type: AlarmType }) => {
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

return (
  <div className="alarms-container">
    <h1>Alertas activas</h1>
    {alarms.map((alarm) => (
      <AlarmCard
        key={alarm.id}
        alarm={alarm}
        onToggle={handleToggleAlarm}
      />
    ))}

    <div className="btn-container">
      <button
        className="btn-create-alert"
        onClick={handleOpenCreateModal}
      >
        Crear alerta
      </button>

      <button
        className="btn-history-alert"
        onClick={() => console.log("Button clicked")}
      >
        Ver historial de alertas
      </button>
    </div>
    <CreateAlarmModal
      isOpen={isCreateModalOpen}
      onClose={handleCloseCreateModal}
      onConfirm={handleCreateAlarm}
    />
  </div>
);
}
