import { NavLink } from "react-router-dom";

export function Menu() {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <NavLink
        to="/home"
        style={({ isActive }) => ({
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "12px",
          color: isActive ? "#007bff" : "#555",
        })}
      >
        <span>🏠</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/messages"
        style={({ isActive }) => ({
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "12px",
          color: isActive ? "#007bff" : "#555",
        })}
      >
        <span>📨</span>
        <span>Mensajes</span>
      </NavLink>

      <NavLink
        to="/bills"
        style={({ isActive }) => ({
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "12px",
          color: isActive ? "#007bff" : "#555",
        })}
      >
        <span>💳</span>
        <span>Facturas</span>
      </NavLink>

      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "12px",
          color: isActive ? "#007bff" : "#555",
        })}
      >
        <span>👤</span>
        <span>Perfil</span>
      </NavLink>
    </nav>
  );
}
