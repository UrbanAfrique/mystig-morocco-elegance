import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Ticket, Calendar, Users, MapPin, Clock, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Ticket as TicketType, Event, Currency } from '@/models/entities';
import { eventsAPI } from '@/services/api';

const defaultForm: Partial<TicketType> = {
  typeName: '',
  price: 0,
  currency: Currency.MAD,
  quantity: 1,
  sold: 0,
  event: undefined,
};

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<TicketType> | null>(null);
  const [form, setForm] = useState<Partial<TicketType>>(defaultForm);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all events and their tickets
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const eventsData = await eventsAPI.getAll();
      setEvents(eventsData);
      // Flatten all tickets from all events
      const allTickets = eventsData.flatMap((ev: Event) =>
        (ev.tickets || []).map((ticket: TicketType) => ({ ...ticket, event: ev }))
      );
      setTickets(allTickets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleEdit = (ticket: TicketType) => {
    setEditing(ticket);
    setForm({
      ...ticket,
      event: ticket.event,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // You need an API endpoint to delete a ticket by id, or update the event without this ticket
    // For now, just reload
    fetchTickets();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.event) return;
    // You need an API endpoint to create/update tickets for an event
    // For now, just reload
    setShowForm(false);
    setEditing(null);
    setForm(defaultForm);
    fetchTickets();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion de la Billetterie
            </h1>
            <p className="text-muted-foreground">
              Créez et gérez vos billets d'événements
            </p>
          </div>
          <button 
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer des billets</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? 'Modifier le billet' : 'Créer un billet'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Événement</label>
                  <select
                    value={form.event?.id || ''}
                    onChange={e => {
                      const ev = events.find(ev => ev.id === e.target.value);
                      setForm(f => ({ ...f, event: ev }));
                    }}
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    required
                  >
                    <option value="">Sélectionner un événement</option>
                    {events.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom du billet</label>
                    <input
                      type="text"
                      value={form.typeName}
                      onChange={e => setForm(f => ({ ...f, typeName: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Devise</label>
                    <select
                      value={form.currency}
                      onChange={e => setForm(f => ({ ...f, currency: e.target.value as Currency }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    >
                      {Object.values(Currency).map(cur => (
                        <option key={cur} value={cur}>{cur}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Prix</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Quantité</label>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))}
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

        {/* Tickets List */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Billets d'événements</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6">Chargement...</div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-foreground text-lg">{ticket.typeName}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {ticket.event?.title}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {ticket.event?.venue}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {ticket.event?.dateRange?.start}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {ticket.event?.timeRange?.start}
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{ticket.sold}</span>
                            <span className="text-muted-foreground">/{ticket.quantity} vendus</span>
                          </div>
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(ticket.sold / (ticket.quantity || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            {(ticket.quantity ?? 0) - (ticket.sold ?? 0)} disponibles
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-primary">{ticket.price} {ticket.currency}</span>
                          <span className="text-sm text-muted-foreground">par billet</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ticket.id)}
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

export default Tickets;