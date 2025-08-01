import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Car, Plane, Bus, MapPin, Clock, Users } from 'lucide-react';

const TransportList = () => {
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
          <a 
            href="/dashboard/transport/create"
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un transport</span>
          </a>
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
                    <a 
                      href={`/dashboard/transport/${transport.id}`}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <a 
                      href={`/dashboard/transport/${transport.id}/edit`}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </a>
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

export default TransportList;