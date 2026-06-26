import React, { useState, useEffect, useRef } from "react";
import {
  Plus, Pencil, Trash2, BookOpen, Video, X, Check, Loader,
  ChevronLeft, Eye, EyeOff, Dumbbell, Clock, Upload, ImageIcon, Film
} from "lucide-react";
import {
  saFetchCategoriesApi,
  saCreateCategoryApi,
  saUpdateCategoryApi,
  saDeleteCategoryApi,
  saFetchVideosApi,
  saCreateVideoApi,
  saUpdateVideoApi,
  saDeleteVideoApi,
  saUploadImageApi,
  saUploadVideoApi,
} from "../services/superAdminApis";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Category {
  _id: string;
  name: string;
  coverImage: string;
  description: string;
  isPublished: boolean;
  videoCount: number;
  createdAt: string;
}

interface VideoItem {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  bodyPart: string;
  musclesTargeted: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  durationSecs: number;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blank form state
// ─────────────────────────────────────────────────────────────────────────────

const BLANK_CAT = { name: "", coverImage: "", description: "", isPublished: true };
const BLANK_VID = {
  title: "", videoUrl: "", thumbnailUrl: "", bodyPart: "",
  musclesTargeted: "", difficulty: "beginner" as "beginner" | "intermediate" | "advanced", durationSecs: 0, description: ""
};

const DIFFICULTY_COLORS = {
  beginner:     { bg: "#dcfce7", text: "#16a34a" },
  intermediate: { bg: "#fef3c7", text: "#d97706" },
  advanced:     { bg: "#fee2e2", text: "#dc2626" },
};

// ─────────────────────────────────────────────────────────────────────────────
// ImageUploader sub-component
// ─────────────────────────────────────────────────────────────────────────────

interface ImageUploaderProps {
  value: string;           // current URL (from Cloudinary or empty)
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label, required }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const res = await saUploadImageApi(file);
      onChange(res.data.url);
    } catch {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: 0 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, display: "block" }}>
        {label}{required && " *"}
      </label>

      {/* Drop zone / pick button */}
      {!value && (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          style={{
            border: `2px dashed ${dragOver ? "#3b82f6" : "#cbd5e1"}`,
            borderRadius: 12, padding: "24px 20px", textAlign: "center",
            background: dragOver ? "#eff6ff" : "#f8fafc",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          {uploading ? (
            <><Loader size={24} color="#3b82f6" style={{ animation: "spin 1s linear infinite", marginBottom: 8 }} />
            <div style={{ fontSize: 13, color: "#64748b" }}>Uploading to Cloudinary…</div></>
          ) : (
            <><Upload size={24} color="#94a3b8" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 4 }}>Click or drag & drop image</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>JPG, PNG, WEBP · Max 5MB</div></>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div style={{ position: "relative" }}>
          <img
            src={value} alt="preview"
            style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, border: "1px solid #e2e8f0", display: "block" }}
          />
          <button
            type="button"
            onClick={() => { onChange(""); }}
            style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%",
              color: "#fff", width: 28, height: 28, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
            }}
            title="Remove image"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              position: "absolute", bottom: 8, right: 8,
              background: "rgba(0,0,0,0.55)", border: "none", borderRadius: 8,
              color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px",
              cursor: uploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4,
            }}
            disabled={uploading}
          >
            {uploading ? <Loader size={12} style={{ animation: "spin 1s linear infinite" }} /> : <Upload size={12} />}
            {uploading ? "Uploading…" : "Replace"}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VideoUploader sub-component
// ─────────────────────────────────────────────────────────────────────────────

