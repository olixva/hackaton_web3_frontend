import Welcome from "../components/welcome";
import { Chart } from "@/components/chart";
import { BalanceCards } from "@/components/balance-cards";
// Imports custom hook for accessing user context
import { useUser } from "@/contexts/UserContext";

// Main home page displaying user data
export function Home() {
  // Gets user data from context
  const { user, loading } = useUser();

  // Shows message if no user data available
  if (!user) {
    return <p style={{ padding: "20px" }}>Hello User</p>;
  }

  // User log for debugging
  console.log("User", user);

  // Renders main content with welcome, balance cards, and chart components
  return (
    <div>
      {/* Personalized welcome component */}
      <Welcome name={user.name} profileImage={user.profile_image_url} />
      {/* Balance cards in euros and consumption */}
      <BalanceCards user={user} />
      {/* Chart with interval selector */}
      <Chart />
    </div>
  );
}
