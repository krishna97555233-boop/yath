import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingLead, setEditingLead] = useState<any>(null);

  const fetchLeads = () => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/leads', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if(!data.error) setLeads(data);
      });
  };

  useEffect(() => {
    fetchLeads();
    const intervalId = setInterval(fetchLeads, 10000); // Polling every 10s for real-time feel
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (id: string) => {
    if(!window.confirm('Are you sure you want to delete this lead?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(res.ok) fetchLeads();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!editingLead) return;
    const data = new FormData(e.currentTarget);
    const body = Object.fromEntries(data.entries());
    
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/admin/leads/${editingLead.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body)
    });
    if(res.ok) {
      setEditingLead(null);
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search)
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif uppercase tracking-widest text-[#D4AF37]">Manage Leads</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black border border-white/20 text-white pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-gray-400">Date</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-gray-400">Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-gray-400">Contact</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-gray-400">Plan / Message</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLeads.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-500">No leads found.</td></tr>
            ) : filteredLeads.map(lead => (
              <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{new Date(lead.submissionDate).toLocaleString()}</td>
                <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                <td className="px-6 py-4 text-gray-300">
                  <div className="flex flex-col gap-1">
                    <span>{lead.email}</span>
                    <span className="text-[#D4AF37]">{lead.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300 max-w-xs truncate" title={lead.message}>
                  {lead.plan ? <span className="text-[#D4AF37] text-xs uppercase tracking-wider block mb-1">Plan: {lead.plan}</span> : null}
                  {lead.message}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs uppercase tracking-wider font-bold rounded ${lead.status === 'New' ? 'bg-blue-500/20 text-blue-400' : lead.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-400' : lead.status === 'Converted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setEditingLead(lead)} className="p-2 text-gray-400 hover:text-white transition-colors" title="Edit">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(lead.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/20 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setEditingLead(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-serif uppercase tracking-widest text-[#D4AF37] mb-6">Edit Lead</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Name</label>
                  <input name="name" defaultValue={editingLead.name} className="w-full bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-[#D4AF37]" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Status</label>
                  <select name="status" defaultValue={editingLead.status} className="w-full bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-[#D4AF37]">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</label>
                  <input name="email" defaultValue={editingLead.email} className="w-full bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</label>
                  <input name="phone" defaultValue={editingLead.phone} className="w-full bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Plan</label>
                <input name="plan" defaultValue={editingLead.plan} className="w-full bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Message</label>
                <textarea name="message" rows={4} defaultValue={editingLead.message} className="w-full bg-black border border-white/10 px-4 py-2 text-white outline-none focus:border-[#D4AF37]"></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setEditingLead(null)} className="px-6 py-2 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
