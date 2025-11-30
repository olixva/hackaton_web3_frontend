import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, User } from "@/services/userService.service";
import { Constants } from "@/constants";

// Interface defining the user context structure
interface UserContextType {
  user: User | null;
  loading: boolean;
}

// Creates user context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context provider that manages user data and loading/video states
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State variables for user data, loading status, and video transition
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Gets user ID from constants
  const userId = Constants.userId;

  // Fetches user data on component mount
  useEffect(() => {
    getUser(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  // Shows content after video ends and data loads
  useEffect(() => {
    if (videoEnded && !loading) {
      // Small delay for smooth transition
      setTimeout(() => setShowContent(true), 300);
    }
  }, [videoEnded, loading]);

  // Shows animation video while not finished
  if (!videoEnded) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
        {/* Animation video that plays on load */}
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={() => setVideoEnded(true)}
        >
          <source src="/lumia_animacion_2.mp4" type="video/mp4" />
          Your browser does not support the video element.
        </video>
      </div>
    );
  }

  // Transition screen while preparing content
  if (!showContent) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black animate-fade-out">
        {/* Empty space during smooth transition */}
      </div>
    );
  }

  // Renders main content with available user context
  return (
    <div
      className={`transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Context provider that passes user and loading state to children */}
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

// Custom hook to access user context
export const useUser = () => {
  const context = useContext(UserContext);
  // Validates that hook is used within provider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
