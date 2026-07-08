import React, { useState, useEffect } from "react";
import { BookOpen, Video, Play, X, Dumbbell, Clock, ChevronLeft, Loader, Zap, CheckSquare, BarChart3 } from "lucide-react";
import { getWorkoutCategoriesApi, getWorkoutCategoryApi } from "../../services/apis/workoutLibraryApis";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Category {
  _id: string;
  name: string;
  coverImage: string;
  description: string;
  videoCount: number;
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
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const DIFF_STYLE: Record<string, { bg: string; text: string }> = {
  beginner:     { bg: "rgba(34, 197, 94, 0.15)", text: "#22c55e" },
  intermediate: { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" },
  advanced:     { bg: "rgba(239, 68, 68, 0.15)", text: "#ef4444" },
};

const fmtDuration = (secs: number) => {
  if (!secs) return null;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m${s > 0 ? ` ${s}s` : ""}` : `${s}s`;
};

// Converts a YouTube watch URL to an embed URL
const toEmbedUrl = (url: string) => {
  if (!url) return url;
  // Already embed
  if (url.includes("youtube.com/embed/") || url.includes("youtu.be/embed/")) return url;
  // youtube.com/watch?v=
  const ytMatch = url.match(/[?&]v=([^&]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // youtube.com/shorts/ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  return url;
};

// ─────────────────────────────────────────────────────────────────────────────
// WorkoutLibraryPage
// ─────────────────────────────────────────────────────────────────────────────

const WorkoutLibraryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // New states for the top panel
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [selectedDay, setSelectedDay] = useState(todayName);
  const [selectedPlanItem, setSelectedPlanItem] = useState("");
  
  // Calculate current week's dates
  const weekDays = React.useMemo(() => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const now = new Date();
    const currentDay = now.getDay();
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    
    const mondayDate = new Date(now);
    mondayDate.setDate(now.getDate() + distanceToMonday);
    
    return days.map((dayName, index) => {
      const d = new Date(mondayDate);
      d.setDate(mondayDate.getDate() + index);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return { dayName, dateStr };
    });
  }, []);

  const WORKOUT_PLAN: Record<string, string[]> = {
    "Monday": ["Chest", "Triceps"],
    "Tuesday": ["Back", "Biceps"],
    "Wednesday": ["Legs"],
    "Thursday": ["Shoulders", "Abs"],
    "Friday": ["Arms", "Forearms"],
    "Saturday": ["Cardio"],
    "Sunday": ["Rest"]
  };

  // Reset plan item when day changes
  useEffect(() => {
    setSelectedPlanItem("");
    setSelectedCat(null);
    setVideos([]);
  }, [selectedDay]);

  const handlePlanSelection = (item: string) => {
    setSelectedPlanItem(item);
    if (!item || item === "Rest") {
      setSelectedCat(null);
      setVideos([]);
      return;
    }
    
    // Try to find a category that matches 'item' loosely
    const match = categories.find(c => 
      c.name.toLowerCase().includes(item.toLowerCase()) || 
      item.toLowerCase().includes(c.name.toLowerCase())
    );
    
    if (match) {
      loadCategory(match);
    } else {
      // Create a dummy category to show "No Exercises Yet"
      setSelectedCat({
        _id: "dummy-" + item,
        name: item,
        coverImage: "",
        description: `Workout videos for ${item} are not uploaded yet.`,
        videoCount: 0
      });
      setVideos([]);
    }
  };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getWorkoutCategoriesApi();
      setCategories(res.data.categories || []);
    } catch {
      // silent fail — backend might not have any yet
    } finally {
      setLoading(false);
    }
  };

  const loadCategory = async (cat: Category) => {
    setSelectedCat(cat);
    setVideosLoading(true);
    try {
      const res = await getWorkoutCategoryApi(cat._id);
      setVideos(res.data.videos || []);
    } catch {
      setVideos([]);
    } finally {
      setVideosLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="page-container">
      {/* Header */}
      <header className="page-header" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {selectedCat && (
          <button
            onClick={() => { setSelectedCat(null); setVideos([]); }}
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: 8, cursor: "pointer", display: "flex", color: "var(--text-secondary)" }}
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <div>
          <h2 className="page-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BookOpen size={22} color="var(--primary)" />
            {selectedCat ? selectedCat.name : "Workout Videos"}
          </h2>
          <p className="page-subtitle">
            {selectedCat
              ? `${videos.length} exercise${videos.length !== 1 ? "s" : ""} — click to watch`
              : "Browse workout categories curated by your gym"}
          </p>
        </div>
      </header>

      {/* ── Daily Planner Panel ────────────────────────────────────────────── */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 24, 
        background: "var(--bg-primary)", 
        padding: "16px 20px", 
        borderRadius: 16, 
        border: "1px solid var(--border-color)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        gap: 16
      }}>
        {/* Left Side: Days */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, flex: "1 1 auto" }} className="hide-scrollbar">
          {weekDays.map(({ dayName, dateStr }) => (
            <button
              key={dayName}
              onClick={() => setSelectedDay(dayName)}
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                border: "none",
                background: selectedDay === dayName ? "var(--primary)" : "var(--bg-secondary)",
                color: selectedDay === dayName ? "#fff" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 90
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 14 }}>{dayName}</span>
              <span style={{ fontSize: 11, opacity: selectedDay === dayName ? 0.9 : 0.6, marginTop: 2 }}>{dateStr}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Category Dropdown */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)" }}>
            Workout for {selectedDay}:
          </span>
          <div style={{ position: "relative" }}>
            <select
              value={selectedPlanItem}
              onChange={(e) => handlePlanSelection(e.target.value)}
              style={{
                padding: "10px 36px 10px 16px",
                borderRadius: 12,
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: 14,
                appearance: "none",
                outline: "none",
                cursor: "pointer",
                minWidth: 180
              }}
            >
              <option value="">Select Workout...</option>
              {WORKOUT_PLAN[selectedDay].map(workout => (
                <option key={workout} value={workout}>{workout}</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category grid ──────────────────────────────────────────────────── */}
      {!selectedCat && (
        loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
            <Loader size={32} color="var(--primary)" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : categories.length === 0 ? (
          <div className="gym-card" style={{ textAlign: "center", padding: "60px 20px" }}>
            <BookOpen size={48} style={{ color: "var(--border-color)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>Workout Videos Coming Soon</h3>
            <p style={{ color: "var(--text-muted)" }}>Your gym admin is preparing workout content.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => loadCategory(cat)}
                style={{
                  borderRadius: 16, overflow: "hidden", cursor: "pointer",
                  background: "var(--bg-primary)", border: "1px solid var(--border-color)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                className="workout-cat-card"
              >
                <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                  <img
                    src={cat.coverImage}
                    alt={cat.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400";
                    }}
                  />
                  {/* Play overlay */}
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: 0, transition: "opacity 0.2s",
                  }} className="cat-hover-overlay">
                    <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: "50%", padding: 12 }}>
                      <Play size={20} fill="#0f172a" color="#0f172a" />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Video size={12} /> {cat.videoCount} exercise{cat.videoCount !== 1 ? "s" : ""}
                  </div>
                  {cat.description && (
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.4 }}>
                      {cat.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Video list ─────────────────────────────────────────────────────── */}
      {selectedCat && (
        videosLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
            <Loader size={32} color="var(--primary)" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : videos.length === 0 ? (
          <div className="gym-card" style={{ textAlign: "center", padding: "60px 20px" }}>
            <Video size={48} style={{ color: "var(--border-color)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>No Exercises Yet</h3>
            <p style={{ color: "var(--text-muted)" }}>Check back later, more content is coming.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {videos.map((v, idx) => {
              const diff = DIFF_STYLE[v.difficulty] || DIFF_STYLE.beginner;
              const dur = fmtDuration(v.durationSecs);
              return (
                <div
                  key={v._id}
                  className="gym-card"
                  style={{ display: "flex", alignItems: "flex-start", gap: 24, padding: "24px", transition: "all 0.2s" }}
                >
                  {/* Thumbnail / index */}
                  {v.thumbnailUrl ? (
                    <div 
                      onClick={() => setPlayingVideo(v)}
                      style={{ position: "relative", flexShrink: 0, width: 180, height: 180, borderRadius: 16, overflow: "hidden", background: "#000", cursor: "pointer" }}
                    >
                      <img
                        src={v.thumbnailUrl}
                        alt={v.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <div style={{
                        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <div style={{ width: 48, height: 48, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                          <Play size={24} fill="#3b82f6" color="#3b82f6" style={{ marginLeft: 3 }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      width: 180, height: 180, borderRadius: 16, background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, gap: 4,
                    }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-muted)" }}>{idx + 1}</span>
                      <Play size={24} color="var(--primary)" />
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 20, textTransform: "capitalize" }}>
                      {v.title}
                    </div>

                    {/* Stats row */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "center" }}>
                      {/* Muscle Group */}
                      <div style={{ display: "flex", gap: 10, padding: "8px 12px", background: "rgba(59, 130, 246, 0.12)", borderRadius: 12, alignItems: "center" }}>
                        <div style={{ color: "#3b82f6" }}><Dumbbell size={16} /></div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", marginBottom: 2 }}>Muscle Group</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>{v.bodyPart}</div>
                        </div>
                      </div>

                      {/* Primary Muscle */}
                      {v.musclesTargeted?.length > 0 && (
                        <div style={{ display: "flex", gap: 10, padding: "8px 12px", background: "rgba(34, 197, 94, 0.12)", borderRadius: 12, alignItems: "center" }}>
                          <div style={{ color: "#22c55e" }}><CheckSquare size={16} /></div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", marginBottom: 2 }}>Primary Muscle</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>{v.musclesTargeted.join(", ")}</div>
                          </div>
                        </div>
                      )}

                      {/* Duration */}
                      {dur && (
                        <div style={{ display: "flex", gap: 10, padding: "8px 12px", background: "var(--bg-secondary)", borderRadius: 12, alignItems: "center" }}>
                          <div style={{ color: "var(--text-muted)" }}><Clock size={16} /></div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 2 }}>Duration</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{dur}</div>
                          </div>
                        </div>
                      )}

                      {/* Level */}
                      <div style={{ display: "flex", gap: 10, padding: "8px 12px", background: diff.bg, borderRadius: 12, alignItems: "center" }}>
                        <div style={{ color: diff.text }}><BarChart3 size={16} /></div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: diff.text, marginBottom: 2 }}>Level</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: diff.text, textTransform: "capitalize" }}>{v.difficulty}</div>
                        </div>
                      </div>

                      <div style={{ flex: 1 }}></div>

                      {/* Watch button */}
                      <button 
                        onClick={() => setPlayingVideo(v)}
                        style={{ padding: "10px 20px", borderRadius: 10, background: "#3b82f6", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)" }}
                      >
                        <Play size={16} fill="#fff" /> Watch Exercise
                      </button>
                    </div>

                    {/* Description */}
                    {v.description && (
                      <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {v.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* ── Video Player Modal ──────────────────────────────────────────────── */}
      {playingVideo && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 2000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
          onClick={() => setPlayingVideo(null)}
        >
          <div
            style={{
              background: "var(--bg-primary)", borderRadius: 20, width: "100%", maxWidth: 720,
              overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
              maxHeight: "90vh", overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video player */}
            <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
              {playingVideo.videoUrl.includes("youtube") || playingVideo.videoUrl.includes("youtu.be") ? (
                <iframe
                  src={toEmbedUrl(playingVideo.videoUrl)}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={playingVideo.videoUrl}
                  controls
                  autoPlay
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              )}
              <button
                onClick={() => setPlayingVideo(null)}
                style={{
                  position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)",
                  border: "none", borderRadius: "50%", color: "#fff", width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: "20px 24px 24px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 10 }}>
                {playingVideo.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: "var(--bg-secondary)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: 5 }}>
                  <Dumbbell size={12} color="var(--primary)" /> {playingVideo.bodyPart}
                </span>
                {fmtDuration(playingVideo.durationSecs) && (
                  <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: "var(--bg-secondary)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={12} /> {fmtDuration(playingVideo.durationSecs)}
                  </span>
                )}
                <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: DIFF_STYLE[playingVideo.difficulty]?.bg || "#f1f5f9", color: DIFF_STYLE[playingVideo.difficulty]?.text || "#475569" }}>
                  {playingVideo.difficulty}
                </span>
              </div>

              {playingVideo.musclesTargeted?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                    <Zap size={13} color="var(--primary)" /> Muscles Targeted
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {playingVideo.musclesTargeted.map((m) => (
                      <span key={m} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: "var(--primary-light)", color: "var(--primary)" }}>{m}</span>
                    ))}
                  </div>
                </div>
              )}

              {playingVideo.description && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                    Description
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7, margin: 0 }}>
                    {playingVideo.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .workout-cat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
        .workout-cat-card:hover .cat-hover-overlay { opacity: 1 !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default WorkoutLibraryPage;
