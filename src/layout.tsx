import { Outlet } from "react-router-dom";
import { Menu } from "./components/menu";
import { useUser } from "./contexts/UserContext";

// Main layout component that wraps all pages with navigation menu
export const Layout = () => {
  // Gets user data from context
  const { user } = useUser();

  // Shows message if no user data available
  if (!user) {
    return <p style={{ padding: "20px" }}>User not found</p>;
  }

  // Renders main container with route outlet and navigation menu
  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Outlet for rendering dynamic pages */}
      <Outlet />
      {/* Bottom navigation menu */}
      <Menu profileImage={user.profile_image_url} />
    </div>
  );
};
