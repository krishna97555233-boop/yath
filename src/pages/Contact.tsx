import { useState } from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('');
  
  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());
    
    setStatus('Sending...');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if(res.ok) {
      setStatus('Message sent successfully!');
      form.reset();
    } else {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-widest text-white mb-16 text-center">
          Get In <span className="text-[#D4AF37]">Touch</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={submitLead} className="space-y-6 bg-zinc-900 border border-white/10 p-8">
              <div>
                <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Name</label>
                <input required name="name" type="text" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Email</label>
                <input required name="email" type="email" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Phone</label>
                <input required name="phone" type="tel" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea required name="message" rows={4} className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors">
                Send Message
              </button>
              {status && <p className="text-[#D4AF37] mt-4 text-center">{status}</p>}
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-[#D4AF37] shrink-0" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider mb-2">Visit Us</h3>
                <p className="text-gray-400 mb-2">3rd Floor Dharam Palace, Tulsi Marg, Above ICICI Bank, K Block, Sector 18, Noida, Uttar Pradesh 201301</p>
                <a href="https://maps.app.goo.gl/4NBwh1uLzQqmHYGT9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors">
                  Open in Google Maps
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="w-8 h-8 text-[#D4AF37] shrink-0" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider mb-2">Call Us</h3>
                <p className="text-gray-400">+91 82877 15938</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-[#D4AF37] shrink-0" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider mb-2">Working Hours</h3>
                <p className="text-gray-400">Mon - Sat: 6:00 AM - 10:00 PM</p>
                <p className="text-gray-400">Sunday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="pt-4">
              <div className="aspect-video w-full rounded border border-white/10 overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.742468305886!2d77.32049077610667!3d28.577498488344604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5cac7c3af5d%3A0xc6cb7ce3a228383!2sLa%20Fitnesse%20Select!5e0!3m2!1sen!2sin!4v1709405625439!5m2!1sen!2sin" 
                  className="absolute inset-0 w-full h-full" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
