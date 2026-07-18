import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, Loader, Globe, Image, BookOpen, Eye, EyeOff, Clock, User } from "lucide-react";
import {
  saFetchBlogsApi,
  saCreateBlogApi,
  saUpdateBlogApi,
  saDeleteBlogApi,
  saUploadImageApi,
} from "../services/superAdminApis";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
}

const BLANK_BLOG = { title: "", content: "", imageUrl: "", author: "Super Admin", isPublished: true };

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_BLOG);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await saFetchBlogsApi();
      setBlogs(res.data || []);
    } catch {
      showToast("Failed to load Blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openAdd = () => {
    setForm(BLANK_BLOG);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (b: BlogItem) => {
    setForm({ 
      title: b.title, 
      content: b.content, 
      imageUrl: b.imageUrl || "", 
      author: b.author, 
      isPublished: b.isPublished 
    });
    setEditingId(b._id);
    setShowModal(true);
  };

  const saveBlog = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast("Title and content are required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await saUpdateBlogApi(editingId, form);
        showToast("Blog updated!");
      } else {
        await saCreateBlogApi(form);
        showToast("Blog created!");
      }
      setShowModal(false);
      loadBlogs();
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (b: BlogItem) => {
    if (!window.confirm(`Delete Blog "${b.title}"?`)) return;
    setDeletingId(b._id);
    try {
      await saDeleteBlogApi(b._id);
      showToast("Blog deleted");
      loadBlogs();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
          <div style={styles.pageTitle}><BookOpen size={20} color="#3b82f6" /> Blog Management</div>
          <div style={styles.pageSub}>Manage public blog posts for SEO and announcements</div>
        </div>
        <button style={styles.addBtn} onClick={openAdd}>
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {loading ? (
        <div style={styles.center}><Loader size={32} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} /></div>
      ) : blogs.length === 0 ? (
        <div style={styles.empty}>
          <Globe size={48} color="#cbd5e1" />
          <h3 style={{ margin: "12px 0 4px", color: "#64748b" }}>No Blogs Yet</h3>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Create your first blog post to get started.</p>
          <button style={styles.addBtn} onClick={openAdd}><Plus size={16} /> Create Blog</button>
        </div>
      ) : (
        <div style={styles.grid}>
          {blogs.map((b) => (
            <div key={b._id} style={styles.card}>
              {b.imageUrl ? (
                <div style={{ height: 160, width: "100%", backgroundImage: `url(${b.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
              ) : (
                <div style={{ height: 160, width: "100%", background: "linear-gradient(135deg, #e0e7ff, #ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <Image size={40} color="#818cf8" opacity={0.5} />
                </div>
              )}
              
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={styles.cardTitle}>{b.title}</div>
                  <span style={{ ...styles.statusBadge, background: b.isPublished ? "#dcfce7" : "#f1f5f9", color: b.isPublished ? "#16a34a" : "#64748b", flexShrink: 0 }}>
                    {b.isPublished ? <><Eye size={10} /> Published</> : <><EyeOff size={10} /> Draft</>}
                  </span>
                </div>
                
                <div style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {formatDate(b.createdAt)}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={12} /> {b.author}</span>
                </div>

                <div style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace", background: "#f8fafc", padding: "4px 8px", borderRadius: 4, width: "fit-content" }}>
                  /{b.slug}
                </div>

                <div style={{ flex: 1 }}></div>

                <div style={styles.cardActions}>
                  <button style={styles.iconBtn} title="Edit" onClick={() => openEdit(b)}>
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    style={{ ...styles.iconBtn, color: "#ef4444" }}
                    title="Delete"
                    onClick={() => deleteBlog(b)}
                    disabled={deletingId === b._id}
                  >
                    {deletingId === b._id ? <Loader size={15} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={15} />} Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={{ ...styles.modal, maxWidth: 650 }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingId ? "Edit Blog" : "New Blog"}</h3>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            
            <div style={{ overflowY: "auto", paddingBottom: 24 }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title *</label>
                <input style={styles.input} placeholder="E.g., 5 Ways to Grow Your Gym" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Cover Image (Optional)</label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    style={{ flex: 1, padding: "8px 12px", border: "1px dashed #cbd5e1", borderRadius: 10, background: "#f8fafc", cursor: "pointer", color: "#64748b" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        setUploadingImage(true);
                        const res = await saUploadImageApi(file);
                        setForm({ ...form, imageUrl: res.data.url });
                      } catch (error) {
                        showToast("Failed to upload image", "error");
                      } finally {
                        setUploadingImage(false);
                      }
                    }}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <Loader size={20} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} />}
                </div>
                {form.imageUrl && (
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={form.imageUrl} alt="Cover" style={{ height: 60, width: 100, borderRadius: 8, objectFit: "cover", border: "1px solid #e2e8f0" }} />
                    <button style={styles.iconBtn} onClick={() => setForm({ ...form, imageUrl: "" })} title="Remove Image">
                      <X size={14} /> Remove
                    </button>
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Author *</label>
                <input style={styles.input} placeholder="Author Name" value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Content * (Supports markdown/text)</label>
                <textarea style={{ ...styles.input, height: 250, resize: "vertical" }} placeholder="Write your blog post here..." value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>

              <div style={styles.formGroup}>
                <label style={{ ...styles.label, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 8 }}>
                  <input type="checkbox" checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    style={{ width: 16, height: 16 }} />
                  Publish immediately (visible to public)
                </label>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={saveBlog} disabled={saving}>
                {saving ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={16} />}
                {saving ? "Saving…" : "Save Blog"}
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
  page: { display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Inter', sans-serif", padding: "8px 0" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: 22, fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 10 },
  pageSub: { fontSize: 14, color: "#64748b", marginTop: 4 },
  addBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
  center: { display: "flex", justifyContent: "center", padding: 60 },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, gap: 8, background: "#fff", borderRadius: 16, border: "1px dashed #cbd5e1", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, display: "flex", flexDirection: "column", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "transform 0.2s, box-shadow 0.2s" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a", lineHeight: 1.4 },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 },
  cardActions: { display: "flex", alignItems: "center", gap: 16, marginTop: 12, paddingTop: 16, borderTop: "1px solid #f1f5f9" },
  iconBtn: { background: "none", border: "none", padding: 0, color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, transition: "color 0.2s" },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(4px)" },
  modal: { background: "#fff", borderRadius: 20, width: "100%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", maxHeight: "90vh" },
  modalHeader: { padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  modalTitle: { fontSize: 18, fontWeight: 800, color: "#0f172a", margin: 0 },
  closeBtn: { background: "#f1f5f9", border: "none", color: "#64748b", cursor: "pointer", display: "flex", padding: 6, borderRadius: "50%", transition: "background 0.2s" },
  formGroup: { display: "flex", flexDirection: "column", gap: 8, padding: "20px 24px 0" },
  label: { fontSize: 13, fontWeight: 600, color: "#475569" },
  input: { padding: "12px 16px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, color: "#0f172a", outline: "none", transition: "border-color 0.2s", background: "#f8fafc" },
  modalFooter: { padding: "20px 24px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: 12, background: "#f8fafc", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  cancelBtn: { padding: "10px 18px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#475569", cursor: "pointer", transition: "all 0.2s" },
  saveBtn: { padding: "10px 18px", background: "#3b82f6", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" },
  toast: { position: "fixed", bottom: 24, right: 24, color: "#fff", padding: "14px 24px", borderRadius: 12, display: "flex", alignItems: "center", gap: 12, fontSize: 15, fontWeight: 600, zIndex: 999, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" },
};

export default BlogManagement;

