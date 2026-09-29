import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getStoredUser, getDashboardRoot } from "../router/ProtectedRoute";
import type { UserRole } from "../router/ProtectedRoute";
import "./NotFound.css";
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const handleRedirect = () => {
    if (loggedIn) {
      const user = getStoredUser();
      const role = user?.role as UserRole;
      navigate(getDashboardRoot(role), {
        replace: true
      });
    } else {
      navigate("/login", {
        replace: true
      });
    }
  };
  return <div className="not-found-inline-1">
      <h1 className="not-found-inline-2">404</h1>
      <h2 className="not-found-inline-3">Page Not Found</h2>
      <p className="not-found-inline-4">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <button onClick={handleRedirect} className="btn-blue not-found-inline-5">
        {loggedIn ? "Go to Dashboard" : "Go to Login"}
      </button>
    </div>;
};
export default NotFound;