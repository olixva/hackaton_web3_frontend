
import Welcome from '../components/welcome';
import { useEffect, useState } from "react";
import { getUser, User } from "@/services/userService.service";
import { Constants } from '@/constants';
import { Chart } from '@/components/chart';
import { BalanceCards } from '@/components/balance-cards';


export function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const userId = Constants.userId;

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
    return <p style={{ padding: "20px" }}>Hola Usuario</p>;
  }

  console.log("Usuario", user)

  return (
    <div>
      <Welcome name={user.name} profileImage={user.profile_image_url}/>
      <BalanceCards user={user} />
      <Chart/>
      </div>
  );
}
