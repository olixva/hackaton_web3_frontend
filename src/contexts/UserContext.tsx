import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, User } from "@/services/userService.service";
import { Constants } from "@/constants";

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const userId = Constants.userId;

  useEffect(() => {
    getUser(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (videoEnded && !loading) {
      // Pequeño delay para la transición
      setTimeout(() => setShowContent(true), 300);
    }
  }, [videoEnded, loading]);

  if (!videoEnded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={() => setVideoEnded(true)}
        >
          <source src="/lumia_animacion_2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    );
  }

  if (!showContent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-out">
        {/* Espacio vacío mientras se prepara la transición */}
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
