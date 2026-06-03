import { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalMembers: 0, activeMemberships: 0, revenue: 0, newLeads: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if(!data.error) setStats(data);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black uppercase text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Members</p>
              <h3 className="text-3xl font-black text-white mt-2">{stats.totalMembers}</h3>
            </div>
            <div className="p-3 bg-black rounded"><Users className="w-6 h-6 text-[#D4AF37]" /></div>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Active Memberships</p>
              <h3 className="text-3xl font-black text-white mt-2">{stats.activeMemberships}</h3>
            </div>
            <div className="p-3 bg-black rounded"><Activity className="w-6 h-6 text-[#D4AF37]" /></div>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Revenue</p>
              <h3 className="text-3xl font-black text-white mt-2">₹{stats.revenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-black rounded"><DollarSign className="w-6 h-6 text-[#D4AF37]" /></div>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">New Leads</p>
              <h3 className="text-3xl font-black text-white mt-2">{stats.newLeads}</h3>
            </div>
            <div className="p-3 bg-black rounded"><TrendingUp className="w-6 h-6 text-[#D4AF37]" /></div>
          </div>
        </div>
      </div>
      
      {/* Chart placeholder */}
      <div className="mt-8 bg-zinc-900 border border-white/10 p-6 h-96 flex items-center justify-center">
        <p className="text-gray-500 uppercase tracking-widest font-bold">Analytics Chart Coming Soon</p>
      </div>
    </div>
  );
}
