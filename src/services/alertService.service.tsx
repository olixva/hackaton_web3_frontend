import { Constants } from "@/constants";

const API_URL = Constants.API_URL

export interface Alert {
  id: string;
  Active: boolean;
  threshold: number;
  type: "money" | "energy";
  userId: string;
}

interface CreateAlarmDTO {
  active: boolean;
  threshold: number;
  type: "money" | "energy";
  user_id: string;
}

interface AlertApiResponse {
  id: string;
  active: boolean;
  threshold: number;
  type: "money" | "energy";
  user_id: string;
}

export interface AlertHistoryItem {
  id: string;
  user_id: string;
  alarm_id: string;
  value: number;   
  triggered_at: string; 
}


export async function getAlertHistory(
  userId: string
): Promise<AlertHistoryItem[]> {
  const res = await fetch(`${API_URL}/alarm/history/${userId}`);

  if (!res.ok) {
    throw new Error("Error cargando historial");
  }

  const data: AlertHistoryItem[] = await res.json();
  return data;
}

export async function getAlarms(userId: string): Promise<Alert[]> {
  const res = await fetch(`${API_URL}/alarm/user/${userId}`);

  if (!res.ok) {
    throw new Error("Error cargando alarmas");
  }

  const data: AlertApiResponse[] = await res.json();

  // Mapeamos de modelo API -> modelo FRONT
  return data.map<Alert>((a) => ({
    id: a.id,
    Active: a.active,
    threshold: a.threshold,
    type: a.type,
    userId: a.user_id,
  }));
}

export async function toggleAlarm(alarmId: string): Promise<void> {
  const res = await fetch(`${API_URL}/alarm/${alarmId}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Error haciendo toggle de la alarma");
  }
}


export async function createAlarm(
  data: CreateAlarmDTO
): Promise<Alert> {
  console.log("[Service] body enviado a /alarm:", data);

  const res = await fetch(`${API_URL}/alarm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log("[Service] status /alarm:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("[Service] ERROR /alarm:", text);
    throw new Error("Error creando la alarma");
  }

  const json = (await res.json()) as { id: string } | AlertApiResponse;
  const id = "id" in json ? json.id : (json as AlertApiResponse).id;

  return {
    id,
    Active: data.active,
    threshold: data.threshold,
    type: data.type,
    userId: data.user_id,
  };
}