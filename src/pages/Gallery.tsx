import { useState, useEffect } from 'react';
import { GalleryImage } from '../types';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(setImages);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-widest text-white mb-16 text-center">
          Our <span className="text-[#D4AF37]">Facility</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.id} className="aspect-square relative overflow-hidden group">
              <img loading="lazy" src={img.url} alt={img.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold uppercase tracking-widest">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
