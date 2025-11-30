// components/Layout.tsx
import { Outlet } from "react-router-dom";
import { Menu } from "./components/menu";
import { getUser, User } from "@/services/userService.service";
import { useEffect, useState } from "react";

export const Layout = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
      const userId: string = "692b9e2c0c45d7f4031812c4";
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

  return (
      <div style={{ paddingBottom: "80px" }}>
        <Outlet />
        <Menu profileImage={user.profile_image_url}/>
      </div>
  );
};
