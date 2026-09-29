import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader, Clock, User, Share2 } from "lucide-react";
import { fetchBlogBySlugApi } from "../SuperAdmin/services/superAdminApis";
import { Navbar } from "./Home";
import "./BlogDetail.css";
interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}
export const BlogDetail: React.FC<{
  onBack: () => void;
}> = ({
  onBack
}) => {
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
    fetchBlogBySlugApi(slug).then(res => setBlog(res.data)).catch(err => {
      console.error(err);
      setError("Blog not found or has been removed.");
    }).finally(() => setLoading(false));
  }, []);
  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
  return <div className="blog-detail-inline-1">
      <Navbar onLogin={() => {}} />

      <main className="blog-detail-inline-2">
        {loading ? <div className="blog-detail-inline-3">
            <Loader size={40} className="blog-detail-inline-4" />
          </div> : error || !blog ? <div className="blog-detail-inline-5">
            <h2 className="blog-detail-inline-6">{error}</h2>
            <button className="gc-btn-primary" onClick={onBack}>Back to Blogs</button>
          </div> : <article className="blog-detail-inline-7">
            <button onClick={onBack} className="blog-detail-inline-8">
              <ArrowLeft size={18} /> Back to Blogs
            </button>

            <h1 className="blog-detail-inline-9">
              {blog.title}
            </h1>

            <div className="blog-detail-inline-10">
              <div className="blog-detail-inline-11">
                <span className="blog-detail-inline-12">
                  <div className="blog-detail-inline-13">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="blog-detail-inline-14">{blog.author}</span>
                </span>
                <span className="blog-detail-inline-15"><Clock size={16} /> {formatDate(blog.createdAt)}</span>
              </div>
              
              <button onClick={handleShare} onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"} onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"} className="blog-detail-inline-16">
                <Share2 size={16} /> Share
              </button>
            </div>

            {blog.imageUrl && <div className="blog-detail-inline-17">
                <img src={blog.imageUrl} alt={blog.title} className="blog-detail-inline-18" />
              </div>}

            <div dangerouslySetInnerHTML={{
          __html: blog.content.replace(/\n/g, "<br/>")
        }} className="blog-detail-inline-19" />
          </article>}
      </main>
    </div>;
};