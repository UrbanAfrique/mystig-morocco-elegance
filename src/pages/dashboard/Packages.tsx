import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Package, MapPin, Calendar, Users, Star } from 'lucide-react';
import { useState } from 'react';

const Packages = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    duration: '',
    price: '',
    maxPeople: '',
    category: '',
    description: '',
    includes: '',
    excludes: ''
  });

  const packages = [
    {
      id: 1,
      name: 'Circuit Impérial 7 jours',
      destination: 'Marrakech, Fès, Rabat, Casablanca',
      duration: '7 jours / 6 nuits',
      price: '4,500 MAD',
      maxPeople: 12,
      category: 'Culture',
      bookings: 24,
      rating: 4.8,
      status: 'active',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Découvrez les villes impériales du Maroc',
      includes: 'Hébergement, Transport, Guide, Repas',
      excludes: 'Vols internationaux, Assurance voyage'
    },
    {
      id: 2,
      name: 'Aventure Sahara 4x4',
      destination: 'Merzouga, Erg Chebbi',
      duration: '3 jours / 2 nuits',
      price: '2,800 MAD',
      maxPeople: 8,
      category: 'Aventure',
      bookings: 18,
      rating: 4.9,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Expédition en 4x4 dans le désert du Sahara',
      includes: 'Transport 4x4, Campement, Repas, Guide',
      excludes: 'Boissons alcoolisées, Pourboires'
    },
    {
      id: 3,
      name: 'Détente Atlas Mountains',
      destination: 'Vallée de l\'Ourika, Imlil',
      duration: '2 jours / 1 nuit',
      price: '1,200 MAD',
      maxPeople: 15,
      category: 'Nature',
      bookings: 31,
      rating: 4.7,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Randonnée et détente dans les montagnes de l\'Atlas',
      includes: 'Transport, Hébergement, Repas, Guide de montagne',
      excludes: 'Équipement de randonnée, Assurance'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'culture': return 'bg-purple-100 text-purple-800';
      case 'aventure': return 'bg-orange-100 text-orange-800';
      case 'nature': return 'bg-green-100 text-green-800';
      case 'luxe': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      name: '',
      destination: '',
      duration: '',
      price: '',
      maxPeople: '',
      category: '',
      description: '',
      includes: '',
      excludes: ''
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      destination: item.destination,
      duration: item.duration,
      price: item.price.replace(' MAD', ''),
      maxPeople: item.maxPeople.toString(),
      category: item.category,
      description: item.description,
      includes: item.includes,
      excludes: item.excludes
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
              Gestion des Forfaits
            </h1>
            <p className="text-muted-foreground">
              Créez et gérez vos forfaits voyage personnalisés
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer un forfait</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Forfaits actifs</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">73</h3>
            <p className="text-muted-foreground text-sm">Réservations totales</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">4.8</h3>
            <p className="text-muted-foreground text-sm">Note moyenne</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">156,400</h3>
            <p className="text-muted-foreground text-sm">Revenus (MAD)</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingItem ? 'Modifier le forfait' : 'Créer un forfait'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom du forfait</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    <label className="block text-sm font-medium text-foreground mb-2">Durée</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="ex: 7 jours / 6 nuits"
                      required
                    />
                  </div>
                  
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
                    <label className="block text-sm font-medium text-foreground mb-2">Nombre max de personnes</label>
                    <input
                      type="number"
                      value={formData.maxPeople}
                      onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Culture">Culture</option>
                    <option value="Aventure">Aventure</option>
                    <option value="Nature">Nature</option>
                    <option value="Luxe">Luxe</option>
                    <option value="Famille">Famille</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Inclus</label>
                    <textarea
                      value={formData.includes}
                      onChange={(e) => setFormData({...formData, includes: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Hébergement, Transport, Guide..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Non inclus</label>
                    <textarea
                      value={formData.excludes}
                      onChange={(e) => setFormData({...formData, excludes: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Vols internationaux, Assurance..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({
                        name: '',
                        destination: '',
                        duration: '',
                        price: '',
                        maxPeople: '',
                        category: '',
                        description: '',
                        includes: '',
                        excludes: ''
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

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(pkg.category)}`}>
                  {pkg.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{pkg.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {pkg.destination}
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">{pkg.price}</span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    Max {pkg.maxPeople} pers.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {pkg.bookings} réservations
                  </span>
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
                    <button className="p-2 text-muted-foreground hover:text-red-600 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Packages;