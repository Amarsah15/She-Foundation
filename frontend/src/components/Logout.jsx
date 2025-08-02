import React from "react";
import { useAuthStore } from "../stores/useAuthStore.js";

const Logout = ({ children }) => {
  const { logout } = useAuthStore();


  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        onLogout();
      }}
    >
      {children}
    </button>
  );
};

export default Logout;
