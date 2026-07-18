import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, Loader, MessageSquare, Eye, EyeOff } from "lucide-react";
import {
  saFetchFaqsApi,
  saCreateFaqApi,
  saUpdateFaqApi,
  saDeleteFaqApi,
} from "../services/superAdminApis";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdAt: string;
}

const BLANK_FAQ = { question: "", answer: "", isActive: true };

const FaqManagement: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_FAQ);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const res = await saFetchFaqsApi();
      setFaqs(res.data.faqs || []);
    } catch {
      showToast("Failed to load FAQs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const openAdd = () => {
    setForm(BLANK_FAQ);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (f: FaqItem) => {
    setForm({ question: f.question, answer: f.answer, isActive: f.isActive });
    setEditingId(f._id);
    setShowModal(true);
  };

  const saveFaq = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      showToast("Question and answer are required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await saUpdateFaqApi(editingId, form);
        showToast("FAQ updated!");
      } else {
        await saCreateFaqApi(form);
        showToast("FAQ created!");
      }
      setShowModal(false);
      loadFaqs();
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const deleteFaq = async (f: FaqItem) => {
    if (!confirm(`Delete FAQ "${f.question}"?`)) return;
    setDeletingId(f._id);
    try {
      await saDeleteFaqApi(f._id);
      showToast("FAQ deleted");
      loadFaqs();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={styles.page}>
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === "success" ? "#16a34a" : "#dc2626" }}>
          {toast.type === "success" ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      <div style={styles.header}>
        <div>
          <div style={styles.pageTitle}><MessageSquare size={20} color="#3b82f6" /> FAQ Management</div>
          <div style={styles.pageSub}>Manage questions & answers for the landing page</div>
        </div>
        <button style={styles.addBtn} onClick={openAdd}>
          <Plus size={18} /> Add FAQ
        </button>
      </div>

      {loading ? (
        <div style={styles.center}><Loader size={32} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} /></div>
      ) : faqs.length === 0 ? (
        <div style={styles.empty}>
          <MessageSquare size={48} color="#cbd5e1" />
          <h3 style={{ margin: "12px 0 4px", color: "#64748b" }}>No FAQs Yet</h3>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Create your first FAQ to get started.</p>
          <button style={styles.addBtn} onClick={openAdd}><Plus size={16} /> Add FAQ</button>
        </div>
      ) : (
        <div style={styles.grid}>
          {faqs.map((faq) => (
            <div key={faq._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>{faq.question}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ ...styles.statusBadge, background: faq.isActive ? "#dcfce7" : "#f1f5f9", color: faq.isActive ? "#16a34a" : "#64748b" }}>
                    {faq.isActive ? <><Eye size={10} /> Active</> : <><EyeOff size={10} /> Hidden</>}
                  </span>
                </div>
              </div>
              <div style={styles.cardBody}>{faq.answer}</div>
              <div style={styles.cardActions}>
                <button style={styles.iconBtn} title="Edit" onClick={() => openEdit(faq)}>
                  <Pencil size={15} /> Edit
                </button>
                <button
                  style={{ ...styles.iconBtn, color: "#ef4444" }}
                  title="Delete"
                  onClick={() => deleteFaq(faq)}
                  disabled={deletingId === faq._id}
                >
                  {deletingId === faq._id ? <Loader size={15} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={15} />} Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingId ? "Edit FAQ" : "New FAQ"}</h3>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Question *</label>
              <input style={styles.input} placeholder="e.g. How do I setup Trainix?" value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Answer *</label>
              <textarea style={{ ...styles.input, height: 120, resize: "vertical" }} placeholder="Provide a detailed answer..." value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>

            <div style={styles.formGroup}>
              <label style={{ ...styles.label, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  style={{ width: 16, height: 16 }} />
                Active (visible on landing page)
              </label>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={saveFaq} disabled={saving}>
                {saving ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={16} />}
                {saving ? "Saving…" : "Save FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Inter', sans-serif" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: 20, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 },
  pageSub: { fontSize: 13, color: "#64748b", marginTop: 2 },
  addBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  center: { display: "flex", justifyContent: "center", padding: 60 },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, gap: 8, background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 16 },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  cardTitle: { fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 },
  cardBody: { fontSize: 14, color: "#475569", lineHeight: 1.5, flex: 1 },
  cardActions: { display: "flex", alignItems: "center", gap: 12, marginTop: 8, paddingTop: 16, borderTop: "1px solid #f1f5f9" },
  iconBtn: { background: "none", border: "none", padding: 0, color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500 },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  modal: { background: "#fff", borderRadius: 20, width: "100%", maxWidth: 500, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" },
  modalHeader: { padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  modalTitle: { fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0 },
  closeBtn: { background: "transparent", border: "none", color: "#64748b", cursor: "pointer", display: "flex", padding: 4 },
  formGroup: { display: "flex", flexDirection: "column", gap: 6, padding: "16px 24px 0" },
  label: { fontSize: 13, fontWeight: 600, color: "#475569" },
  input: { padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, color: "#0f172a", outline: "none" },
  modalFooter: { padding: "20px 24px", borderTop: "1px solid #e2e8f0", marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 12 },
  cancelBtn: { padding: "10px 16px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#475569", cursor: "pointer" },
  saveBtn: { padding: "10px 16px", background: "#3b82f6", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 },
  toast: { position: "fixed", bottom: 24, right: 24, color: "#fff", padding: "12px 20px", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
};

export default FaqManagement;
