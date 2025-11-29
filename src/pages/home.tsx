
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

  if (!user) {
    return <p style={{ padding: "20px" }}>Hola Paco</p>;
  }

  console.log("Usuario", user)

  return (
    <div>
      <Welcome name={user.name} profileImage={user.profile_image_url}/>

      </div>
  );
}
