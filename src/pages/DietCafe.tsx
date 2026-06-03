import { motion } from 'motion/react';
import { Coffee, Flame, Heart } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: 1,
    name: "Angel's Beef Food",
    description: "Premium high-protein lean beef steak, perfectly seasoned and grilled to perfection. Served with asparagus.",
    price: "₹850",
    macros: "Protein: 45g | Carbs: 30g | Fats: 12g",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6756ce211?auto=format&fit=crop&q=80&w=800",
    isSpecial: true
  },
  {
    id: 2,
    name: "Chicken Breast Platter",
    description: "Herb-roasted chicken breast with sweet potato mash and broccoli.",
    price: "₹550",
    macros: "Protein: 40g | Carbs: 25g | Fats: 8g",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800",
    isSpecial: false
  },
  {
    id: 3,
    name: "Keto Salmon Bowl",
    description: "Wild-caught salmon with avocado, mixed greens, and olive oil dressing.",
    price: "₹950",
    macros: "Protein: 35g | Carbs: 5g | Fats: 28g",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    isSpecial: false
  }
];

export default function DietCafe() {
  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2 flex justify-center items-center gap-2">
            <Coffee className="w-4 h-4" /> La Fitnesse Cafe
          </h2>
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-white">
            Nutrition <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-600">Menu</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Fuel your body with our premium selection of macro-calculated, freshly prepared meals designed to support your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-zinc-900 border ${item.isSpecial ? 'border-[#D4AF37]' : 'border-white/10'} overflow-hidden relative group`}
            >
              {item.isSpecial && (
                <div className="absolute top-4 left-4 z-10 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Chef's Special
                </div>
              )}
              
              <div className="aspect-[4/3] overflow-hidden relative">
                <img loading="lazy" 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white tracking-wide">{item.name}</h3>
                  <span className="text-[#D4AF37] font-bold text-xl">{item.price}</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-6 leading-relaxed min-h-[60px]">
                  {item.description}
                </p>
                
                <div className="border-t border-white/10 pt-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-mono text-gray-300 bg-black/50 px-2 py-1 rounded">
                    {item.macros}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
