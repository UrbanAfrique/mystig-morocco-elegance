import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Calendar, Users, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Event, EventType, EventStatus } from '@/models/entities';
import { eventsAPI } from '@/services/api';

const defaultForm: Partial<Event> = {
  title: '',
  description: '',
  type: EventType.FESTIVAL,
  category: '',
  dateRange: { start: '', end: '' },
  timeRange: { start: '', end: '' },
  venue: '',
  address: '',
  city: '',
  status: EventStatus.DRAFT,
  featured: false,
  tags: [],
};

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Event> | null>(null);
  const [form, setForm] = useState<Partial<Event>>(defaultForm);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleEdit = (event: Event) => {
    setEditing(event);
    setForm({
      ...event,
      dateRange: { ...event.dateRange },
      timeRange: { ...event.timeRange },
      tags: event.tags || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await eventsAPI.delete(id);
    fetchEvents();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && editing.id) {
      await eventsAPI.update(editing.id, form);
    } else {
      await eventsAPI.create(form);
    }
    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    fetchEvents();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Événements
            </h1>
            <p className="text-muted-foreground">
              Organisez et vendez des billets pour vos événements
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer un événement</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? 'Modifier l\'événement' : 'Créer un événement'}
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
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as EventType }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    >
                      {Object.values(EventType).map(type => (
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
                    <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Statut</label>
                    <select
                      value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as EventStatus }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    >
                      {Object.values(EventStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date début</label>
                    <input
                      type="date"
                      value={form.dateRange?.start || ''}
                      onChange={e => setForm(f => ({ ...f, dateRange: { ...f.dateRange, start: e.target.value } }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date fin</label>
                    <input
                      type="date"
                      value={form.dateRange?.end || ''}
                      onChange={e => setForm(f => ({ ...f, dateRange: { ...f.dateRange, end: e.target.value } }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Heure début</label>
                    <input
                      type="time"
                      value={form.timeRange?.start || ''}
                      onChange={e => setForm(f => ({ ...f, timeRange: { ...f.timeRange, start: e.target.value } }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Heure fin</label>
                    <input
                      type="time"
                      value={form.timeRange?.end || ''}
                      onChange={e => setForm(f => ({ ...f, timeRange: { ...f.timeRange, end: e.target.value } }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ville</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                  />
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

        {/* Events List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Événements à venir</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6">Chargement...</div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-2xl font-bold">
                      {event.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground text-lg mb-1">{event.title}</h3>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {event.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-lg">{event.status}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.dateRange?.start}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.timeRange?.start}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.city}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{event.attendees?.length ?? 0}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(event)}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-2 text-muted-foreground hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
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

export default Events;