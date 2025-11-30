const API_URL = "https://hackaton-web3-backend.vercel.app";

export interface Alert {
  Active: boolean;
  threshold: number;
  id: string;
  userId: string;
  type: "money" | "energy";
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


export async function getAlarms(userId: string): Promise<Alert[]> {
  const res = await fetch(`${API_URL}/alarm/user/692b9e2c0c45d7f4031812c4`);

  if (!res.ok) {
    throw new Error("Error cargando alarmas");
  }

  const data: Alert[] = await res.json();
  return data;
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