import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getStoredUser, getDashboardRoot } from "../router/ProtectedRoute";
import type { UserRole } from "../router/ProtectedRoute";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  
  const handleRedirect = () => {
    if (loggedIn) {
      const user = getStoredUser();
      const role = user?.role as UserRole;
      navigate(getDashboardRoot(role), { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      background: "var(--bg-secondary)",
      color: "var(--text-primary)",
      fontFamily: "'Inter', 'Outfit', sans-serif"
    }}>
      <h1 style={{ fontSize: "5rem", margin: 0, fontWeight: 800, color: "var(--primary)" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginTop: 0, marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "2rem", textAlign: "center", maxWidth: "400px" }}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <button 
        onClick={handleRedirect}
        className="btn-blue"
        style={{ padding: "12px 24px", fontSize: "1rem", borderRadius: "8px" }}
      >
        {loggedIn ? "Go to Dashboard" : "Go to Login"}
      </button>
    </div>
  );
};

export default NotFound;
