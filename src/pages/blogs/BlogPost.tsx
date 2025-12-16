import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  heroImage?: string;
  content: React.ReactNode;
  tags?: string[];
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  author,
  date,
  readTime,
  category,
  gradient,
  heroImage,
  content,
  tags = []
}) => {
  return (
    <div className="min-h-screen bg-[#1a0b1e] text-white">
      {/* Hero Section */}
      <section className={`relative py-32 md:py-40 px-4 md:px-20 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {heroImage && (
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt={title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          </div>
        )}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5722] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 hover-trigger"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-widest border border-white/20">
              {category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-white/70"
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-4 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-invert prose-lg max-w-none">
            {content}
          </div>

          {tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 flex-wrap">
                <Tag size={20} className="text-[#8E609B]" />
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[#8E609B]/10 border border-[#8E609B]/30 rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 md:p-12 bg-gradient-to-br from-[#8E609B]/20 to-[#FF5722]/10 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Ready to Transform Your Brand?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can help you achieve your business goals.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#FF5722] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#E64A19] transition-colors"
            >
              Get Started
              <ArrowLeft className="rotate-180" size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default BlogPost;
