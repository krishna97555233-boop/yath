import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = Object.fromEntries(data.entries());
    
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const result = await res.json();
    if(res.ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20 items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8">
        <h1 className="text-3xl font-serif uppercase tracking-widest text-white mb-8 text-center">
          Join <span className="text-[#D4AF37]">La Fitnesse</span>
        </h1>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Full Name</label>
            <input required name="name" type="text" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Email</label>
            <input required name="email" type="email" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Password</label>
            <input required name="password" type="password" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors">
            Register Account
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Already a member? <Link to="/login" className="text-[#D4AF37] hover:text-white">Login</Link>
        </p>
      </div>
    </div>
  );
}
