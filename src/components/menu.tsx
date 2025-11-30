import { NavLink } from "react-router-dom";
import "./menu.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Interface for component props
interface WelcomeProps {
  profileImage: string;
}

// Navigation menu component with links to main pages
export function Menu({ profileImage }: WelcomeProps) {
  return (
    // Main menu container
    <div className="menu-container">
      {/* Navigation bar with active links */}
      <nav className="menu-bar">
        {/* Link to home page */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            "menu-link" + (isActive ? " menu-link--active" : "")
          }
        >
          <div className="menu-item">
            {/* Home page icon */}
            <i className="fi fi-tr-house-blank" />
            {/* Link label */}
            <span>Home</span>
            {/* Visual indicator of active state */}
            <span className="menu-dot" />
          </div>
        </NavLink>

        {/* Link to alerts page */}
        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            "menu-link" + (isActive ? " menu-link--active" : "")
          }
        >
          <div className="menu-item">
            {/* Alerts envelope icon */}
            <i className="fi fi-tr-envelope" />
            {/* Link label */}
            <span>Alerts</span>
            {/* Visual indicator of active state */}
            <span className="menu-dot" />
          </div>
        </NavLink>

        {/* Link to profile page */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            "menu-link" + (isActive ? " menu-link--active" : "")
          }
        >
          <div className="menu-item">
            {/* User profile avatar */}
            <Avatar>
              <AvatarImage src={profileImage} className="object-cover" />
            </Avatar>
            {/* Link label */}
            <span>Profile</span>
            {/* Visual indicator of active state */}
            <span className="menu-dot" />
          </div>
        </NavLink>
      </nav>
    </div>
  );
}
