import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, Users, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  useEffect(() => {
    if(!token) return;
    const fetchLeads = () => {
      fetch('/api/admin/leads', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(r => r.json())
        .then(data => {
          if(!data.error) {
            const count = data.filter((l: any) => l.status === 'New').length;
            setNewLeadsCount(count);
          }
        });
    };
    fetchLeads();
    const int = setInterval(fetchLeads, 10000);
    return () => clearInterval(int);
  }, [token]);

  if (!token || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10 relative">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-[#D4AF37]" />
            <span className="text-sm font-bold tracking-widest uppercase">
              Admin <span className="text-[#D4AF37]">Portal</span>
            </span>
          </Link>
          {newLeadsCount > 0 && (
            <div className="absolute top-6 right-6 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full animate-bounce">
              {newLeadsCount}
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded transition-colors">
            <LayoutDashboard className="w-5 h-5 text-[#D4AF37]" /> Dashboard
          </Link>
          <Link to="/admin/leads" className="flex justify-between items-center text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded transition-colors">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#D4AF37]" /> Manage Leads
            </div>
            {newLeadsCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{newLeadsCount} New</span>
            )}
          </Link>
          <div className="flex items-center gap-3 text-gray-500 p-3 rounded cursor-not-allowed">
            <ImageIcon className="w-5 h-5" /> Gallery (Soon)
          </div>
          <div className="flex items-center gap-3 text-gray-500 p-3 rounded cursor-not-allowed">
            <MessageSquare className="w-5 h-5" /> Blog (Soon)
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="w-full text-left text-sm font-bold uppercase tracking-wider text-red-500 hover:text-red-400">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
