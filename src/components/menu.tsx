import { NavLink } from "react-router-dom";
import "./menu.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface WelcomeProps {
  profileImage: string;
}

export function Menu({ profileImage }: WelcomeProps) {
  return (
    <div className="menu-container">
      <nav className="menu-bar">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            "menu-link" + (isActive ? " menu-link--active" : "")
          }
        >
          <div className="menu-item">
            <i className="fi fi-tr-house-blank" />
            <span>Inicio</span>
            <span className="menu-dot" />
          </div>
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            "menu-link" + (isActive ? " menu-link--active" : "")
          }
        >
          <div className="menu-item">
            <i className="fi fi-tr-envelope" />
            <span>Alertas</span>
            <span className="menu-dot" />
          </div>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            "menu-link" + (isActive ? " menu-link--active" : "")
          }
        >
          <div className="menu-item">
            <Avatar>
              <AvatarImage src={profileImage} className="object-cover" />
            </Avatar>
            <span>Perfil</span>
            <span className="menu-dot" />
          </div>
        </NavLink>
      </nav>
    </div>
  );
}
