import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Ticket, Calendar, Users, MapPin, Clock, Download } from 'lucide-react';
import { useState } from 'react';

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    venue: '',
    date: '',
    time: '',
    price: '',
    quantity: '',
    description: '',
    terms: ''
  });

  const tickets = [
    {
      id: 1,
      eventName: 'Festival Gnawa Essaouira 2024',
      eventType: 'Festival',
      venue: 'Place Moulay Hassan, Essaouira',
      date: '2024-06-20',
      time: '20:00',
      price: '150 MAD',
      quantity: 500,
      sold: 342,
      available: 158,
      status: 'active',
      description: 'Festival de musique Gnawa avec artistes internationaux',
      terms: 'Billet non remboursable, présentation obligatoire'
    },
    {
      id: 2,
      eventName: 'Match Raja vs Wydad',
      eventType: 'Sport',
      venue: 'Stade Mohammed V, Casablanca',
      date: '2024-07-15',
      time: '18:00',
      price: '200 MAD',
      quantity: 1000,
      sold: 756,
      available: 244,
      status: 'active',
      description: 'Classique du football marocain',
      terms: 'Contrôle de sécurité obligatoire, interdiction objets dangereux'
    },
    {
      id: 3,
      eventName: 'Spectacle Traditionnel Atlas',
      eventType: 'Culture',
      venue: 'Théâtre Imlil',
      date: '2024-06-25',
      time: '19:30',
      price: '120 MAD',
      quantity: 200,
      sold: 165,
      available: 35,
      status: 'active',
      description: 'Spectacle de danse et musique berbère traditionnelle',
      terms: 'Tenue correcte exigée, photos interdites pendant le spectacle'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'festival': return 'bg-purple-100 text-purple-800';
      case 'sport': return 'bg-green-100 text-green-800';
      case 'culture': return 'bg-blue-100 text-blue-800';
      case 'concert': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      eventName: '',
      eventType: '',
      venue: '',
      date: '',
      time: '',
      price: '',
      quantity: '',
      description: '',
      terms: ''
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      eventName: item.eventName,
      eventType: item.eventType,
      venue: item.venue,
      date: item.date,
      time: item.time,
      price: item.price.replace(' MAD', ''),
      quantity: item.quantity.toString(),
      description: item.description,
      terms: item.terms
    });
    setShowForm(true);
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
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer des billets</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Événements actifs</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">1,700</h3>
            <p className="text-muted-foreground text-sm">Billets créés</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">1,263</h3>
            <p className="text-muted-foreground text-sm">Billets vendus</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">74.3%</h3>
            <p className="text-muted-foreground text-sm">Taux de vente</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingItem ? 'Modifier les billets' : 'Créer des billets d\'événement'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom de l'événement</label>
                    <input
                      type="text"
                      value={formData.eventName}
                      onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type d'événement</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Festival">Festival</option>
                      <option value="Concert">Concert</option>
                      <option value="Sport">Sport</option>
                      <option value="Culture">Culture</option>
                      <option value="Théâtre">Théâtre</option>
                      <option value="Conférence">Conférence</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Lieu de l'événement</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Heure</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Prix du billet (MAD)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Quantité de billets</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description de l'événement</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Conditions d'utilisation</label>
                  <textarea
                    value={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Conditions de remboursement, restrictions d'âge, etc."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({
                        eventName: '',
                        eventType: '',
                        venue: '',
                        date: '',
                        time: '',
                        price: '',
                        quantity: '',
                        description: '',
                        terms: ''
                      });
                    }}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
                  >
                    {editingItem ? 'Modifier' : 'Créer'}
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
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">
                      <Ticket className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-foreground text-lg">{ticket.eventName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(ticket.eventType)}`}>
                          {ticket.eventType}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {ticket.venue}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(ticket.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {ticket.time}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3">{ticket.description}</p>
                      
                      <div className="flex items-center space-x-6 mb-3">
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{ticket.sold}</span>
                          <span className="text-muted-foreground">/{ticket.quantity} vendus</span>
                        </div>
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(ticket.sold / ticket.quantity) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getAvailabilityColor(ticket.available, ticket.quantity)}`}>
                          {ticket.available} disponibles
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-primary">{ticket.price}</span>
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
                    <button className="p-2 text-muted-foreground hover:text-red-600 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tickets;