import React, { useState } from "react";
import { User, KeyRound, X, Mail, Shield, Lock, Eye, EyeOff, Loader, Camera, Save } from "lucide-react";
import { changePasswordApi } from "../../services/apis/authApis";
import { AxiosInstance } from "../../axios/axiosInstance";

interface Props {
  user: {
    id?: string;
    fullName: string;
    firstName?: string;
    lastName?: string;
    email: string;
    role: string;
    profilePicture?: string;
  };
  onClose: () => void;
  onSuccess?: (updatedUser?: any) => void;
}

const UserProfileModal: React.FC<Props> = ({ user, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);

  // Profile State
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || "");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(user.profilePicture || "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirm password do not match.");
      return;
    }
    if (oldPassword === newPassword) {
      setPassError("New password cannot be the same as the old password.");
      return;
    }
    if (newPassword.length < 8) {
      setPassError("New password must be at least 8 characters.");
      return;
    }

    setPassLoading(true);
    try {
      await changePasswordApi(oldPassword, newPassword, confirmPassword);
      setPassSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setPassError(err.message || "Failed to change password. Please check your old password.");
    } finally {
      setPassLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      if (profileFile) {
        formData.append("profilePicture", profileFile);
      }

      const res = await AxiosInstance.put('/auth/profile', formData, {
        timeout: 60000, // 60 seconds to allow large image uploads
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setProfileSuccess(true);
      if (onSuccess) {
        onSuccess(res.data.user);
      }
      setTimeout(() => {
        setProfileSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      setProfileError(err.response?.data?.message || err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const inputField = (label: string, value: string, setter: (val: string) => void, showObj?: boolean, setShowObj?: (val: boolean) => void) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
          <Lock size={18} />
        </div>
        <input
          type={showObj ? "text" : "password"}
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          style={{
            width: "100%", padding: "12px 12px 12px 40px",
            border: "1px solid var(--border-color)", borderRadius: 8,
            fontSize: "0.95rem", outline: "none", background: "var(--bg-primary)", color: "var(--text-primary)"
          }}
          required
        />
        {setShowObj && (
          <button
            type="button"
            onClick={() => setShowObj(!showObj)}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
          >
            {showObj ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

  const getInitials = () => {
    if (firstName) return firstName.slice(0, 2).toUpperCase();
    if (user.fullName) return user.fullName.slice(0, 2).toUpperCase();
    return "U";
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "var(--bg-primary)", width: "100%", maxWidth: 800,
        borderRadius: 16, display: "flex", overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        minHeight: 500
      }}>
        {/* Left Sidebar */}
        <div style={{ width: 240, background: "var(--bg-secondary)", borderRight: "1px solid var(--border-color)", padding: "24px 16px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 24, paddingLeft: 8 }}>Settings</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              onClick={() => setActiveTab("profile")}
              style={{
                background: activeTab === "profile" ? "var(--primary-light)" : "none",
                border: "none", cursor: "pointer", padding: "12px 16px",
                fontWeight: 600, fontSize: "0.95rem", borderRadius: 8,
                color: activeTab === "profile" ? "var(--primary)" : "var(--text-secondary)",
                display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                transition: "all 0.2s"
              }}
            >
              <User size={18} /> User Details
            </button>
            <button
              onClick={() => setActiveTab("password")}
              style={{
                background: activeTab === "password" ? "var(--primary-light)" : "none",
                border: "none", cursor: "pointer", padding: "12px 16px",
                fontWeight: 600, fontSize: "0.95rem", borderRadius: 8,
                color: activeTab === "password" ? "var(--primary)" : "var(--text-secondary)",
                display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                transition: "all 0.2s"
              }}
            >
              <KeyRound size={18} /> Change Password
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, padding: "32px", position: "relative", display: "flex", flexDirection: "column", overflowY: "auto", maxHeight: "80vh" }}>
          <div 
            onClick={onClose} 
            style={{ 
              position: "absolute", top: 16, right: 16, 
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-secondary)", 
              borderRadius: "50%", background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--border-color)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bg-secondary)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <X size={18} strokeWidth={2.5} />
          </div>
          
          <h4 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 24, marginTop: 0 }}>
            {activeTab === "profile" ? "User Information" : "Security"}
          </h4>

          {activeTab === "profile" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                <div style={{ 
                  width: 80, height: 80, borderRadius: "50%", 
                  background: profilePreview ? "transparent" : "linear-gradient(135deg, var(--primary), var(--primary-hover))", 
                  color: "white", display: "flex", alignItems: "center", justifyContent: "center", 
                  fontSize: "2rem", fontWeight: 700, position: "relative", overflow: "hidden" 
                }}>
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    getInitials()
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{firstName && lastName ? `${firstName} ${lastName}` : user.fullName}</h4>
                  <span style={{ fontSize: "0.85rem", color: "var(--primary)", background: "var(--primary-light)", padding: "4px 8px", borderRadius: 12, display: "inline-block", marginTop: 4, fontWeight: 600 }}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                {profileError && (
                  <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 20, color: "#dc2626", fontSize: "0.85rem" }}>
                    {profileError}
                  </div>
                )}
                
                {profileSuccess && (
                  <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", marginBottom: 20, color: "#16a34a", fontSize: "0.85rem" }}>
                    Profile updated successfully!
                  </div>
                )}

                <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                  
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        style={{
                          width: "100%", padding: "12px", border: "1px solid var(--border-color)", borderRadius: 8,
                          fontSize: "0.95rem", outline: "none", background: "var(--bg-primary)", color: "var(--text-primary)"
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        style={{
                          width: "100%", padding: "12px", border: "1px solid var(--border-color)", borderRadius: 8,
                          fontSize: "0.95rem", outline: "none", background: "var(--bg-primary)", color: "var(--text-primary)"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      style={{
                        width: "100%", padding: "12px", border: "1px solid var(--border-color)", borderRadius: 8,
                        fontSize: "0.95rem", outline: "none", background: "var(--bg-primary)", color: "var(--text-primary)"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Profile Picture</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                          flex: 1, padding: "10px", border: "1px solid var(--border-color)", borderRadius: 8,
                          fontSize: "0.95rem", outline: "none", background: "var(--bg-primary)", color: "var(--text-primary)"
                        }}
                      />
                      {profileFile && (
                        <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{profileFile.name}</span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    <button type="submit" className="btn-blue" style={{ flex: 1, justifyContent: "center", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }} disabled={profileLoading}>
                      {profileLoading ? <><Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : <><Save size={16} /> Save Changes</>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {passSuccess ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <span style={{ fontSize: "1.5rem", color: "#16a34a" }}>✓</span>
                  </div>
                  <p style={{ fontWeight: 600, color: "#16a34a", fontSize: "1.1rem" }}>Password changed successfully!</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 8 }}>You can now use your new password to sign in.</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordSubmit}>
                  {passError && (
                    <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 20, color: "#dc2626", fontSize: "0.85rem" }}>
                      {passError}
                    </div>
                  )}

                  {inputField("Old Password", oldPassword, setOldPassword, showOld, setShowOld)}
                  {inputField("New Password", newPassword, setNewPassword, showNew, setShowNew)}
                  {inputField("Confirm New Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

                  <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button type="submit" className="btn-blue" style={{ flex: 1, justifyContent: "center", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }} disabled={passLoading}>
                      {passLoading ? <><Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> Updating...</> : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
