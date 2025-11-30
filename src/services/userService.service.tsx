import { Constants } from "@/constants";

const API_URL = Constants.API_URL

// Interface defining the structure of a user
export interface User {
  id: number;
  name: string;
  email?: string;
  bsv_address?: string;
  profile_image_url: string;
  balance_satoshis?: number;
  balance_euro?: number;
  monthly_usage_kwh?: number;
}

// Fetches user data by ID
export async function getUser(id: string): Promise<User> {
  const res = await fetch(`${API_URL}/user/${id}`);
  if (!res.ok) throw new Error("Error loading user");
  return res.json();
}
