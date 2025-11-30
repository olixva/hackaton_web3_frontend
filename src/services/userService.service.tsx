// src/services/userService.ts
const API_URL = "https://hackaton-web3-backend.vercel.app";

export interface User {
  id: number;
  name: string;
  profile_image_url: string;
//   email: string;
}

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`${API_URL}/user/${id}`);
  if (!res.ok) throw new Error("Error cargando usuario");
  return res.json();
}
