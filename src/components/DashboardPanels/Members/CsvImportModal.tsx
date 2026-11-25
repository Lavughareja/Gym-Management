import React, { useState } from "react";
import { X, Upload, FileSpreadsheet, Loader2 } from "lucide-react";
import { useAppDispatch } from "../../../utils/reduxHooks";
import { bulkImportMembersAction } from "../../../redux/actions/memberActions";

interface Props {
  onClose: () => void;
}

export const CsvImportModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    setError("");
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await dispatch(bulkImportMembersAction(formData));
    setLoading(false);

    if (res) {
      setResult(typeof res === "object" ? res : { message: "Members imported successfully." });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
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
          borderRadius: 18,
          width: "100%",
          maxWidth: 540,
          padding: 28,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FileSpreadsheet size={22} color="#4f46e5" />
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#0f172a" }}>Import Members from CSV</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 14,
            marginBottom: 18,
            fontSize: 13,
            color: "#334155",
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>CSV Column Instructions</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              Standard columns: <code>fullName</code>, <code>email</code>, <code>mobileNo</code>, <code>dateOfBirth</code>, <code>bloodGroup</code>
            </li>
            <li>
              Biometric / Machine ID: include a <code>deviceUserId</code> column (or <code>User ID</code>, <code>PIN</code>, <code>EnrollNumber</code>, <code>AC-No.</code>) to link existing machine users directly.
            </li>
            <li>
              Migration fields: include <code>planEndDate</code> and <code>amountPaid</code> if migrating from another software or a biometric pendrive export.
            </li>
          </ul>
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
              <div style={{ fontWeight: 700 }}>{result.message || "Import completed"}</div>
              {typeof result.importedCount === "number" && (
                <div style={{ marginTop: 4 }}>Imported: <strong>{result.importedCount}</strong></div>
              )}
              {typeof result.skippedCount === "number" && (
                <div>Skipped: <strong>{result.skippedCount}</strong></div>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "11px 0",
                background: "#4f46e5",
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
          <>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "28px 16px",
                border: "2px dashed #cbd5e1",
                borderRadius: 12,
                cursor: "pointer",
                background: file ? "#eff6ff" : "#fff",
                marginBottom: 14,
              }}
            >
              <Upload size={24} color="#4f46e5" />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
                {file ? file.name : "Click to choose a .csv file"}
              </span>
              <span style={{ fontSize: 12, color: "#64748b" }}>CSV files only (.csv)</span>
              <input
                type="file"
                accept=".csv,text/csv"
                style={{ display: "none" }}
                onChange={(e) => {
                  setError("");
                  setFile(e.target.files?.[0] || null);
                }}
              />
            </label>

            {error && (
              <div style={{ marginBottom: 14, padding: "10px 12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, color: "#dc2626", fontSize: 13 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleImport}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "11px 0",
                  background: loading ? "#93c5fd" : "#4f46e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {loading && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
                {loading ? "Importing..." : "Upload & Import"}
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "11px 0",
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
          </>
        )}
      </div>
    </div>
  );
};
