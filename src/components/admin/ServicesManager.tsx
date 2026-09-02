import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  DollarSign
} from 'lucide-react';
import { MasterServiceRate } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<MasterServiceRate[]>(dbStore.getServices());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<MasterServiceRate | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Installation');
  const [defaultRate, setDefaultRate] = useState<number>(1500);
  const [unit, setUnit] = useState('per camera point');
  const [description, setDescription] = useState('');

  const refreshList = () => {
    setServices(dbStore.getServices());
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setCategory('Installation');
    setDefaultRate(1500);
    setUnit('per camera point');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: MasterServiceRate) => {
    setEditingService(s);
    setName(s.name);
    setCategory(s.category);
    setDefaultRate(s.defaultRate);
    setUnit(s.unit);
    setDescription(s.description || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, sName: string) => {
    if (confirm(`Are you sure you want to delete "${sName}"?`)) {
      dbStore.deleteService(id);
      refreshList();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || defaultRate <= 0) {
      alert('Please fill service name and rate.');
      return;
    }

    const sData: MasterServiceRate = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      name: name.trim(),
      category: category,
      defaultRate: Number(defaultRate),
      unit: unit.trim(),
      description: description.trim() || undefined
    };

    dbStore.saveService(sData);
    refreshList();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-emerald-400" />
            <span>Installation & Technical Services Rate Card</span>
          </h1>
          <p className="text-xs text-slate-400">
            Standard technician labor rates, wiring per meter, DVR configuration, and maintenance point rates.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ ADD SERVICE RATE</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((srv) => (
          <div key={srv.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                {srv.category}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id, srv.name)}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm">{srv.name}</h3>
              {srv.description && (
                <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">{srv.unit}</span>
              <span className="text-base font-black font-mono text-emerald-400">
                {formatLKR(srv.defaultRate)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b1329] border border-emerald-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-slate-100 space-y-4">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>{editingService ? 'Edit Technical Service' : 'Add Technical Service Rate'}</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CCTV Camera Point Installation"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Installation">Installation</option>
                    <option value="Cabling">Cabling / Wiring</option>
                    <option value="Configuration">Configuration</option>
                    <option value="Repair / Service">Repair / Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Standard Rate (Rs.) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={defaultRate}
                    onChange={(e) => setDefaultRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Charging Unit (e.g. per point, per meter, per setup)</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="per point"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Scope Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Includes mounting, BNC crimping, power connection..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white resize-none"
                />
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
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
