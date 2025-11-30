import Welcome from "../components/welcome";
import { Chart } from "@/components/chart";
import { BalanceCards } from "@/components/balance-cards";
import { useUser } from "@/contexts/UserContext";

export function Home() {
  const { user, loading } = useUser();

  if (!user) {
    return <p style={{ padding: "20px" }}>Hola Usuario</p>;
  }

  console.log("Usuario", user);

  return (
    <div>
      <Welcome name={user.name} profileImage={user.profile_image_url} />
      <BalanceCards user={user} />
      <Chart />
    </div>
  );
}
