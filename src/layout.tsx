// components/Layout.tsx
import { Outlet } from "react-router-dom";
import { Menu } from "./components/menu";
import { useUser } from "./contexts/UserContext";

export const Layout = () => {
  const { user } = useUser();

  if (!user) {
    return <p style={{ padding: "20px" }}>Usuario no encontrado</p>;
  }

  return (
    <div style={{ paddingBottom: "80px" }}>
      <Outlet />
      <Menu profileImage={user.profile_image_url} />
    </div>
  );
};
