import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: "How to Increase Member Retention by 40%",
    category: "Growth",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "The Ultimate Guide to Biometric Attendance",
    category: "Technology",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "10 Gym Marketing Tips for 2026",
    category: "Marketing",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"
  }
];

export const BlogPreview: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-dark mb-4 tracking-tight">
              Resources for growth.
            </h2>
            <p className="text-lg text-gray-600">
              Insights, strategies, and guides to help you build a more profitable fitness business.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-medium hover:text-primary-hover transition-colors">
            View all articles <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-gray-100">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-dark">
                  {article.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
