import './FaqManagement.css';
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
    <div className="page">
      {toast && (
        <div className="toast" style={{background: toast.type === "success" ? "#16a34a" : "#dc2626" }}>
          {toast.type === "success" ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      <div className="header">
        <div>
          <div className="page-title"><MessageSquare size={20} color="#3b82f6" /> FAQ Management</div>
          <div className="page-sub">Manage questions & answers for the landing page</div>
        </div>
        <button className="add-btn" onClick={openAdd}>
          <Plus size={18} /> Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="center"><Loader size={32} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} /></div>
      ) : faqs.length === 0 ? (
        <div className="empty">
          <MessageSquare size={48} color="#cbd5e1" />
          <h3 style={{ margin: "12px 0 4px", color: "#64748b" }}>No FAQs Yet</h3>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Create your first FAQ to get started.</p>
          <button className="add-btn" onClick={openAdd}><Plus size={16} /> Add FAQ</button>
        </div>
      ) : (
        <div className="grid">
          {faqs.map((faq) => (
            <div key={faq._id} className="card">
              <div className="card-header">
                <div className="card-title">{faq.question}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="status-badge" style={{background: faq.isActive ? "#dcfce7" : "#f1f5f9", color: faq.isActive ? "#16a34a" : "#64748b" }}>
                    {faq.isActive ? <><Eye size={10} /> Active</> : <><EyeOff size={10} /> Hidden</>}
                  </span>
                </div>
              </div>
              <div className="card-body">{faq.answer}</div>
              <div className="card-actions">
                <button className="icon-btn" title="Edit" onClick={() => openEdit(faq)}>
                  <Pencil size={15} /> Edit
                </button>
                <button
                  className="icon-btn" style={{color: "#ef4444" }}
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
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingId ? "Edit FAQ" : "New FAQ"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>

            <div className="form-group">
              <label className="label">Question *</label>
              <input className="input" placeholder="e.g. How do I setup Trainix?" value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="label">Answer *</label>
              <textarea className="input" style={{height: 120, resize: "vertical" }} placeholder="Provide a detailed answer..." value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="label" style={{display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  style={{ width: 16, height: 16 }} />
                Active (visible on landing page)
              </label>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={saveFaq} disabled={saving}>
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



export default FaqManagement;
