import './BlogManagement.css';
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
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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
          <div className="page-title"><BookOpen size={20} color="#3b82f6" /> Blog Management</div>
          <div className="page-sub">Manage public blog posts for SEO and announcements</div>
        </div>
        <button className="add-btn" onClick={openAdd}>
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {loading ? (
        <div className="center"><Loader size={32} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} /></div>
      ) : blogs.length === 0 ? (
        <div className="empty">
          <Globe size={48} color="#cbd5e1" />
          <h3 style={{ margin: "12px 0 4px", color: "#64748b" }}>No Blogs Yet</h3>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Create your first blog post to get started.</p>
          <button className="add-btn" onClick={openAdd}><Plus size={16} /> Create Blog</button>
        </div>
      ) : (
        <div className="grid">
          {blogs.map((b) => (
            <div key={b._id} className="card">
              {b.imageUrl ? (
                <div style={{ height: 160, width: "100%", backgroundImage: `url(${b.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
              ) : (
                <div style={{ height: 160, width: "100%", background: "linear-gradient(135deg, #e0e7ff, #ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <Image size={40} color="#818cf8" opacity={0.5} />
                </div>
              )}
              
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div className="card-title">{b.title}</div>
                  <span className="status-badge" style={{background: b.isPublished ? "#dcfce7" : "#f1f5f9", color: b.isPublished ? "#16a34a" : "#64748b", flexShrink: 0 }}>
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

                <div className="card-actions">
                  <button className="icon-btn" title="Edit" onClick={() => openEdit(b)}>
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    className="icon-btn" style={{color: "#ef4444" }}
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
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{maxWidth: 650 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingId ? "Edit Blog" : "New Blog"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            
            <div style={{ overflowY: "auto", paddingBottom: 24 }}>
              <div className="form-group">
                <label className="label">Title *</label>
                <input className="input" placeholder="E.g., 5 Ways to Grow Your Gym" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              
              <div className="form-group">
                <label className="label">Cover Image (Optional)</label>
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
                    <button className="icon-btn" onClick={() => setForm({ ...form, imageUrl: "" })} title="Remove Image">
                      <X size={14} /> Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="label">Author *</label>
                <input className="input" placeholder="Author Name" value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
              
              <div className="form-group">
                <label className="label">Content * (Supports markdown/text)</label>
                <textarea className="input" style={{height: 250, resize: "vertical" }} placeholder="Write your blog post here..." value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="label" style={{display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 8 }}>
                  <input type="checkbox" checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    style={{ width: 16, height: 16 }} />
                  Publish immediately (visible to public)
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={saveBlog} disabled={saving}>
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



export default BlogManagement;