interface VideoUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ value, onChange, label, required }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("video/")) return;
    setUploading(true);
    setProgress(0);
    try {
      const res = await saUploadVideoApi(file, (p) => setProgress(p));
      onChange(res.data.url);
    } catch {
      alert("Video upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div style={{ marginBottom: 0 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6, display: "block" }}>
        {label}{required && " *"}
      </label>

      {/* Drop zone / pick button */}
      {!value && (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          style={{
            border: `2px dashed ${dragOver ? "#3b82f6" : "#cbd5e1"}`,
            borderRadius: 12, padding: "24px 20px", textAlign: "center",
            background: dragOver ? "#eff6ff" : "#f8fafc",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          {uploading ? (
            <><Loader size={24} color="#3b82f6" style={{ animation: "spin 1s linear infinite", marginBottom: 8 }} />
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Uploading video... {progress}%</div>
            <div style={{ width: "100%", background: "#e2e8f0", borderRadius: 4, height: 6, overflow: "hidden", marginTop: 8 }}>
              <div style={{ height: "100%", background: "#3b82f6", width: `${progress}%`, transition: "width 0.2s" }} />
            </div></>
          ) : (
            <><Upload size={24} color="#94a3b8" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 4 }}>Click or drag & drop video</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>MP4, WEBM · Max 50MB</div></>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div style={{ position: "relative" }}>
          <video
            src={value} controls
            style={{ width: "100%", height: 180, objectFit: "contain", borderRadius: 10, border: "1px solid #e2e8f0", display: "block", background: "#000" }}
          />
          <button
            type="button"
            onClick={() => { onChange(""); }}
            style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%",
              color: "#fff", width: 28, height: 28, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", zIndex: 10,
            }}
            title="Remove video"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WorkoutLibrary Page
// ─────────────────────────────────────────────────────────────────────────────

const WorkoutLibrary: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(false);

  // Category modal
  const [showCatModal, setShowCatModal] = useState(false);
  const [catForm, setCatForm] = useState(BLANK_CAT);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catSaving, setCatSaving] = useState(false);

  // Video modal
  const [showVidModal, setShowVidModal] = useState(false);
  const [vidForm, setVidForm] = useState(BLANK_VID);
  const [editingVidId, setEditingVidId] = useState<string | null>(null);
  const [vidSaving, setVidSaving] = useState(false);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Data Fetching ─────────────────────────────────────────────────────────

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await saFetchCategoriesApi();
      setCategories(res.data.categories || []);
    } catch {
      showToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadVideos = async (catId: string) => {
    setVideosLoading(true);
    try {
      const res = await saFetchVideosApi(catId);
      setVideos(res.data.videos || []);
    } catch {
      showToast("Failed to load videos", "error");
    } finally {
      setVideosLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => {
    if (selectedCat) loadVideos(selectedCat._id);
    else setVideos([]);
  }, [selectedCat]);

  // ── Category CRUD ─────────────────────────────────────────────────────────

  const openAddCat = () => {
    setCatForm(BLANK_CAT);
    setEditingCatId(null);
    setShowCatModal(true);
  };

  const openEditCat = (cat: Category) => {
    setCatForm({ name: cat.name, coverImage: cat.coverImage, description: cat.description, isPublished: cat.isPublished });
    setEditingCatId(cat._id);
    setShowCatModal(true);
  };

  const saveCat = async () => {
    if (!catForm.name.trim() || !catForm.coverImage.trim()) {
      showToast("Name and Cover Image URL are required", "error");
      return;
    }
    setCatSaving(true);
    try {
      if (editingCatId) {
        await saUpdateCategoryApi(editingCatId, catForm);
        showToast("Category updated!");
      } else {
        await saCreateCategoryApi(catForm);
        showToast("Category created!");
      }
      setShowCatModal(false);
      loadCategories();
      if (selectedCat && editingCatId === selectedCat._id) {
        setSelectedCat((prev) => prev ? { ...prev, ...catForm } : null);
      }
    } catch {
      showToast("Save failed", "error");
    } finally {
      setCatSaving(false);
    }
  };

  const deleteCat = async (cat: Category) => {
    if (!confirm(`Delete category "${cat.name}" and ALL its videos?`)) return;
    setDeletingId(cat._id);
    try {
      await saDeleteCategoryApi(cat._id);
      showToast("Category deleted");
      if (selectedCat?._id === cat._id) setSelectedCat(null);
      loadCategories();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Video CRUD ────────────────────────────────────────────────────────────

  const openAddVid = () => {
    setVidForm(BLANK_VID);
    setEditingVidId(null);
    setShowVidModal(true);
  };

  const openEditVid = (v: VideoItem) => {
    setVidForm({
      title: v.title,
      videoUrl: v.videoUrl,
      thumbnailUrl: v.thumbnailUrl || "",
      bodyPart: v.bodyPart,
      musclesTargeted: v.musclesTargeted?.join(", ") || "",
      difficulty: v.difficulty || "beginner",
      durationSecs: v.durationSecs || 0,
      description: v.description || "",
    });
    setEditingVidId(v._id);
    setShowVidModal(true);
  };

  const saveVid = async () => {
    if (!vidForm.title.trim() || !vidForm.videoUrl.trim() || !vidForm.bodyPart.trim()) {
      showToast("Title, Video URL and Body Part are required", "error");
      return;
    }
    if (!selectedCat) return;
    setVidSaving(true);
    const payload = {
      ...vidForm,
      musclesTargeted: vidForm.musclesTargeted.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingVidId) {
        await saUpdateVideoApi(editingVidId, payload);
        showToast("Video updated!");
      } else {
        await saCreateVideoApi(selectedCat._id, payload);
        showToast("Video added!");
      }
      setShowVidModal(false);
      loadVideos(selectedCat._id);
      loadCategories(); // refresh counts
    } catch {
      showToast("Save failed", "error");
    } finally {
      setVidSaving(false);
    }
  };

  const deleteVid = async (v: VideoItem) => {
    if (!confirm(`Delete video "${v.title}"?`)) return;
    setDeletingId(v._id);
    try {
      await saDeleteVideoApi(v._id);
      showToast("Video deleted");
      if (selectedCat) loadVideos(selectedCat._id);
      loadCategories();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={styles.page}>

      {/* Toast */}
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === "success" ? "#16a34a" : "#dc2626" }}>
          {toast.type === "success" ? <Check size={16} /> : <X size={16} />} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          {selectedCat ? (
            <>
              <button style={styles.backBtn} onClick={() => setSelectedCat(null)}>
                <ChevronLeft size={18} />
              </button>
              <div>
                <div style={styles.pageTitle}>
                  <BookOpen size={20} color="#3b82f6" />
                  {selectedCat.name}
                </div>
                <div style={styles.pageSub}>{videos.length} exercise{videos.length !== 1 ? "s" : ""}</div>
              </div>
            </>
          ) : (
            <div>
              <div style={styles.pageTitle}><BookOpen size={20} color="#3b82f6" /> Workout Videos</div>
              <div style={styles.pageSub}>{categories.length} categor{categories.length !== 1 ? "ies" : "y"}</div>
            </div>
          )}
        </div>
        <button
          style={styles.addBtn}
          onClick={selectedCat ? openAddVid : openAddCat}
        >
          <Plus size={18} />
          {selectedCat ? "Add Exercise" : "Add Category"}
        </button>
      </div>

      {/* ── Categories View ─────────────────────────────────────────────── */}
      {!selectedCat && (
        loading ? (
          <div style={styles.center}><Loader size={32} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} /></div>
        ) : categories.length === 0 ? (
          <div style={styles.empty}>
            <BookOpen size={48} color="#cbd5e1" />
            <h3 style={{ margin: "12px 0 4px", color: "#64748b" }}>No Categories Yet</h3>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>Create your first workout category to get started.</p>
            <button style={styles.addBtn} onClick={openAddCat}><Plus size={16} /> Add Category</button>
          </div>
        ) : (
          <div style={styles.catGrid}>
            {categories.map((cat) => (
              <div key={cat._id} style={styles.catCard} onClick={() => setSelectedCat(cat)}>
                <div style={styles.catImgWrap}>
                  <img
                    src={cat.coverImage}
                    alt={cat.name}
                    style={styles.catImg}
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"; }}
                  />
                  <div style={styles.catOverlay}>
                    {!cat.isPublished && (
                      <span style={styles.draftBadge}><EyeOff size={10} /> Draft</span>
                    )}
                  </div>
                </div>
                <div style={styles.catBody}>
                  <div style={styles.catName}>{cat.name}</div>
                  <div style={styles.catMeta}>
                    <span style={styles.catCount}><Video size={12} /> {cat.videoCount} video{cat.videoCount !== 1 ? "s" : ""}</span>
                    <span style={{ ...styles.pubBadge, background: cat.isPublished ? "#dcfce7" : "#f1f5f9", color: cat.isPublished ? "#16a34a" : "#64748b" }}>
                      {cat.isPublished ? <><Eye size={10} /> Published</> : <><EyeOff size={10} /> Draft</>}
                    </span>
                  </div>
                  {cat.description && <div style={styles.catDesc}>{cat.description}</div>}
                </div>
                <div style={styles.catActions} onClick={(e) => e.stopPropagation()}>
                  <button style={styles.iconBtn} title="Edit" onClick={() => openEditCat(cat)}>
                    <Pencil size={15} />
                  </button>
                  <button
                    style={{ ...styles.iconBtn, color: "#ef4444" }}
                    title="Delete"
                    onClick={() => deleteCat(cat)}
                    disabled={deletingId === cat._id}
                  >
                    {deletingId === cat._id ? <Loader size={15} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Videos View ─────────────────────────────────────────────────── */}
      {selectedCat && (
        videosLoading ? (
          <div style={styles.center}><Loader size={32} color="#3b82f6" style={{ animation: "spin 1s linear infinite" }} /></div>
        ) : videos.length === 0 ? (
          <div style={styles.empty}>
            <Video size={48} color="#cbd5e1" />
            <h3 style={{ margin: "12px 0 4px", color: "#64748b" }}>No Exercises Yet</h3>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>Add your first exercise to this category.</p>
            <button style={styles.addBtn} onClick={openAddVid}><Plus size={16} /> Add Exercise</button>
          </div>
        ) : (
          <div style={styles.vidList}>
            {videos.map((v, idx) => {
              const diff = DIFFICULTY_COLORS[v.difficulty] || DIFFICULTY_COLORS.beginner;
              return (
                <div key={v._id} style={styles.vidCard}>
                  <div style={styles.vidNum}>{idx + 1}</div>
                  {v.thumbnailUrl ? (
                    <img src={v.thumbnailUrl} alt={v.title} style={styles.vidThumb}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div style={styles.vidThumbPlaceholder}><Video size={24} color="#94a3b8" /></div>
                  )}
                  <div style={styles.vidInfo}>
                    <div style={styles.vidTitle}>{v.title}</div>
                    <div style={styles.vidMeta}>
                      <span style={styles.metaChip}><Dumbbell size={11} /> {v.bodyPart}</span>
                      {v.durationSecs > 0 && (
                        <span style={styles.metaChip}><Clock size={11} /> {Math.round(v.durationSecs / 60)}m</span>
                      )}
                      <span style={{ ...styles.metaChip, background: diff.bg, color: diff.text }}>
                        {v.difficulty}
                      </span>
                    </div>
                    {v.musclesTargeted?.length > 0 && (
                      <div style={styles.muscles}>
                        {v.musclesTargeted.map((m) => (
                          <span key={m} style={styles.musclePill}>{m}</span>
                        ))}
                      </div>
                    )}
                    {v.description && <div style={styles.vidDesc}>{v.description}</div>}
                  </div>
                  <div style={styles.vidActions}>
                    <button style={styles.iconBtn} title="Edit" onClick={() => openEditVid(v)}>
                      <Pencil size={15} />
                    </button>
                    <button
                      style={{ ...styles.iconBtn, color: "#ef4444" }}
                      title="Delete"
                      onClick={() => deleteVid(v)}
                      disabled={deletingId === v._id}
                    >
                      {deletingId === v._id ? <Loader size={15} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={15} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* ── Category Modal ────────────────────────────────────────────────── */}
      {showCatModal && (
        <div style={styles.overlay} onClick={() => setShowCatModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingCatId ? "Edit Category" : "New Category"}</h3>
              <button style={styles.closeBtn} onClick={() => setShowCatModal(false)}><X size={18} /></button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category Name *</label>
              <input style={styles.input} placeholder="e.g. Shoulder" value={catForm.name}
                onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} />
            </div>

            <div style={styles.formGroup}>
              <ImageUploader
                label="Cover Image"
                required
                value={catForm.coverImage}
                onChange={(url) => setCatForm({ ...catForm, coverImage: url })}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, height: 80, resize: "vertical" }} placeholder="Short description..." value={catForm.description}
                onChange={(e) => setCatForm({ ...catForm, description: e.target.value })} />
            </div>

            <div style={styles.formGroup}>
              <label style={{ ...styles.label, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={catForm.isPublished}
                  onChange={(e) => setCatForm({ ...catForm, isPublished: e.target.checked })}
                  style={{ width: 16, height: 16 }} />
                Published (visible to members)
              </label>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowCatModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={saveCat} disabled={catSaving}>
                {catSaving ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={16} />}
                {catSaving ? "Saving…" : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Video Modal ───────────────────────────────────────────────────── */}
      {showVidModal && (
        <div style={styles.overlay} onClick={() => setShowVidModal(false)}>
          <div style={{ ...styles.modal, maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingVidId ? "Edit Exercise" : "Add Exercise"}</h3>
              <button style={styles.closeBtn} onClick={() => setShowVidModal(false)}><X size={18} /></button>
            </div>

            <div style={styles.formRow}>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Exercise Title *</label>
                <input style={styles.input} placeholder="e.g. Shoulder Press" value={vidForm.title}
                  onChange={(e) => setVidForm({ ...vidForm, title: e.target.value })} />
              </div>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Body Part *</label>
                <input style={styles.input} placeholder="e.g. Shoulder" value={vidForm.bodyPart}
                  onChange={(e) => setVidForm({ ...vidForm, bodyPart: e.target.value })} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <VideoUploader
                label="Video File"
                required
                value={vidForm.videoUrl}
                onChange={(url) => setVidForm({ ...vidForm, videoUrl: url })}
              />
            </div>

            <div style={styles.formGroup}>
              <ImageUploader
                label="Thumbnail Image (optional)"
                value={vidForm.thumbnailUrl}
                onChange={(url) => setVidForm({ ...vidForm, thumbnailUrl: url })}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Muscles Targeted (comma-separated)</label>
              <input style={styles.input} placeholder="e.g. Front Deltoid, Side Deltoid, Trapezius"
                value={vidForm.musclesTargeted}
                onChange={(e) => setVidForm({ ...vidForm, musclesTargeted: e.target.value })} />
            </div>

            <div style={styles.formRow}>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Difficulty</label>
                <select style={styles.input} value={vidForm.difficulty}
                  onChange={(e) => setVidForm({ ...vidForm, difficulty: e.target.value as any })}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Duration (seconds)</label>
                <input type="number" style={styles.input} placeholder="e.g. 180"
                  value={vidForm.durationSecs || ""}
                  onChange={(e) => setVidForm({ ...vidForm, durationSecs: Number(e.target.value) })} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description / Notes</label>
              <textarea style={{ ...styles.input, height: 80, resize: "vertical" }}
                placeholder="Key form tips, notes about this exercise..."
                value={vidForm.description}
                onChange={(e) => setVidForm({ ...vidForm, description: e.target.value })} />
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowVidModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={saveVid} disabled={vidSaving}>
                {vidSaving ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={16} />}
                {vidSaving ? "Saving…" : "Save Exercise"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: { display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Inter', sans-serif" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  backBtn: {
    background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: 8, cursor: "pointer", display: "flex", alignItems: "center", color: "#475569",
  },
  pageTitle: {
    fontSize: 20, fontWeight: 700, color: "#0f172a",
    display: "flex", alignItems: "center", gap: 8,
  },
  pageSub: { fontSize: 13, color: "#64748b", marginTop: 2 },
  addBtn: {
    display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
    background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10,
    fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  center: { display: "flex", justifyContent: "center", padding: 60 },
  empty: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: 60, gap: 8, background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
  },

  // Category grid
  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
  catCard: {
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden",
    cursor: "pointer", transition: "box-shadow 0.2s, transform 0.15s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    position: "relative",
  },
  catImgWrap: { position: "relative", height: 160, overflow: "hidden" },
  catImg: { width: "100%", height: "100%", objectFit: "cover" },
  catOverlay: { position: "absolute", top: 8, left: 8 },
  draftBadge: {
    background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11, fontWeight: 600,
    padding: "3px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4,
  },
  catBody: { padding: "14px 16px 10px" },
  catName: { fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 },
  catMeta: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  catCount: { fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 4 },
  pubBadge: { fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 },
  catDesc: { fontSize: 12, color: "#64748b", lineHeight: 1.5, marginTop: 4 },
  catActions: {
    display: "flex", gap: 4, padding: "8px 12px", borderTop: "1px solid #f1f5f9",
    justifyContent: "flex-end",
  },

  // Video list
  vidList: { display: "flex", flexDirection: "column", gap: 12 },
  vidCard: {
    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "16px 20px",
    display: "flex", alignItems: "flex-start", gap: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  vidNum: { fontSize: 13, fontWeight: 700, color: "#94a3b8", minWidth: 24, paddingTop: 2 },
  vidThumb: { width: 80, height: 56, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "1px solid #e2e8f0" },
  vidThumbPlaceholder: {
    width: 80, height: 56, borderRadius: 8, background: "#f8fafc",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    border: "1px solid #e2e8f0",
  },
  vidInfo: { flex: 1 },
  vidTitle: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 6 },
  vidMeta: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 },
  metaChip: {
    fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
    background: "#f1f5f9", color: "#475569", display: "flex", alignItems: "center", gap: 4,
  },
  muscles: { display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 },
  musclePill: {
    fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#e0e7ff", color: "#4f46e5", fontWeight: 600,
  },
  vidDesc: { fontSize: 12, color: "#64748b", marginTop: 6, lineHeight: 1.5 },
  vidActions: { display: "flex", flexDirection: "column", gap: 6 },

  // Shared
  iconBtn: {
    background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
    padding: 7, cursor: "pointer", display: "flex", color: "#475569", transition: "background 0.15s",
  },

  // Toast
  toast: {
    position: "fixed", top: 20, right: 20, zIndex: 9999,
    color: "#fff", padding: "12px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600,
    display: "flex", alignItems: "center", gap: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },

  // Modal
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  },
  modal: {
    background: "#fff", borderRadius: 20, padding: "28px 32px", width: "100%",
    maxWidth: 480, maxHeight: "90vh", overflowY: "auto",
    boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  modalTitle: { fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0 },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex" },
  formGroup: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 },
  formRow: { display: "flex", gap: 16, marginBottom: 0 },
  label: { fontSize: 13, fontWeight: 600, color: "#475569" },
  input: {
    background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 8,
    color: "#0f172a", fontSize: 14, padding: "10px 12px", outline: "none",
    fontFamily: "'Inter', sans-serif", width: "100%", boxSizing: "border-box",
  },
  imgPreview: { width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginTop: 6, border: "1px solid #e2e8f0" },
  modalFooter: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 },
  cancelBtn: {
    padding: "10px 20px", background: "#f1f5f9", border: "1px solid #e2e8f0",
    borderRadius: 8, color: "#475569", fontWeight: 600, fontSize: 14, cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 20px", background: "#3b82f6", border: "none",
    borderRadius: 8, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 8,
  },
};

export default WorkoutLibrary;
