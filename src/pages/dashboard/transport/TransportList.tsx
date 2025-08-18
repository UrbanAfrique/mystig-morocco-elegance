import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Car, Plane, Bus, MapPin, Clock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Transport, TransportType, TransportStatus } from '@/models/entities';
import { transportAPI } from '@/services/api';

const defaultForm: Partial<Transport> = {
  title: '',
  description: '',
  type: TransportType.CAR,
  status: TransportStatus.DRAFT,
  price: 0,
  city: '',
  feature: '',
};

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'bus': return <Bus className="w-5 h-5" />;
    case 'car': return <Car className="w-5 h-5" />;
    case 'plane': return <Plane className="w-5 h-5" />;
    default: return <Car className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'bus': return 'bg-blue-100 text-blue-800';
    case 'car': return 'bg-green-100 text-green-800';
    case 'plane': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const TransportList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Transport> | null>(null);
  const [form, setForm] = useState<Partial<Transport>>(defaultForm);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransports = async () => {
    setLoading(true);
    try {
      const data = await transportAPI.getAll();
      setTransports(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransports(); }, []);

  const handleEdit = (transport: Transport) => {
    setEditing(transport);
    setForm({ ...transport });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await transportAPI.delete(id);
    fetchTransports();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && editing.id) {
      await transportAPI.update(editing.id, form);
    } else {
      await transportAPI.create(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    fetchTransports();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Transports
            </h1>
            <p className="text-muted-foreground">
              Gérez vos services de transport et réservations
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un transport</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? 'Modifier le transport' : 'Ajouter un transport'}
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
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as TransportType }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    >
                      {Object.values(TransportType).map(type => (
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
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as TransportStatus }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    >
                      {Object.values(TransportStatus).map(status => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ville</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Caractéristique</label>
                    <input
                      type="text"
                      value={form.feature}
                      onChange={e => setForm(f => ({ ...f, feature: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
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
                    {editing ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transport List */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Services de transport</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6">Chargement...</div>
            ) : (
              transports.map((transport) => (
                <div key={transport.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getTypeColor(transport.type)}`}>
                        {getTypeIcon(transport.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-foreground text-lg">{transport.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transport.type)}`}>
                            {transport.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {transport.city}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {transport.feature}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Users className="w-4 h-4 mr-2" />
                            {/* Add capacity if available */}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{transport.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-primary">{transport.price} MAD</span>
                          {/* Add bookings if available */}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(transport)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(transport.id)}
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

export default TransportList;