import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Car, Plane, Bus, MapPin, Clock, Users } from 'lucide-react';
import { useState } from 'react';

const Transport = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    departure: '',
    destination: '',
    price: '',
    capacity: '',
    duration: '',
    description: ''
  });

  const transports = [
    {
      id: 1,
      type: 'Bus',
      name: 'Bus Premium Marrakech-Casablanca',
      departure: 'Marrakech',
      destination: 'Casablanca',
      price: '120 MAD',
      capacity: 45,
      duration: '3h30',
      bookings: 32,
      status: 'active',
      description: 'Bus climatisé avec WiFi gratuit'
    },
    {
      id: 2,
      type: 'Car',
      name: 'Transfert Privé Aéroport',
      departure: 'Aéroport Mohammed V',
      destination: 'Centre-ville Casablanca',
      price: '200 MAD',
      capacity: 4,
      duration: '45min',
      bookings: 18,
      status: 'active',
      description: 'Véhicule de luxe avec chauffeur professionnel'
    },
    {
      id: 3,
      type: 'Plane',
      name: 'Vol Casablanca-Laâyoune',
      departure: 'Casablanca',
      destination: 'Laâyoune',
      price: '1,200 MAD',
      capacity: 180,
      duration: '1h45',
      bookings: 95,
      status: 'active',
      description: 'Vol direct avec Royal Air Maroc'
    }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      type: '',
      name: '',
      departure: '',
      destination: '',
      price: '',
      capacity: '',
      duration: '',
      description: ''
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      name: item.name,
      departure: item.departure,
      destination: item.destination,
      price: item.price.replace(' MAD', ''),
      capacity: item.capacity.toString(),
      duration: item.duration,
      description: item.description
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
              Gestion des Transports
            </h1>
            <p className="text-muted-foreground">
              Gérez vos services de transport et réservations
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un transport</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Services actifs</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">145</h3>
            <p className="text-muted-foreground text-sm">Réservations ce mois</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">229</h3>
            <p className="text-muted-foreground text-sm">Capacité totale</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">63.3%</h3>
            <p className="text-muted-foreground text-sm">Taux d'occupation</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingItem ? 'Modifier le transport' : 'Ajouter un transport'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Bus">Bus</option>
                      <option value="Car">Voiture</option>
                      <option value="Plane">Avion</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom du service</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Départ</label>
                    <input
                      type="text"
                      value={formData.departure}
                      onChange={(e) => setFormData({...formData, departure: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Prix (MAD)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Capacité</label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Durée</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="ex: 3h30"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({
                        type: '',
                        name: '',
                        departure: '',
                        destination: '',
                        price: '',
                        capacity: '',
                        duration: '',
                        description: ''
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
                    {editingItem ? 'Modifier' : 'Ajouter'}
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
            {transports.map((transport) => (
              <div key={transport.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(transport.type)}`}>
                      {getTypeIcon(transport.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-foreground text-lg">{transport.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transport.type)}`}>
                          {transport.type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {transport.departure} → {transport.destination}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {transport.duration}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="w-4 h-4 mr-2" />
                          {transport.capacity} places
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3">{transport.description}</p>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-primary">{transport.price}</span>
                        <span className="text-sm text-muted-foreground">
                          {transport.bookings} réservations ce mois
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEdit(transport)}
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

export default Transport;