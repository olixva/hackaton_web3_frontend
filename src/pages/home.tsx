
import Welcome from '../components/welcome';
import { useEffect, useState } from "react";
import { getUser, User } from "@/services/userService.service";


export function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const userId: string = "692b566e0ef3a85601b288f2";

  useEffect(() => {
    getUser(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando usuario...</p>;
  }

  console.log("Usuario", user)

  return (
    <div>
      <Welcome />
      <div style={{ padding: "20px" }}>
        <h1>Bienvenido a Lumia</h1>

        <h2>Usuario cargado:</h2>

        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Nombre:</strong> {user?.name}</p>
      </div>
    </div>
  );
}
