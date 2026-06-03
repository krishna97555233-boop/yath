import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MembershipPlan } from '../types';

export default function Membership() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => {
        setPlans(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2">Join The Club</h2>
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-white mb-6">
            Membership <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-600">Plans</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Select the plan that fits your transformation journey. All plans include full access to the gym floor, lockers, and basic dietary guidance.</p>
        </div>

        {loading ? (
          <div className="text-center text-[#D4AF37]">Loading Plans...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-zinc-900 border border-white/10 p-8 relative flex flex-col hover:border-[#D4AF37] transition-colors ${plan.duration === 1 && plan.title.includes('Premium') ? 'lg:col-span-3 xl:col-span-1' : ''}`}
              >
                {plan.duration === 6 && (
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Popular
                  </div>
                )}
                {plan.title.includes('Premium') && (
                  <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Elite
                  </div>
                )}
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-6 text-[#D4AF37]">
                  <span className="text-3xl font-serif">₹{plan.price}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-colors ${plan.duration === 6 || plan.title.includes('Premium') ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-[#D4AF37] hover:text-black border border-white/10'}`}>
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-32 max-w-2xl mx-auto bg-zinc-900 border border-[#D4AF37]/30 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-yellow-600"></div>
          <h2 className="text-3xl font-serif uppercase tracking-widest text-white mb-2 text-center">Join Now</h2>
          <p className="text-gray-400 text-center mb-8 text-sm">Fill out the form below and our team will contact you shortly to activate your membership.</p>
          
          <form className="space-y-6" onSubmit={async (e) => { 
            e.preventDefault(); 
            const form = e.currentTarget;
            const formData = new FormData(form);
            const body = {
              name: formData.get('firstName') + ' ' + formData.get('lastName'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              plan: formData.get('plan'),
              message: 'Interested in membership'
            };
            const btn = form.querySelector('button');
            if(btn) btn.textContent = 'Submitting...';
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
            });
            if(res.ok) {
              alert('Request Submitted! We will contact you soon.');
              form.reset();
              if(btn) btn.textContent = 'Submit Inquiry';
            } else {
              alert('Failed to submit request. Please try again.');
              if(btn) btn.textContent = 'Submit Inquiry';
            }
          }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">First Name</label>
                <input name="firstName" type="text" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Last Name</label>
                <input name="lastName" type="text" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Phone Number</label>
              <input name="phone" type="tel" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div>
               <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Email Address</label>
               <input name="email" type="email" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Interested Plan</label>
              <select name="plan" required className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                <option value="">Select a Plan</option>
                {plans.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm py-4 hover:bg-white transition-colors mt-4">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
