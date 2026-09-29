import './SuperAdminLogin.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { superAdminLoginAction } from "../redux/actions/superAdminActions";
import { setSaAuthenticated } from "../redux/slices/superAdminSlice";

const SuperAdminLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await dispatch(
        superAdminLoginAction({ email: username, password })
      ).unwrap();
      
      if (result?.token) {
        dispatch(setSaAuthenticated(true));
      }
    } catch (err: any) {
      setError(
        typeof err === "string"
          ? err
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <div className="card">
        {/* Header with Logo */}
        <div className="header">
          <img src="/logo.png" alt="TraininX Logo" className="logo" />
          <h1 className="title">
            Trainin<span style={{ color: "#3b82f6" }}>X</span>
          </h1>
          <p className="subtitle">Super Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="form" autoComplete="off">
          <div className="field">
            <label htmlFor="sa-username" className="label">
              Email / Username
            </label>
            <input
              id="sa-username"
              type="text"
              className="input"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="sa-password" className="label">
              Password
            </label>
            <input
              id="sa-password"
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            id="sa-login-btn"
            type="submit"
            className="submit-btn" style={{opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
};



export default SuperAdminLogin;
