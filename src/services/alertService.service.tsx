import { Constants } from "@/constants";

const API_URL = Constants.API_URL

// Interface defining the structure of an alert on frontend
export interface Alert {
  id: string;
  Active: boolean;
  threshold: number;
  type: "money" | "energy";
  userId: string;
}

// DTO for creating a new alarm on server
interface CreateAlarmDTO {
  active: boolean;
  threshold: number;
  type: "money" | "energy";
  user_id: string;
}

// API response for an alert
interface AlertApiResponse {
  id: string;
  active: boolean;
  threshold: number;
  type: "money" | "energy";
  user_id: string;
}

// Interface defining an alert history event
export interface AlertHistoryItem {
  id: string;
  user_id: string;
  alarm_id: string;
  value: number;   
  triggered_at: string; 
}


// Fetches user alert history
export async function getAlertHistory(
  userId: string
): Promise<AlertHistoryItem[]> {
  const res = await fetch(`${API_URL}/alarm/history/${userId}`);

  if (!res.ok) {
    throw new Error("Error loading history");
  }

  const data: AlertHistoryItem[] = await res.json();
  return data;
}

// Fetches all active alarms for a user
export async function getAlarms(userId: string): Promise<Alert[]> {
  const res = await fetch(`${API_URL}/alarm/user/${userId}`);

  if (!res.ok) {
    throw new Error("Error loading alarms");
  }

  const data: AlertApiResponse[] = await res.json();

  // Transforms API model to frontend model
  return data.map<Alert>((a) => ({
    id: a.id,
    Active: a.active,
    threshold: a.threshold,
    type: a.type,
    userId: a.user_id,
  }));
}

// Toggles an existing alarm on or off
export async function toggleAlarm(alarmId: string): Promise<void> {
  const res = await fetch(`${API_URL}/alarm/${alarmId}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Error toggling alarm");
  }
}


// Creates a new alarm and returns data mapped to frontend model
export async function createAlarm(
  data: CreateAlarmDTO
): Promise<Alert> {
  console.log("[Service] body sent to /alarm:", data);

  const res = await fetch(`${API_URL}/alarm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log("[Service] status /alarm:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("[Service] ERROR /alarm:", text);
    throw new Error("Error creating alarm");
  }

  // Extracts ID from API response
  const json = (await res.json()) as { id: string } | AlertApiResponse;
  const id = "id" in json ? json.id : (json as AlertApiResponse).id;

  // Returns alarm in frontend format
  return {
    id,
    Active: data.active,
    threshold: data.threshold,
    type: data.type,
    userId: data.user_id,
  };
}