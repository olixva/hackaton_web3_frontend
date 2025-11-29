// components/Layout.tsx
import { Outlet } from "react-router-dom";
import { Menu } from "./components/menu";

export const Layout = () => {
  return (
      <div style={{ paddingBottom: "80px" }}>
        <Outlet />
        <Menu />
      </div>
  );
};
