import { useState, useEffect } from 'react';
import { Blog as BlogType } from '../types';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(setBlogs);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-widest text-white mb-16 text-center">
          Fitness <span className="text-[#D4AF37]">Insights</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map(b => (
            <div key={b.id} className="bg-zinc-900 border border-white/5">
              <div className="aspect-[16/9] overflow-hidden">
                <img loading="lazy" src={b.image} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-2">{b.date}</p>
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{b.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{b.snippet}</p>
                <button className="text-white uppercase text-sm font-bold tracking-widest hover:text-[#D4AF37] transition-colors">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
