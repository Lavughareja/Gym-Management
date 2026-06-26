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
    <div style={styles.root}>
      <div style={styles.card}>
        {/* Header with Logo */}
        <div style={styles.header}>
          <img src="/logo.png" alt="TraininX Logo" style={styles.logo} />
          <h1 style={styles.title}>
            Trainin<span style={{ color: "#3b82f6" }}>X</span>
          </h1>
          <p style={styles.subtitle}>Super Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form} autoComplete="off">
          <div style={styles.field}>
            <label htmlFor="sa-username" style={styles.label}>
              Email / Username
            </label>
            <input
              id="sa-username"
              type="text"
              style={styles.input}
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="sa-password" style={styles.label}>
              Password
            </label>
            <input
              id="sa-password"
              type="password"
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <button
            id="sa-login-btn"
            type="submit"
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
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

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc", // Very light modern gray-blue
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logo: {
    width: "72px",
    height: "auto",
    display: "block",
    margin: "0 auto 16px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 4px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#64748b",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "20px" 
  },
  field: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "8px" 
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
  },
  input: {
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    color: "#0f172a",
    fontSize: "15px",
    padding: "12px 14px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "'Inter', sans-serif",
  },
  errorBox: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    color: "#ef4444",
    fontSize: "14px",
    padding: "12px",
    textAlign: "center",
    fontWeight: 500,
  },
  submitBtn: {
    background: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    padding: "14px",
    cursor: "pointer",
    marginTop: "8px",
    transition: "background 0.2s, transform 0.1s",
    boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.2)",
  },
};

export default SuperAdminLogin;
