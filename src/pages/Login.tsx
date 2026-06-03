import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = Object.fromEntries(data.entries());
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const result = await res.json();
    if(res.ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20 items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8">
        <h1 className="text-3xl font-serif uppercase tracking-widest text-white mb-8 text-center">
          Admin <span className="text-[#D4AF37]">Login</span>
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Email</label>
            <input required name="email" type="email" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" defaultValue="admin@lafitnesse.com" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Password</label>
            <input required name="password" type="password" className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37]" defaultValue="password123" />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
