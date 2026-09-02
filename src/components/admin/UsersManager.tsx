import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Shield, 
  Check, 
  X, 
  Trash2, 
  UserCheck, 
  Lock,
  Mail,
  Phone
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { dbStore } from '../../data/dbStore';

export const UsersManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>(dbStore.getUsers());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Technician');

  const refreshList = () => {
    setUsers(dbStore.getUsers());
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !name.trim()) {
      alert('Please fill username and name.');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      username: username.trim().toLowerCase(),
      name: name.trim(),
      email: email.trim() || `${username.toLowerCase()}@unitytech.lk`,
      role: role,
      active: true,
      createdAt: new Date().toISOString()
    };

    dbStore.saveUser(newUser);
    refreshList();
    setIsModalOpen(false);
    setUsername('');
    setName('');
    setEmail('');
  };

  const handleDelete = (id: string, uName: string) => {
    if (id === 'u-1') {
      alert('Primary Super Admin cannot be deleted.');
      return;
    }
    if (confirm(`Remove user account "${uName}"?`)) {
      dbStore.deleteUser(id);
      refreshList();
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Super Admin':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">SUPER ADMIN</span>;
      case 'Manager':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 border border-purple-500/40 text-purple-300">MANAGER</span>;
      case 'Billing Staff':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">BILLING</span>;
      case 'Technician':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 border border-amber-500/40 text-amber-300">TECHNICIAN</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            <span>Staff & System Access Control</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage administrative personnel, technician logins, and billing staff authorizations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ ADD STAFF MEMBER</span>
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              {getRoleBadge(u.role)}
              {u.id !== 'u-1' && (
                <button
                  onClick={() => handleDelete(u.id, u.name)}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <h3 className="font-bold text-white text-base">{u.name}</h3>
              <p className="text-xs text-cyan-400 font-mono">@{u.username}</p>
            </div>

            <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Active Account Status</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b1329] border border-purple-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-slate-100 space-y-4">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Add Staff User Account</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kasun Perera"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Username *</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="kasun"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kasun@unitytech.lk"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Role / Permissions</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Manager">Manager (Quotes & Billing)</option>
                  <option value="Billing Staff">Billing Staff</option>
                  <option value="Technician">Technician / Site Installer</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 text-white font-bold"
                >
                  Create User
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
