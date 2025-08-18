import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Users, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Package, PackageType, PackageStatus } from '@/models/entities';
import { packagesAPI } from '@/services/api';

const defaultForm: Partial<Package> = {
  title: '',
  description: '',
  type: PackageType.TOUR,
  status: PackageStatus.DRAFT,
  price: 0,
};

const Packages = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Package> | null>(null);
  const [form, setForm] = useState<Partial<Package>>(defaultForm);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const data = await packagesAPI.getAll();
      setPackages(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleEdit = (pkg: Package) => {
    setEditing(pkg);
    setForm({ ...pkg });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await packagesAPI.delete(id);
    fetchPackages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && editing.id) {
      await packagesAPI.update(editing.id, form);
    } else {
      await packagesAPI.create(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    fetchPackages();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Forfaits
            </h1>
            <p className="text-muted-foreground">
              Créez et gérez vos forfaits voyage personnalisés
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer un forfait</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? 'Modifier le forfait' : 'Créer un forfait'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Titre</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                    <select
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as PackageType }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    >
                      {Object.values(PackageType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Statut</label>
                    <select
                      value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as PackageStatus }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    >
                      {Object.values(PackageStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Prix (MAD)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
                  >
                    {editing ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Packages List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Forfaits</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6">Chargement...</div>
            ) : (
              packages.map((pkg) => (
                <div key={pkg.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">{pkg.title}</h3>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {pkg.type}
                      </span>
                      <div className="text-muted-foreground text-sm mt-1">{pkg.description}</div>
                      <div className="text-muted-foreground text-xs mt-1">Statut: {pkg.status}</div>
                      <div className="text-muted-foreground text-xs mt-1">Prix: {pkg.price} MAD</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 text-muted-foreground hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Packages;