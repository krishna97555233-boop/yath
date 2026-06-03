import { useState, useEffect } from 'react';
import { Trainer } from '../types';

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    fetch('/api/trainers').then(r => r.json()).then(setTrainers);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-widest text-white mb-16">
          Meet The <span className="text-[#D4AF37]">Experts</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map(t => (
            <div key={t.id} className="bg-zinc-900 border border-white/10 group overflow-hidden">
              <div className="h-80 overflow-hidden">
                <img loading="lazy" src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold uppercase text-white">{t.name}</h3>
                <p className="text-[#D4AF37] text-sm tracking-widest uppercase mb-4">{t.specialization}</p>
                <div className="text-gray-400 text-sm">
                  <p>Qual: {t.qualification}</p>
                  <p>Exp: {t.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
