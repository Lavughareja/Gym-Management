import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader, Clock, User, Share2 } from "lucide-react";
import { fetchBlogBySlugApi } from "../SuperAdmin/services/superAdminApis";
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

export const BlogDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get("slug");
    
    if (!slug) {
      setError("Blog not found");
      setLoading(false);
      return;
    }

    fetchBlogBySlugApi(slug)
      .then(res => setBlog(res.data))
      .catch(err => {
        console.error(err);
        setError("Blog not found or has been removed.");
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
      <Navbar onLogin={() => {}} />

      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 120 }}>
            <Loader size={40} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} />
          </div>
        ) : error || !blog ? (
          <div style={{ textAlign: "center", padding: 120 }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>{error}</h2>
            <button className="gc-btn-primary" onClick={onBack}>Back to Blogs</button>
          </div>
        ) : (
          <article style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
            <button 
              onClick={onBack}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#64748b", fontWeight: 600, cursor: "pointer", marginBottom: 32 }}
            >
              <ArrowLeft size={18} /> Back to Blogs
            </button>

            <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: 24, letterSpacing: "-0.02em" }}>
              {blog.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 24, color: "#64748b", fontSize: "0.95rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, color: "#334155" }}>{blog.author}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={16} /> {formatDate(blog.createdAt)}</span>
              </div>
              
              <button onClick={handleShare} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f1f5f9", border: "none", padding: "8px 16px", borderRadius: 20, color: "#475569", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"} onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}>
                <Share2 size={16} /> Share
              </button>
            </div>

            {blog.imageUrl && (
              <div style={{ marginBottom: 48, borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                <img src={blog.imageUrl} alt={blog.title} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            )}

            <div 
              style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#334155" }}
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br/>") }}
            />
          </article>
        )}
      </main>
    </div>
  );
};
