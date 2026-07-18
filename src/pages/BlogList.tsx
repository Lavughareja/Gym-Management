import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Loader, BookOpen, Clock, User } from "lucide-react";
import { fetchPublicBlogsApi } from "../SuperAdmin/services/superAdminApis";
import { Navbar } from "./Home";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}

export const BlogList: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicBlogsApi()
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <Navbar onLogin={() => {}} />

      <main style={{ paddingTop: 100, paddingBottom: 60, maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        <button 
          onClick={onBack}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#64748b", fontWeight: 600, cursor: "pointer", marginBottom: 32 }}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
            Trainix <span style={{ color: "var(--primary)" }}>Blog</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#64748b", maxWidth: 600 }}>
            Discover tips, strategies, and industry insights to help you grow your gym and manage your business effectively.
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
            <Loader size={36} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, background: "white", borderRadius: 16, border: "1px dashed #cbd5e1" }}>
            <BookOpen size={48} style={{ margin: "0 auto 16px", color: "#94a3b8" }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#334155" }}>No posts yet</h3>
            <p style={{ color: "#64748b" }}>Check back soon for new articles and updates.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {blogs.map(blog => (
              <div 
                key={blog._id} 
                style={{ 
                  background: "white", 
                  borderRadius: 16, 
                  overflow: "hidden", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer"
                }}
                onClick={() => {
                  window.history.pushState({}, "", `/?page=blog-detail&slug=${blog.slug}`);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                }}
              >
                {blog.imageUrl ? (
                  <div style={{ height: 200, width: "100%", backgroundImage: `url(${blog.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                ) : (
                  <div style={{ height: 200, width: "100%", background: "linear-gradient(135deg, #e0e7ff, #ede9fe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BookOpen size={48} color="#818cf8" opacity={0.5} />
                  </div>
                )}
                
                <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#64748b", fontSize: "0.85rem", marginBottom: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {formatDate(blog.createdAt)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={14} /> {blog.author}</span>
                  </div>
                  
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: 12, lineHeight: 1.4 }}>
                    {blog.title}
                  </h3>
                  
                  <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                    {getExcerpt(blog.content)}
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "center", color: "var(--primary)", fontWeight: 600, fontSize: "0.95rem", gap: 4 }}>
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
