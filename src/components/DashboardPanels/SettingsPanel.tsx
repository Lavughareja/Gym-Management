import React, { useEffect, useState } from "react";
import { Plus, X, Laptop, ShieldCheck, Wifi, MapPin, Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchDevicesAction, addDeviceAction, deleteDeviceAction } from "../../redux/actions/deviceActions";

interface Props {
  gymName: string;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const SettingsPanel: React.FC<Props> = ({ gymName }) => {
  const dispatch = useAppDispatch();
  const { devices, loading } = useAppSelector((state) => state.device);

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: "", serialNumber: "", ipAddress: "", provider: "Essl" });
  const [addingDevice, setAddingDevice] = useState(false);

  useEffect(() => {
    dispatch(fetchDevicesAction());
  }, [dispatch]);

  const handleAddDevice = async () => {
    if (!newDevice.name || !newDevice.serialNumber || !newDevice.ipAddress) return;
    setAddingDevice(true);
    const success = await dispatch(addDeviceAction(newDevice));
    setAddingDevice(false);
    if (success) {
      setShowAddDevice(false);
      setNewDevice({ name: "", serialNumber: "", ipAddress: "", provider: "Essl" });
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 className="page-title">Gym Settings</h2>
          <p className="page-subtitle">Manage devices and configurations for {gymName}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="gym-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Biometric Devices</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>Connected hardware for attendance</p>
            </div>
            <button className="btn-blue-outline" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => setShowAddDevice(true)}>
              <Plus size={14} /> Add Device
            </button>
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}><Loader size={24} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
          ) : devices.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 20px", border: "1px dashed var(--border-color)", borderRadius: 8 }}>
              <Laptop size={32} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 12 }}>No devices configured</p>
              <button className="btn-blue" style={{ margin: "0 auto", padding: "6px 16px", fontSize: "0.8rem" }} onClick={() => setShowAddDevice(true)}>Configure Now</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {devices.map((device: any) => (
                <div key={device._id || device.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Laptop size={20} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{device.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{device.provider} · SN: {device.serialNumber}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className={`checkin-status ${device.status === "Online" ? "status-active" : "status-inactive"}`}>{device.status || "Offline"}</span>
                    <button className="btn-blue-outline" style={{ fontSize: "0.75rem", padding: "4px 8px", borderColor: "#ef4444", color: "#ef4444" }}
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to remove ${device.name}?`)) {
                          dispatch(deleteDeviceAction(device._id || device.id));
                        }
                      }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="gym-card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Preferences</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: ShieldCheck, title: "Access Control", desc: "Require biometric scan for gym entry", active: true },
              { icon: Wifi, title: "Offline Sync", desc: "Sync attendance when device reconnects", active: true },
              { icon: MapPin, title: "Location Tracking", desc: "Log branch location for staff check-ins", active: false }
            ].map((setting, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <setting.icon size={18} style={{ color: "var(--text-muted)", marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{setting.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>{setting.desc}</div>
                  </div>
                </div>
                <label className="switch" style={{ transform: "scale(0.8)", margin: 0 }}>
                  <input type="checkbox" defaultChecked={setting.active} />
                  <span className="slider" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddDevice && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add Biometric Device</h3>
              <button onClick={() => setShowAddDevice(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="form-label">Device Name</label>
                <input type="text" value={newDevice.name} onChange={e => setNewDevice({ ...newDevice, name: e.target.value })} placeholder="e.g. Main Entrance" className="form-input" />
              </div>
              <div>
                <label className="form-label">Provider</label>
                <select value={newDevice.provider} onChange={e => setNewDevice({ ...newDevice, provider: e.target.value })} className="form-input">
                  <option value="Essl">eSSL</option>
                  <option value="Realtime">Realtime</option>
                  <option value="ZKTeco">ZKTeco</option>
                </select>
              </div>
              <div>
                <label className="form-label">Serial Number</label>
                <input type="text" value={newDevice.serialNumber} onChange={e => setNewDevice({ ...newDevice, serialNumber: e.target.value })} placeholder="e.g. ESSL-12345" className="form-input" />
              </div>
              <div>
                <label className="form-label">IP Address</label>
                <input type="text" value={newDevice.ipAddress} onChange={e => setNewDevice({ ...newDevice, ipAddress: e.target.value })} placeholder="192.168.1.100" className="form-input" />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-blue" style={{ flex: 1, justifyContent: "center" }}
                  disabled={addingDevice}
                  onClick={handleAddDevice}>
                  {addingDevice ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Save Device"}
                </button>
                <button className="btn-blue-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowAddDevice(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
