const API_URL = "https://hackaton-web3-backend.vercel.app";

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

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`${API_URL}/user/${id}`);
  if (!res.ok) throw new Error("Error cargando usuario");
  return res.json();
}
