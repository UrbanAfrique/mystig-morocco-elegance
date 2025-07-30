import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, UtensilsCrossed, Star, MapPin, Clock, Users } from 'lucide-react';
import { useState } from 'react';

const Food = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    cuisine: '',
    location: '',
    price: '',
    duration: '',
    maxPeople: '',
    description: '',
    includes: '',
    dietary: ''
  });

  const experiences = [
    {
      id: 1,
      name: 'Cours de Cuisine Traditionnelle',
      type: 'Atelier',
      cuisine: 'Marocaine',
      location: 'Riad Marrakech',
      price: '350 MAD',
      duration: '4 heures',
      maxPeople: 8,
      bookings: 24,
      rating: 4.9,
      status: 'active',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Apprenez à préparer un tajine authentique et des pâtisseries marocaines',
      includes: 'Ingrédients, recettes, dégustation, certificat',
      dietary: 'Végétarien disponible'
    },
    {
      id: 2,
      name: 'Dîner Gastronomique Berbère',
      type: 'Restaurant',
      cuisine: 'Berbère',
      location: 'Atlas Mountains',
      price: '280 MAD',
      duration: '2 heures',
      maxPeople: 20,
      bookings: 18,
      rating: 4.8,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Menu dégustation de spécialités berbères dans un cadre authentique',
      includes: 'Menu 5 services, thé à la menthe, spectacle traditionnel',
      dietary: 'Options halal, végétariennes'
    },
    {
      id: 3,
      name: 'Tour Gastronomique Médina',
      type: 'Visite',
      cuisine: 'Street Food',
      location: 'Médina de Fès',
      price: '180 MAD',
      duration: '3 heures',
      maxPeople: 12,
      bookings: 32,
      rating: 4.7,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Découverte des saveurs locales dans les souks de Fès',
      includes: 'Guide local, dégustations, boissons traditionnelles',
      dietary: 'Adaptable selon régimes'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'atelier': return 'bg-purple-100 text-purple-800';
      case 'restaurant': return 'bg-orange-100 text-orange-800';
      case 'visite': return 'bg-green-100 text-green-800';
      case 'marché': return 'bg-blue-100 text-blue-800';
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
      type: '',
      cuisine: '',
      location: '',
      price: '',
      duration: '',
      maxPeople: '',
      description: '',
      includes: '',
      dietary: ''
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      cuisine: item.cuisine,
      location: item.location,
      price: item.price.replace(' MAD', ''),
      duration: item.duration,
      maxPeople: item.maxPeople.toString(),
      description: item.description,
      includes: item.includes,
      dietary: item.dietary
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
              Expériences Gastronomiques
            </h1>
            <p className="text-muted-foreground">
              Gérez vos expériences culinaires et gastronomiques
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter une expérience</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Expériences actives</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">74</h3>
            <p className="text-muted-foreground text-sm">Réservations ce mois</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">40</h3>
            <p className="text-muted-foreground text-sm">Capacité totale</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">4.8</h3>
            <p className="text-muted-foreground text-sm">Note moyenne</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingItem ? 'Modifier l\'expérience' : 'Ajouter une expérience gastronomique'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom de l'expérience</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type d'expérience</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Atelier">Atelier de cuisine</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Visite">Visite gastronomique</option>
                      <option value="Marché">Visite de marché</option>
                      <option value="Dégustation">Dégustation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type de cuisine</label>
                    <select
                      value={formData.cuisine}
                      onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Sélectionner une cuisine</option>
                      <option value="Marocaine">Marocaine</option>
                      <option value="Berbère">Berbère</option>
                      <option value="Andalouse">Andalouse</option>
                      <option value="Street Food">Street Food</option>
                      <option value="Pâtisserie">Pâtisserie</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Lieu</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
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
                    <label className="block text-sm font-medium text-foreground mb-2">Durée</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="ex: 3 heures"
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
                    <label className="block text-sm font-medium text-foreground mb-2">Inclus dans l'expérience</label>
                    <textarea
                      value={formData.includes}
                      onChange={(e) => setFormData({...formData, includes: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Ingrédients, recettes, dégustation..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Régimes alimentaires</label>
                    <textarea
                      value={formData.dietary}
                      onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Végétarien, halal, sans gluten..."
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
                        type: '',
                        cuisine: '',
                        location: '',
                        price: '',
                        duration: '',
                        maxPeople: '',
                        description: '',
                        includes: '',
                        dietary: ''
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

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img 
                  src={experience.image} 
                  alt={experience.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(experience.type)}`}>
                  {experience.type}
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                  {experience.cuisine}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{experience.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {experience.location}
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {experience.duration}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3">{experience.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Inclus:</strong> {experience.includes}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Régimes:</strong> {experience.dietary}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">{experience.price}</span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    Max {experience.maxPeople} pers.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {experience.bookings} réservations
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEdit(experience)}
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

export default Food;