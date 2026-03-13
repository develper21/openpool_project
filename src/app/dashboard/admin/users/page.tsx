"use client";

import React, { useState, useEffect } from "react";
import DoodleCard from "@/components/ui/DoodleCard";
import DoodleButton from "@/components/ui/DoodleButton";
import DoodleTag from "@/components/ui/DoodleTag";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/admin/users?page=${page}&limit=50`); // Higher limit for client-side filtering
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filteredUsers = users.filter(u => {
    if (filter !== "All" && u.role !== filter.toUpperCase()) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      {/* ── HEADER & ILLUSTRATION ── */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-caveat text-[52px] text-ink leading-none mt-4">User Roster ✦</h1>
        </div>

        {/* HR Office Illustration (Mid-century style) */}
        <div className="w-full h-[180px] rounded-2xl bg-cream/30 border-2 border-charcoal/10 overflow-hidden relative shadow-[inset_0_2px_10px_rgba(26,26,46,0.02)] flex items-center justify-center">
          <svg viewBox="0 0 1200 180" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            {/* Background elements */}
            <rect width="100%" height="100%" fill="#F5F0E8" opacity="0.5" />
            <path d="M 0 150 L 1200 150" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
            
            {/* Filing Cabinets */}
            {[200, 300, 400].map(x => (
              <g key={x} transform={`translate(${x}, 50)`}>
                <rect x="0" y="0" width="80" height="100" fill="#2C2C2C" rx="2" opacity="0.9" />
                <rect x="10" y="10" width="60" height="20" fill="#E26D5C" rx="1" opacity="0.8" />
                <rect x="35" y="15" width="10" height="4" fill="#F5F0E8" />
                <rect x="10" y="40" width="60" height="20" fill="#D4AF37" rx="1" opacity="0.8" />
                <rect x="35" y="45" width="10" height="4" fill="#F5F0E8" />
                <rect x="10" y="70" width="60" height="20" fill="#8FAF72" rx="1" opacity="0.8" />
                <rect x="35" y="75" width="10" height="4" fill="#F5F0E8" />
              </g>
            ))}

            {/* HR Person Organizing */}
            <g transform="translate(600, 70)">
              {/* Desk */}
              <rect x="-60" y="70" width="120" height="10" fill="#2C2C2C" rx="2" />
              {/* Paper stacks */}
              <rect x="-40" y="60" width="30" height="10" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" />
              <rect x="-35" y="50" width="30" height="10" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" />
              {/* Person */}
              <circle cx="0" cy="10" r="15" fill="#2C2C2C" />
              <path d="M -20 40 C -20 15, 20 15, 20 40 L 25 70 L -25 70 Z" fill="#2C2C2C" />
              <path d="M 15 30 L 40 45" stroke="#2C2C2C" strokeWidth="6" strokeLinecap="round" />
            </g>

            {/* Decorative hanging lamp */}
            <path d="M 800 -10 L 800 40" stroke="#2C2C2C" strokeWidth="2" />
            <path d="M 770 40 L 830 40 L 810 60 L 790 60 Z" fill="#D4AF37" opacity="0.8" />
            
            {/* Window */}
            <rect x="900" y="30" width="150" height="90" fill="none" stroke="#2C2C2C" strokeWidth="4" />
            <line x1="900" y1="75" x2="1050" y2="75" stroke="#2C2C2C" strokeWidth="2" />
            <line x1="975" y1="30" x2="975" y2="120" stroke="#2C2C2C" strokeWidth="2" />
            <circle cx="950" cy="50" r="40" fill="#E26D5C" opacity="0.1" />
          </svg>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 group-focus-within:text-terracotta transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-cream/30 border-2 border-charcoal/10 border-b-charcoal focus:outline-none focus:border-b-terracotta transition-colors font-sans text-sm w-full md:w-64 placeholder:text-charcoal/40 text-charcoal"
            />
          </div>
          <div className="flex items-center gap-2">
            {["All", "Admin", "Researcher", "Viewer"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm font-sans font-semibold transition-colors border-2 ${filter === f ? "border-terracotta bg-terracotta/10 text-terracotta" : "border-transparent bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <DoodleButton onClick={() => setShowModal(true)}>Add New User +</DoodleButton>
      </div>

      {/* ── USERS TABLE ── */}
      <DoodleCard className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center text-charcoal/50 font-caveat text-xl">Loading users...</div>
        ) : filteredUsers.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-charcoal/10 text-charcoal/60 font-sans text-sm tracking-wide">
                  <th className="font-semibold py-4 px-6 whitespace-nowrap">User</th>
                  <th className="font-semibold py-4 px-6 whitespace-nowrap">Role</th>
                  <th className="font-semibold py-4 px-6 whitespace-nowrap">Summaries</th>
                  <th className="font-semibold py-4 px-6 whitespace-nowrap">Joined</th>
                  <th className="font-semibold py-4 px-6 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="font-sans">
                {filteredUsers.map((user, idx) => (
                  <tr key={user.id} className={`border-b border-charcoal/5 last:border-0 hover:bg-cream/20 transition-colors ${!user.isActive ? "opacity-50" : ""}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-cream font-caveat text-xl shadow-inner
                          ${user.role === 'ADMIN' ? 'bg-terracotta' : user.role === 'RESEARCHER' ? 'bg-mustard' : 'bg-sage'}`}>
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-semibold ${!user.isActive ? 'line-through text-charcoal/40' : 'text-charcoal'}`}>{user.name}</span>
                          <span className="text-xs text-charcoal/50">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <DoodleTag color={user.role === 'ADMIN' ? 'terracotta' : user.role === 'RESEARCHER' ? 'mustard' : 'sage'} className="text-[10px] px-2 py-0.5">
                        {user.role}
                      </DoodleTag>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-charcoal font-medium">{user.summaries || 0}</span>
                    </td>
                    <td className="py-4 px-6 text-charcoal/70 text-sm">
                      {user.joined}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <select className="bg-transparent border border-charcoal/20 text-charcoal text-xs rounded px-2 py-1 outline-none cursor-pointer hover:border-charcoal/40 transition-colors" defaultValue={user.role}>
                          <option value="ADMIN">Admin</option>
                          <option value="RESEARCHER">Researcher</option>
                          <option value="VIEWER">Viewer</option>
                        </select>
                        <button className={`text-xs px-3 py-1 border-2 rounded-lg font-bold transition-all
                          ${!user.isActive ? 'border-sage text-sage hover:bg-sage hover:text-white' : 'border-terracotta text-terracotta hover:bg-terracotta hover:text-white'}`}>
                          {!user.isActive ? 'Reactivate' : 'Suspend'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            {/* Empty Office SVG */}
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" opacity="0.6">
              <path d="M 10 90 L 90 90" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="4 4" />
              {/* Empty Desk */}
              <rect x="25" y="60" width="50" height="6" fill="#2C2C2C" rx="1" />
              <rect x="30" y="66" width="6" height="24" fill="#2C2C2C" />
              <rect x="64" y="66" width="6" height="24" fill="#2C2C2C" />
              {/* Empty Chair tipped over slightly */}
              <g transform="translate(45, 75) rotate(-15)">
                 <rect x="0" y="-15" width="20" height="20" fill="none" stroke="#E26D5C" strokeWidth="2" />
                 <line x1="10" y1="5" x2="10" y2="15" stroke="#E26D5C" strokeWidth="2" />
              </g>
              <text x="50" y="30" fontSize="30" fontFamily="sans-serif" fill="#2C2C2C" opacity="0.4" textAnchor="middle">?</text>
            </svg>
            <h3 className="font-caveat text-3xl text-charcoal/60 mt-4">No users found</h3>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && totalPages > 1 && (
          <div className="p-4 border-t border-charcoal/10 flex items-center justify-between bg-cream/30">
            <span className="font-caveat text-lg text-charcoal/60">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page-1)} className={`px-3 py-1 border-2 border-charcoal/10 text-charcoal rounded-md font-caveat text-xl transition-colors ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-charcoal/5'}`}>{"<-"} Prev</button>
              <button disabled={page === totalPages} onClick={() => setPage(page+1)} className={`px-3 py-1 border-2 border-charcoal/10 text-charcoal rounded-md font-caveat text-xl transition-colors ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-charcoal/5'}`}>Next {"->"}</button>
            </div>
          </div>
        )}
      </DoodleCard>

      {/* ── ADD NEW USER MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 bg-ink/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <DoodleCard className="w-full max-w-md bg-paper p-8 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-charcoal/40 hover:text-ink transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="flex gap-4 items-center">
              <svg viewBox="0 0 60 60" width="40" height="40" fill="none">
                {/* Hand drawing person */}
                <path d="M 5 50 C 10 40, 20 40, 25 50" stroke="#2C2C2C" strokeWidth="2" />
                <circle cx="15" cy="30" r="8" stroke="#2C2C2C" strokeWidth="2" fill="none" />
                <path d="M 40 10 L 30 25 L 35 25 L 25 40" stroke="#E26D5C" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
              <h2 className="font-caveat text-3xl text-ink leading-none">Add New User</h2>
            </div>

            <div className="space-y-4 font-sans border-t border-charcoal/10 pt-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-charcoal/80">Full Name</label>
                <input type="text" className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 transition-colors" placeholder="Ada Lovelace" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-charcoal/80">Email</label>
                <input type="email" className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 transition-colors" placeholder="ada@distill.science" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-charcoal/80">Role</label>
                <select className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 transition-colors outline-none cursor-pointer">
                  <option value="RESEARCHER">Researcher</option>
                  <option value="ADMIN">Admin</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-charcoal/80">Temporary Password</label>
                <input type="text" className="w-full bg-cream/50 border-b-2 border-charcoal/20 focus:outline-none focus:border-terracotta px-3 py-2 transition-colors font-mono text-sm" defaultValue="WelcomeToDistill123!" />
              </div>
            </div>

            <div className="pt-2">
               <DoodleButton className="w-full justify-center">Create User →</DoodleButton>
            </div>
          </DoodleCard>
        </div>
      )}
    </div>
  );
}
