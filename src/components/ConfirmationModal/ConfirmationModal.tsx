import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0, 0, 0, 0.5)", zIndex: 9999, display: "flex",
        alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)"
      }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
          background: "var(--bg-primary)", padding: "24px", borderRadius: "12px",
          width: "90%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          position: "relative"
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "16px", right: "16px", background: "none",
              border: "none", color: "var(--text-muted)", cursor: "pointer",
              padding: "4px", display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <X size={20} />
          </button>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: isDestructive ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
              color: isDestructive ? "var(--danger)" : "#10b981",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <AlertTriangle size={24} />
            </div>
            
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
                {title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                {message}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)",
                background: "transparent", color: "var(--text-primary)", fontWeight: 600, cursor: "pointer"
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px", border: "none",
                background: isDestructive ? "var(--danger)" : "var(--primary)",
                color: "#fff", fontWeight: 600, cursor: "pointer"
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
