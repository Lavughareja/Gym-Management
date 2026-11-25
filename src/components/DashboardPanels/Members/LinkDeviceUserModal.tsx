import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { fetchDevicesAction } from "../../../redux/actions/deviceActions";
import { updateMemberDeviceUserAction } from "../../../redux/actions/memberActions";

interface Props {
  member: any;
  onClose: () => void;
  onUpdated?: (result: any) => void;
}

export const LinkDeviceUserModal: React.FC<Props> = ({ member, onClose, onUpdated }) => {
  const dispatch = useAppDispatch();
  const { devices } = useAppSelector((state) => state.device);

  const [deviceUserId, setDeviceUserId] = useState(
    member?.deviceUserId !== undefined && member?.deviceUserId !== null
      ? String(member.deviceUserId)
      : ""
  );
  const [biometricDeviceId, setBiometricDeviceId] = useState(
    member?.biometricDeviceId?._id || member?.biometricDeviceId || ""
  );
  const [pushToDevice, setPushToDevice] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!devices || devices.length === 0) {
      dispatch(fetchDevicesAction());
    }
  }, [dispatch, devices?.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!deviceUserId.trim()) {
      setError("Device User ID is required.");
      return;
    }

    const memberId = member?._id || member?.id;
    if (!memberId) return;

    setSaving(true);
    const payload: { deviceUserId: number; biometricDeviceId?: string; pushToDevice: boolean } = {
      deviceUserId: Number(deviceUserId),
      pushToDevice,
    };
    if (biometricDeviceId) {
      payload.biometricDeviceId = biometricDeviceId;
    }

    const res = await dispatch(updateMemberDeviceUserAction(memberId, payload));
    setSaving(false);

    if (res) {
      setResult(res);
      if (onUpdated) onUpdated(res);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 10050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "100%",
          maxWidth: 440,
          padding: 24,
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
              Link Machine User ID
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
              {member?.fullName || member?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        {result ? (
          <div>
            <div
              style={{
                padding: 14,
                borderRadius: 10,
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{result.message || "Machine User ID updated"}</div>
              <div>Device User ID: <strong>{result.member?.deviceUserId}</strong></div>
              {result.machineSync && (
                <div style={{ marginTop: 4 }}>
                  Machine Sync: <strong>{typeof result.machineSync === "string" ? result.machineSync : result.machineSync.status || (result.machineSync.success ? "Synced" : "Failed")}</strong>
                  {result.machineSync.message ? ` — ${result.machineSync.message}` : ""}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                Device User ID
              </label>
              <input
                type="number"
                min="1"
                value={deviceUserId}
                onChange={(e) => setDeviceUserId(e.target.value)}
                placeholder="e.g. 101"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                Biometric Device (Optional)
              </label>
              <select
                value={biometricDeviceId}
                onChange={(e) => setBiometricDeviceId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 14,
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option value="">-- Default / Auto --</option>
                {devices.map((d: any) => (
                  <option key={d._id || d.id} value={d._id || d.id}>
                    {d.name} ({d.provider} - {d.serialNumber})
                  </option>
                ))}
              </select>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#334155", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={pushToDevice}
                onChange={(e) => setPushToDevice(e.target.checked)}
              />
              Push user to biometric machine immediately
            </label>

            {error && (
              <div style={{ padding: "8px 12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, color: "#dc2626", fontSize: 13 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: saving ? "#93c5fd" : "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {saving && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
                {saving ? "Saving..." : "Save & Link"}
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  background: "#fff",
                  color: "#475569",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
