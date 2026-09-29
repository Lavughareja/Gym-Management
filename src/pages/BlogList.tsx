import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Loader, BookOpen, Clock, User } from "lucide-react";
import { fetchPublicBlogsApi } from "../SuperAdmin/services/superAdminApis";
import { Navbar } from "./Home";
import "./BlogList.css";
interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}
export const BlogList: React.FC<{
  onBack: () => void;
}> = ({
  onBack
}) => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPublicBlogsApi().then(res => setBlogs(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);
  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };
  return <div className="blog-list-inline-1">
      <Navbar onLogin={() => {}} />

      <main className="blog-list-inline-2">
        <button onClick={onBack} className="blog-list-inline-3">
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="blog-list-inline-4">
          <h1 className="blog-list-inline-5">
            Trainix <span className="blog-list-inline-6">Blog</span>
          </h1>
          <p className="blog-list-inline-7">
            Discover tips, strategies, and industry insights to help you grow your gym and manage your business effectively.
          </p>
        </div>

        {loading ? <div className="blog-list-inline-8">
            <Loader size={36} className="blog-list-inline-9" />
          </div> : blogs.length === 0 ? <div className="blog-list-inline-10">
            <BookOpen size={48} className="blog-list-inline-11" />
            <h3 className="blog-list-inline-12">No posts yet</h3>
            <p className="blog-list-inline-13">Check back soon for new articles and updates.</p>
          </div> : <div className="blog-list-inline-14">
            {blogs.map(blog => <div key={blog._id} onClick={() => {
          window.history.pushState({}, "", `/?page=blog-detail&slug=${blog.slug}`);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }} onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
        }} onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
        }} className="blog-list-inline-15">
                {blog.imageUrl ? <div style={{
            backgroundImage: `url(${blog.imageUrl})`
          }} className="blog-list-inline-16" /> : <div className="blog-list-inline-17">
                    <BookOpen size={48} color="#818cf8" opacity={0.5} />
                  </div>}
                
                <div className="blog-list-inline-18">
                  <div className="blog-list-inline-19">
                    <span className="blog-list-inline-20"><Clock size={14} /> {formatDate(blog.createdAt)}</span>
                    <span className="blog-list-inline-21"><User size={14} /> {blog.author}</span>
                  </div>
                  
                  <h3 className="blog-list-inline-22">
                    {blog.title}
                  </h3>
                  
                  <p className="blog-list-inline-23">
                    {getExcerpt(blog.content)}
                  </p>
                  
                  <div className="blog-list-inline-24">
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>)}
          </div>}
      </main>
    </div>;
};